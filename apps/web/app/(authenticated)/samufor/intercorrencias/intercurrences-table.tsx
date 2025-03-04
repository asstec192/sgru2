"use client";

import { usePeriod } from "@/hooks/use-period";
import { queryFactory } from "@/lib/query-factory";
import { useQuery } from "@tanstack/react-query";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableProvider,
} from "@workspace/ui/components/data-table";

export function IntercurrencesTable() {
  const { period } = usePeriod();
  const { data } = useQuery(
    queryFactory.emergencies.countByIntercurrence(period)
  );

  if (!data?.data) return "carregando...";

  return (
    <DataTableProvider
      data={[...data.data, ...data.data, ...data.data, ...data.data]}
      columns={[
        {
          accessorKey: "intercurrence",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Intercorrência" />
          ),
        },
        {
          accessorKey: "emergencyCount",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ocorrências" />
          ),
        },
      ]}
    >
      <DataTable />
    </DataTableProvider>
  );
}
