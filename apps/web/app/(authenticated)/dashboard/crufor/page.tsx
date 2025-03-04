"use client";

import { CallsChart } from "@/components/charts/calls-chart";
import { usePeriod } from "@/hooks/use-period";
import { DoctorsTable } from "./doctors-table";
import { useQueries } from "@tanstack/react-query";
import { RiskChart } from "@/components/charts/risk-chart";
import { EmergencyTypeChart } from "@/components/charts/emergency-type-chart";
import { EmergencyReasonChart } from "@/components/charts/emergency-reason-chart";
import { RegionChart } from "@/components/charts/region-chart";
import { NeighborhoodChart } from "@/components/charts/neighborhood-chart";
import { queryFactory } from "@/lib/query-factory";

export default function CruforPage() {
  const { period, shift } = usePeriod();
  const [
    callTypeQuery,
    riskQuery,
    emergencyTypeQuery,
    emergencyReasonQuery,
    neighborhoodQuery,
    regionQuery,
  ] = useQueries({
    queries: [
      queryFactory.emergencies.countByCallType(period),
      queryFactory.emergencies.countByRisk(period),
      queryFactory.emergencies.countByType(period),
      queryFactory.emergencies.countByReason(period),
      queryFactory.emergencies.countByNeighborhood(period),
      queryFactory.emergencies.countByRegion(period),
    ],
  });

  return (
    <main className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <CallsChart
        data={callTypeQuery?.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-2"
      />
      <CallsChart
        data={callTypeQuery?.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-2"
      />
      <DoctorsTable className="xl:order-1" />
      <DoctorsTable className="xl:order-4" />
      <DoctorsTable className="md:col-span-2 xl:order-5" />
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
      <RegionChart
        data={regionQuery.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-9"
      />
      <NeighborhoodChart
        data={neighborhoodQuery.data?.data ?? []}
        period={period}
        shift={shift}
        className="xl:order-10"
      />
    </main>
  );
}
