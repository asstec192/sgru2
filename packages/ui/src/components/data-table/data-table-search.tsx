import { HtmlHTMLAttributes, useRef } from "react";

import { Input } from "../input.js";
import { useDataTable } from "./data-table-provider.js";
import { cn } from "@workspace/ui/lib/utils.js";

export function DataTableSearch({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLInputElement>) {
  const { table } = useDataTable();
  const inputRef = useRef();
  return (
    <Input
      placeholder="Buscar..."
      value={inputRef.current}
      onChange={(event) => table.setGlobalFilter(event.target.value)}
      className={cn("h-8", className)}
      {...props}
    />
  );
}
