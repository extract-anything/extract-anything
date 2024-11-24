"use client"

import type { Table } from "@tanstack/react-table"
import { Check, GripVertical, Settings2 } from "lucide-react"

import { Button } from "@extract-anything/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@extract-anything/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@extract-anything/ui/popover"
import { Sortable, SortableDragHandle, SortableItem } from "@extract-anything/ui/sortable"
import { cn } from "@extract-anything/ui/utils"
import { useMemo, useState } from "react"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export const ColumnFilter = <TData,>({ table }: DataTableViewOptionsProps<TData>) => {
  const [open, setOpen] = useState(false)
  const [drag, setDrag] = useState(false)
  const [search, setSearch] = useState("")

  const columnOrder = table.getState().columnOrder

  const columns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
        .sort((a, b) => {
          return columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id)
        }),
    [table, columnOrder],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-9"
        >
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-[200px] p-0">
        <Command>
          <CommandInput value={search} onValueChange={setSearch} placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              <Sortable
                value={columns.map((c) => ({ id: c.id }))}
                onValueChange={(items) => table.setColumnOrder(items.map((c) => c.id))}
                overlay={<div className="h-8 w-full bg-muted/60" />}
                onDragStart={() => setDrag(true)}
                onDragEnd={() => setDrag(false)}
                onDragCancel={() => setDrag(false)}
              >
                {columns.map((column) => (
                  <SortableItem key={column.id} value={column.id} asChild>
                    <CommandItem
                      value={column.id}
                      onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                      disabled={drag}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center border border-primary",
                          column.getIsVisible()
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>{column.id}</span>
                      {!search ? (
                        <SortableDragHandle
                          variant="ghost"
                          size="icon"
                          className="ml-auto size-5 text-muted-foreground hover:text-foreground focus:bg-muted focus:text-foreground"
                        >
                          <GripVertical className="size-4" aria-hidden="true" />
                        </SortableDragHandle>
                      ) : null}
                    </CommandItem>
                  </SortableItem>
                ))}
              </Sortable>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
