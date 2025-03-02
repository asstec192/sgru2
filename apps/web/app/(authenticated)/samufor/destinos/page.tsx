import { Card } from "@workspace/ui/components/card";
import { DoctorsTable } from "../../dashboard/crufor/doctors-table";
import { DestinationsTable } from "./destinations-table";

export default function SamuforDestinosPage() {
  return (
    <main className="grid xl:grid-cols-3 gap-4">
      <Card className="xl:col-span-2 row-span-2 overflow-hidden">
        <DestinationsTable />
      </Card>
      <DoctorsTable />
    </main>
  );
}
