"use no memo"

import { Card } from "@extract-anything/shared/card"
import { Download } from "@extract-anything/shared/download"
import { Button } from "@extract-anything/ui/button"
import type { ColumnDef, SortingState, VisibilityState } from "@tanstack/react-table"
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { X } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { useMemo, useState } from "react"
import { ColumnFilter } from "./column-filter"
import { DataTable } from "./data-table"
import { DataTableHeader } from "./data-table-header"

export const Results = <TData extends object>({
  data,
  setResults,
}: {
  data: TData[]
  setResults: Dispatch<SetStateAction<Record<string, string>[]>>
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const columns: ColumnDef<TData, string>[] = useMemo(
    () =>
      Array.from(new Set(data.flatMap(Object.keys))).map((item) => ({
        accessorKey: item,
        header: ({ column }) => <DataTableHeader column={column} title={item} />,
      })),
    [data],
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Card className="flex h-full w-full flex-col p-4">
      <div className="flex justify-between pb-4">
        <div className="flex gap-2">
          <Download table={table} data={data} />
          <Button
            variant="outline"
            onClick={() => {
              setResults([])
            }}
          >
            <X width={16} className="mr-2" /> Clear
          </Button>
        </div>
        <ColumnFilter table={table} />
      </div>
      <DataTable table={table} />
    </Card>
  )
}
