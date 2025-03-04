"use client";

import { CallsChart } from "@/components/charts/calls-chart";
import { DoctorsTable } from "../dashboard/crufor/doctors-table";
import { usePeriod } from "@/hooks/use-period";
import { useQuery } from "@tanstack/react-query";
import { queryFactory } from "@/lib/query-factory";

export default function RegulacaoPage() {
  const { period, shift } = usePeriod();
  const { data } = useQuery(queryFactory.emergencies.countByCallType(period));
  return (
    <main className="grid md:grid-cols-6 gap-4">
      <DoctorsTable className="md:col-span-full xl:col-span-4 row-span-2" />
      <CallsChart
        data={data?.data ?? []}
        period={period}
        shift={shift}
        className="md:col-span-3 xl:col-span-2"
      />
      <CallsChart
        data={data?.data ?? []}
        period={period}
        shift={shift}
        className="md:col-span-3 xl:col-span-2"
      />
    </main>
  );
}
