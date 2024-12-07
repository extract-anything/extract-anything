"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { type CoreMessage, streamObject } from "ai"
import { createStreamableValue } from "ai/rsc"
import { convert as convertPdf } from "pdf-img-convert"
import { PORTKEY_GATEWAY_URL, createHeaders } from "portkey-ai"
import sharp from "sharp"
import { z } from "zod"

export const runExtract = async (
  data: {
    schema: {
      key: string
      description: string
    }[]
    text?: string
  },
  setting: {
    apiKey: string
    isOptOutTelemetry: boolean
  },
  formData?: FormData,
) => {
  const openai = createOpenAI({
    apiKey: setting.apiKey,
    baseURL: setting.isOptOutTelemetry ? undefined : PORTKEY_GATEWAY_URL,
    headers: createHeaders({
      provider: "openai",
      apiKey: process.env.PORTKEY_API_KEY,
    }),
  })

  const files: File[] = []
  formData?.forEach((value, key) => {
    if (value instanceof File) {
      files.push(value)
    }
  })
  const { text, schema } = data

  const streamableStatus = createStreamableValue()
  ;(async () => {
    try {
      const messages: CoreMessage[] = [
        {
          role: "system",
          content: `
              You are an expert at extracting information from images and documents.
              Please analyze the provided image(s) or document(s) and extract the specified information based on the given schema. Focus on accurately identifying and capturing key details such as:

              1. Text content: Recognize and transcribe any relevant text in the image.
              2. Structured data: Identify and extract data that matches the schema fields.
              3. Visual elements: Describe any relevant visual information that corresponds to the schema.
              4. Contextual information: Infer and extract any implicit data based on the image context.

              Ensure high accuracy and precision in your extraction. If you're uncertain about any information, indicate your level of confidence. Prioritize extracting the exact data requested in the schema, but also note any additional relevant information you observe.
              
              `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Here is the image(s) you need to extract the information from:",
            },
          ],
        },
      ]
      for (const file of files) {
        const type = file.type
        const buffer = await file.arrayBuffer()
        if (type === "application/pdf") {
          const oldBuffer = Buffer.from(buffer)
          const pages = (await convertPdf(oldBuffer, { scale: 3 })) as Uint8Array[]
          for (const page of pages) {
            // @ts-ignore
            messages[1].content.push({
              type: "image",
              image: await sharp(Buffer.from(page)).png({ quality: 85 }).toBuffer(),
            })
          }
          continue
        }
        // @ts-ignore
        messages[1].content.push({
          type: "image",
          image: await sharp(Buffer.from(buffer)).png({ quality: 85 }).toBuffer(),
        })
      }
      if (text) {
        // @ts-ignore
        messages[1].content.push({ type: "text", text })
      }
      const { partialObjectStream } = await streamObject({
        frequencyPenalty: 0,
        maxTokens: 3000,
        presencePenalty: 0,
        temperature: 0,
        topP: 1,

        model: openai("gpt-4o"),
        output: "array",
        schema: z.object(
          schema
            .map((item) => item.key)
            .reduce(
              (acc, key) => {
                acc[key] = z
                  .string()
                  .describe(schema.find((item) => item.key === key)?.description || "")
                return acc
              },
              {} as Record<string, z.ZodString>,
            ),
        ),
        system:
          "Extract key information from the provided image, file, or document. Focus on accuracy and precision. Identify and provide details such as names, dates, numbers, and any specific text I've requested. Stream each field when there's result",
        messages,
        schemaDescription: "The schema of the information you need to extract",
        onFinish: (result) => {
          console.log(result.usage)
        },
      })

      for await (const element of partialObjectStream) {
        streamableStatus.update(element)
      }
      streamableStatus.done("Done")
    } catch (error) {
      streamableStatus.error({ error: (error as Error).message })
    }
  })()

  return {
    status: streamableStatus.value,
  }
}
