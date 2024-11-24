"use client"

import { Button } from "@extract-anything/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@extract-anything/ui/dropdown-menu"
import type { Table } from "@tanstack/react-table"
import { stringify } from "csv-stringify/sync"
import { DownloadIcon } from "lucide-react"
import { utils, writeFile } from "xlsx"

export const Download = <TData,>({ table, data }: { table: Table<TData>; data: TData[] }) => {
  const handleDownload = (type: "excel" | "csv" | "json") => {
    const headers = table.getFlatHeaders().map((header) => header.column.id)
    const rows = table
      .getRowModel()
      .rows.map((row) => row.getVisibleCells().map((cell) => cell.getValue() as string))
    const refinedData = [headers, ...rows]
    const hash = Math.random().toString(36).substring(2, 14)

    if (type === "csv") {
      const csvContent = stringify(refinedData)
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `data-${hash}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } else if (type === "excel") {
      const worksheet = utils.aoa_to_sheet(refinedData)
      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, worksheet, "Data")

      const cols = refinedData[0].map((_, columnIndex) => ({
        wch: Math.max(...refinedData.map((row) => row[columnIndex].length), 10),
      }))
      worksheet["!cols"] = cols

      writeFile(workbook, `data-${hash}.xlsx`, { compression: true })
    } else {
      const jsonContent = JSON.stringify(data, undefined, 2)
      const blob = new Blob([jsonContent], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `data-${hash}.json`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <DownloadIcon width={16} className="mr-2" /> Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDownload("excel")}>Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload("csv")}>CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload("json")}>JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
