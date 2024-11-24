import { CircleX, FileText } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

export const FileViewer = ({
  file,
  removeFile,
}: { file: File; removeFile: (file: File) => void }) => {
  const url = useMemo(() => URL.createObjectURL(file), [file])

  const handleRemoveFile = (file: File) => {
    URL.revokeObjectURL(url)
    removeFile(file)
  }

  const isPDF = file.type === "application/pdf"

  return (
    <div className="group relative inline-block text-sm text-token-text-primary" key={file.name}>
      <div className="relative overflow-hidden rounded-xl border border-token-border-light bg-token-main-surface-primary">
        {isPDF ? (
          <div className="flex items-center gap-3 p-2 pr-4">
            <FileText />
            <div className="flex flex-col items-start">
              <p className="line-clamp-1 font-semibold">{file.name}</p>
              PDF
            </div>
          </div>
        ) : (
          <div className="h-14 w-14">
            <button type="button" className="h-full w-full">
              <Zoom>
                <Image
                  src={url}
                  alt="file"
                  width={56}
                  height={56}
                  className="flex h-full w-full items-center justify-center"
                />
              </Zoom>
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        className="-translate-y-1/2 absolute top-1 right-1 translate-x-1/2 rounded-full bg-white transition-colors hover:opacity-100 group-hover:opacity-100 md:opacity-0"
        onClick={() => handleRemoveFile(file)}
      >
        <span className="" data-state="closed">
          <CircleX />
        </span>
      </button>
    </div>
  )
}
