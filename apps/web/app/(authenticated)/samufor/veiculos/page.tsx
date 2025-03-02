import { Card } from "@workspace/ui/components/card";
import { DoctorsTable } from "../../dashboard/crufor/doctors-table";
import { VehiclesTable } from "./vehicles-table";

export default function SamuforVeiculosPage() {
  return (
    <main className="grid xl:grid-cols-3 gap-4">
      <Card className="xl:col-span-2 row-span-2 overflow-hidden">
        <VehiclesTable />
      </Card>
      <DoctorsTable />
    </main>
  );
}
