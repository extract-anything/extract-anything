"use client"

import { Button } from "@extract-anything/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@extract-anything/ui/dialog"
import { Maximize2 } from "lucide-react"
import { useState } from "react"
import type { ControllerRenderProps, FieldValues } from "react-hook-form"

export const ExpandInput = ({
  field,
}: { field: ControllerRenderProps<FieldValues, `schema.${number}.description`> }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="absolute top-0.5 right-1.5">
          <Maximize2 size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-[40vh] flex-col sm:max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Edit description</DialogTitle>
        </DialogHeader>
        <div className="flex h-full w-full flex-col gap-1.5 bg-[#f4f4f4] p-3 transition-colors">
          <textarea
            dir="auto"
            placeholder="Description"
            {...field}
            className="m-0 h-full min-h-20 resize-none border-0 bg-transparent px-0 text-token-text-primary placeholder-slate-600 outline-none focus:border-0 focus:ring-0 focus-visible:ring-0"
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length,
              )
            }
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
