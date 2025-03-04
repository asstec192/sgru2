"use client";

import { usePeriod } from "@/hooks/use-period";
import { queryFactory } from "@/lib/query-factory";
import { useQuery } from "@tanstack/react-query";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableProvider,
} from "@workspace/ui/components/data-table";

export function DestinationsTable() {
  const { period } = usePeriod();
  const { data } = useQuery(queryFactory.emergencies.countByHospital(period));

  if (!data?.data) return "carregando...";

  return (
    <DataTableProvider
      data={[...data.data, ...data.data, ...data.data, ...data.data]}
      columns={[
        {
          accessorKey: "hospital",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Destino" />
          ),
        },
        {
          accessorKey: "emergencyCount",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ocorrências" />
          ),
        },
        {
          accessorKey: "avgResponseTime",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Tempo respsota (min)"
            />
          ),
        },
      ]}
    >
      <DataTable />
    </DataTableProvider>
  );
}
