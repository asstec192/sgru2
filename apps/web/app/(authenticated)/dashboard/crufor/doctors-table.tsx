"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  DataTable,
  DataTableProvider,
} from "@workspace/ui/components/data-table";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { cn } from "@workspace/ui/lib/utils";

const data = [
  { doctorName: "Dr. John Doe", emergencyCount: 15, responseTime: 30 },
  { doctorName: "Dr. Jane Smith", emergencyCount: 20, responseTime: 25 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. John Doe", emergencyCount: 15, responseTime: 30 },
  { doctorName: "Dr. Jane Smith", emergencyCount: 20, responseTime: 25 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. John Doe", emergencyCount: 15, responseTime: 30 },
  { doctorName: "Dr. Jane Smith", emergencyCount: 20, responseTime: 25 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. John Doe", emergencyCount: 15, responseTime: 30 },
  { doctorName: "Dr. Jane Smith", emergencyCount: 20, responseTime: 25 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. John Doe", emergencyCount: 15, responseTime: 30 },
  { doctorName: "Dr. Jane Smith", emergencyCount: 20, responseTime: 25 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
  { doctorName: "Dr. John Doe", emergencyCount: 15, responseTime: 30 },
  { doctorName: "Dr. Jane Smith", emergencyCount: 20, responseTime: 25 },
  { doctorName: "Dr. Emily Johnson", emergencyCount: 10, responseTime: 35 },
  { doctorName: "Dr. Michael Brown", emergencyCount: 18, responseTime: 28 },
  { doctorName: "Dr. Sarah Davis", emergencyCount: 22, responseTime: 20 },
];

export function DoctorsTable({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Regulação das solicitações</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <DataTableProvider
          data={data}
          columns={[
            { accessorKey: "doctorName", header: "Médico" },
            { accessorKey: "emergencyCount", header: "Total de ocorrências" },
            { accessorKey: "responseTime", header: "Tempo resposta (min)" },
          ]}
        >
          <ScrollArea className="h-[360px] flex-grow">
            <DataTable />
          </ScrollArea>
        </DataTableProvider>
      </CardContent>
    </Card>
  );
}
