"use client"

import { runExtract } from "@/app/api/actions/runExtract"
import { Setting } from "@/components/setting"
import { Storage } from "@/lib/constants"
import { Card } from "@extract-anything/shared/card"
import { Download } from "@extract-anything/shared/download"
import { FormInput } from "@extract-anything/shared/form-input"
import { PromptInput } from "@extract-anything/shared/prompt-input"
import { Button } from "@extract-anything/ui/button"
import { Form } from "@extract-anything/ui/form"
import { readStreamableValue } from "ai/rsc"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import useFormPersist from "react-hook-form-persist"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { toast } from "sonner"
import { Presentation } from "./presentation"
import { Results } from "./result"

export default function Home({
  defaultLayout = [33, 67],
  formData = null,
  settingData = null,
}: {
  defaultLayout: number[] | undefined
  formData: string | null
  settingData: string | null
}) {
  const [files, setFiles] = useState<File[]>()
  const [results, setResults] = useState<Record<string, string>[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)

  const methods = useForm({
    defaultValues: formData
      ? JSON.parse(formData)
      : {
          schema: [
            {
              key: "",
              description: "",
            },
            {
              key: "",
              description: "",
            },
            {
              key: "",
              description: "",
            },
          ],
        },
  })

  const { watch, setValue, formState, handleSubmit } = methods
  const { isSubmitSuccessful } = formState

  useFormPersist("extract-anything-form", {
    watch,
    setValue,
    storage: Storage,
  })

  const onSubmit = async (data: {
    schema: { key: string; description: string }[]
    text?: string
  }) => {
    const apiKey = Storage.getItem("apiKey")
    if (!apiKey) {
      toast.error("Please set your OpenAI API Key first")
      setOpenSetting(true)
      return
    }

    setIsLoading(true)
    const formData = new FormData()

    if (files?.length) {
      files?.forEach((file, index) => {
        formData.append(`file${index}`, file)
      })
    }
    data.schema = data.schema.filter((item) => item.key || item.description)

    const setting = { ...JSON.parse(Storage.getItem("setting-form") || "{}"), apiKey }
    if (setting.isClearTable) {
      setResults([])
    }

    const { status } = await runExtract(data, setting, formData)

    try {
      for await (const value of readStreamableValue(status)) {
        if (value != null) {
          console.log(value)
          if (value === "Done") {
            setIsLoading(false)
            return
          }
          if (value.error) {
            setIsLoading(false)
            toast.error("There is an error in the extraction process")
            console.error(value.error)
            return
          }
          setResults((prev) => [...prev, value])
        }
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("There is an error in the extraction process")
      console.error(error)
    }
  }
  const addFile = (file?: File) => {
    if (file) {
      setFiles((prev) => [...(prev || []), file])
    }
  }

  const removeFile = (file: File) => {
    setFiles((prev) => prev?.filter((item) => item !== file) || [])
  }

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-bold font-display text-4xl text-transparent tracking-[-0.02em] drop-shadow-sm [text-wrap:balance] md:text-6xl md:leading-[1.1]">
        Extract Anything
      </h2>
      <p className="mt-6 pb-10 text-center text-gray-500 [text-wrap:balance] md:text-xl">
        Open Source AI-Powered Extraction for Images, PDFs, and More
      </p>
      <PanelGroup direction="horizontal" onLayout={onLayout}>
        <Panel minSize={30} defaultSize={defaultLayout[0]}>
          <Card className="mr-4 p-4">
            <Setting open={openSetting} setOpen={setOpenSetting} data={settingData} />
            <Form {...methods}>
              <form
                className="relative flex h-full flex-col gap-2 pt-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <PromptInput addFile={addFile} removeFile={removeFile} files={files} />
                <FormInput />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit
                </Button>
              </form>
            </Form>
          </Card>
        </Panel>
        <PanelResizeHandle className="w-[1px] bg-gray-200" />
        <Panel minSize={30} defaultSize={defaultLayout[1]}>
          <div className="flex h-full w-full pl-4">
            {isSubmitSuccessful || results.length > 0 ? (
              <Results data={results} setResults={setResults} />
            ) : (
              <motion.div className="h-full w-full px-4 md:px-0">
                <div className="flex h-full flex-col items-center justify-center gap-4 border p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  <p className="flex flex-row items-center justify-center gap-4 text-balance text-2xl text-slate-600">
                    Describe the data you want to extract and upload a file to get started
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </Panel>
      </PanelGroup>
      <Presentation />
    </div>
  )
}
