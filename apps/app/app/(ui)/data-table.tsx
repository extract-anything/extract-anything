"use client"
"use no memo"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@extract-anything/ui/table"
import { type Table as TTable, flexRender } from "@tanstack/react-table"
import { useEffect, useRef } from "react"

export interface DataTableProps<TData> {
  table: TTable<TData>
}

export const DataTable = <TData,>({ table }: DataTableProps<TData>) => {
  const tableRef = useRef<HTMLDivElement>(null)

  const data = table.getAllColumns()

  useEffect(() => {
    if (tableRef.current && data) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [data])

  return (
    <div className="max-h-[650px] overflow-y-auto">
      <div className="border" ref={tableRef}>
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center" />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
