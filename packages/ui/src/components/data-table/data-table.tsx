//Não modifique esse arquivo se não souber o que esta fazendo

"use client";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table.js";
import { useDataTable } from "./data-table-provider.js";
import { cn } from "@workspace/ui/lib/utils.js";

export function DataTable() {
  const { table } = useDataTable();

  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(header.column.columnDef.meta?.className)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="relative"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn("py-2", cell.column.columnDef.meta?.className)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              Nenhum resultado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
