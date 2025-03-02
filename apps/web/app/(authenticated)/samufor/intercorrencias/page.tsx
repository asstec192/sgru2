import { Card } from "@workspace/ui/components/card";
import { DoctorsTable } from "../../dashboard/crufor/doctors-table";
import { IntercurrencesTable } from "./intercurrences-table";

export default function SamuforIntercorrenciasPage() {
  return (
    <main className="grid xl:grid-cols-3 gap-4">
      <Card className="xl:col-span-2 row-span-2 overflow-hidden">
        <IntercurrencesTable />
      </Card>
      <DoctorsTable />
    </main>
  );
}
