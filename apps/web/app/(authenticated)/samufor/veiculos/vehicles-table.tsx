"use client";

import { usePeriod } from "@/hooks/use-period";
import { queryFactory } from "@/lib/query-keys-factory";
import { useQuery } from "@tanstack/react-query";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableProvider,
} from "@workspace/ui/components/data-table";

export function VehiclesTable() {
  const { period } = usePeriod();
  const { data } = useQuery(queryFactory.emergencies.countByVehicles(period));

  if (!data?.data) return "carregando...";

  return (
    <DataTableProvider
      data={[...data.data, ...data.data, ...data.data, ...data.data]}
      columns={[
        {
          accessorKey: "vehicle",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Véiculo" />
          ),
        },
        {
          accessorKey: "avgLocationArrivalTime",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Chegada ao local (min)"
            />
          ),
        },
        {
          accessorKey: "avgLocationExitTime",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Saída do local (min)"
            />
          ),
        },
        {
          accessorKey: "avgDestinationExitTime",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Liberação do destino (min)"
            />
          ),
        },
        {
          accessorKey: "emergencyCount",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ocorrências" />
          ),
        },
        {
          accessorKey: "patientCount",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pacientes" />
          ),
        },
      ]}
    >
      <DataTable />
    </DataTableProvider>
  );
}
