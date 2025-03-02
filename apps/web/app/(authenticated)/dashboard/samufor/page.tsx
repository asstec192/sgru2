"use client";

import { DoctorsTable } from "../crufor/doctors-table";
import { usePeriod } from "@/hooks/use-period";
import { useQueries } from "@tanstack/react-query";
import { queryFactory } from "@/lib/query-keys-factory";
import { RiskChart } from "@/components/charts/risk-chart";
import { EmergencyTypeChart } from "@/components/charts/emergency-type-chart";
import { EmergencyReasonChart } from "@/components/charts/emergency-reason-chart";

export default function SamuforPage() {
  const { period, shift } = usePeriod();
  const [riskQuery, emergencyTypeQuery, emergencyReasonQuery] = useQueries({
    queries: [
      queryFactory.emergencies.countByRisk(period),
      queryFactory.emergencies.countByType(period),
      queryFactory.emergencies.countByReason(period),
    ],
  });

  return (
    <main className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <DoctorsTable className="row-span-2" />
      <RiskChart
        data={riskQuery.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-6"
      />
      <RiskChart
        data={riskQuery.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-6"
      />
      <EmergencyTypeChart
        data={emergencyTypeQuery.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-7"
      />
      <EmergencyReasonChart
        data={emergencyReasonQuery.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-8"
      />
    </main>
  );
}
