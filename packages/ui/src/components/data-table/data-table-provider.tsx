"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

type DataTableContextProps<TData> = {
  table: Table<TData>;
};

type DataTableProviderProps<TData, TValue> = {
  children: ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /*  initialPaginationOptions?: {
    pageIndex: number;
    pageSize: number;
  }; */
};

const DataTableContext = createContext({} as DataTableContextProps<any>);

export function useDataTable<TData>() {
  return useContext(DataTableContext) as DataTableContextProps<TData>;
}

export function DataTableProvider<TData, TValue>({
  children,
  data,
  columns, //initialPaginationOptions,
}: DataTableProviderProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  /*   const [pagination, setPagination] = useState({
    pageIndex: initialPaginationOptions?.pageIndex ?? 0, //initial page index
    pageSize: initialPaginationOptions?.pageSize ?? data.length, //default page size
  });

  useEffect(() => {
    if (!initialPaginationOptions) {
      setPagination({ pageIndex: 0, pageSize: data.length });
    }
  }, [data]); */

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: 0,
        pageSize: data.length,
      },
    },
    enableRowSelection: true,
    autoResetPageIndex: false,
    //onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <DataTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
