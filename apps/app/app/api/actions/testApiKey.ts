"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { type APICallError, generateText } from "ai"

export const testApiKey = async (apiKey: string) => {
  const openai = createOpenAI({
    apiKey,
  })

  try {
    await generateText({
      model: openai("gpt-4o-mini"),
      prompt: "Hello",
    })

    return {
      status: "OK",
    }
  } catch (error) {
    return {
      status: "ERROR",
      error: (error as APICallError).data,
    }
  }
}
