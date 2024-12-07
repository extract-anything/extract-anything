import { cn } from "@extract-anything/ui/utils"
import { unzip } from "fflate"
import { Paperclip } from "lucide-react"
import { useCallback, useEffect } from "react"
import { Button, DropZone, FileTrigger } from "react-aria-components"
import { useFormContext } from "react-hook-form"
import { acceptedFileTypes } from "./constants"
import { FileViewer } from "./file-viewer"

export const PromptInput = ({
  addFile,
  files,
  removeFile,
}: {
  addFile: (file?: File) => void
  removeFile: (file: File) => void
  files: File[] | undefined
}) => {
  const { register } = useFormContext()

  const handleFileProcessing = useCallback(
    async (file: File) => {
      if (file.type === "application/zip") {
        const arrayBuffer = await file.arrayBuffer()
        unzip(new Uint8Array(arrayBuffer), (err, files) => {
          if (err) {
            console.error(err)
            return
          }
          for (const filename in files) {
            if (!filename.startsWith("__MACOSX/")) {
              const fileData = files[filename]
              if (fileData) {
                const blob = new Blob([fileData.buffer], { type: "application/octet-stream" })
                addFile(new File([blob], filename))
              }
            }
          }
        })
      } else {
        addFile(file)
      }
    },
    [addFile],
  )

  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (items) {
        for (const item of items) {
          if (acceptedFileTypes.includes(item.type)) {
            const file = item.getAsFile()
            if (file) {
              await handleFileProcessing(file)
              event.preventDefault()
            }
          }
        }
      }
    },
    [handleFileProcessing],
  )

  useEffect(() => {
    window.addEventListener("paste", handlePaste)
    return () => {
      window.removeEventListener("paste", handlePaste)
    }
  }, [handlePaste])

  return (
    <DropZone
      className={({ isDropTarget }) =>
        cn(
          "flex w-full flex-col gap-1.5 bg-[#f4f4f4] p-3 transition-colors",
          isDropTarget &&
            "bg-blue-100 outline-dashed outline-2 outline-blue-300 outline-offset-[-1px]",
        )
      }
      onDrop={async (e) => {
        const fileList = e.items.filter((file) => file.kind === "file")
        for (const item of fileList) {
          const file = await item.getFile()
          await handleFileProcessing(file)
        }
      }}
      getDropOperation={(types) =>
        acceptedFileTypes.some((type) => types.has(type)) ? "copy" : "cancel"
      }
    >
      <div className="flex items-end gap-3">
        <div className="flex h-full min-w-0 flex-1 flex-col">
          <textarea
            tabIndex={0}
            dir="auto"
            rows={2}
            placeholder="Describe what you want to extract"
            className="m-0 max-h-52 min-h-20 resize-none border-0 bg-transparent px-0 text-token-text-primary placeholder-slate-600 outline-none focus:border-0 focus:ring-0 focus-visible:ring-0"
            style={
              {
                fieldSizing: "content",
              } as any
            }
            {...register("text")}
          />
          <div className="box-content flex h-14 flex-nowrap gap-2 overflow-x-auto pt-[7px] pb-1.5">
            <FileTrigger
              allowsMultiple
              acceptedFileTypes={acceptedFileTypes}
              onSelect={async (fileList) => {
                if (fileList) {
                  for (const file of fileList) {
                    await handleFileProcessing(file)
                  }
                }
              }}
            >
              <Button>
                <Paperclip />
              </Button>
            </FileTrigger>
            {files?.map((file) => (
              <FileViewer file={file} removeFile={removeFile} key={file.name} />
            ))}
          </div>
        </div>
      </div>
    </DropZone>
  )
}
