import { cn } from "@extract-anything/ui/utils"
import JSZip from "jszip"
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

  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (items) {
        for (const item of items) {
          if (acceptedFileTypes.includes(item.type)) {
            const file = item.getAsFile()
            if (file) {
              if (file.type === "application/zip") {
                const zip = new JSZip()
                const contents = await zip.loadAsync(file)
                for (const filename in contents.files) {
                  const zipFile = contents.files[filename]
                  if (!zipFile.dir) {
                    const extractedFile = await zipFile.async("blob")
                    addFile(new File([extractedFile], filename))
                  }
                }
              } else {
                addFile(file)
              }
              // Prevent the file name from being appended to the textarea
              event.preventDefault()
            }
          }
        }
      }
    },
    [addFile],
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
        console.log(e)
        const fileList = e.items.filter((file) => file.kind === "file")
        for (const item of fileList) {
          const file = await item.getFile()
          if (file.type === "application/zip") {
            const zip = new JSZip()
            const contents = await zip.loadAsync(file)
            for (const filename in contents.files) {
              const zipFile = contents.files[filename]
              if (!zipFile.dir) {
                const extractedFile = await zipFile.async("blob")
                addFile(new File([extractedFile], filename))
              }
            }
          } else {
            addFile(file)
          }
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
                    if (file.type === "application/zip") {
                      const zip = new JSZip()
                      const contents = await zip.loadAsync(file)
                      for (const filename in contents.files) {
                        const zipFile = contents.files[filename]
                        if (!zipFile.dir) {
                          const extractedFile = await zipFile.async("blob")
                          addFile(new File([extractedFile], filename))
                        }
                      }
                    } else {
                      addFile(file)
                    }
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
