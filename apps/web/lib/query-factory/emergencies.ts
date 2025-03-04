import { Period } from "@/hooks/use-period";
import { queryOptions } from "@tanstack/react-query";
import { tuyau } from "../api";

export const emergenciesQueryFactory = {
  findMany: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", period],
      queryFn: () =>
        tuyau.emergencies.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  findOne: (id: number) =>
    queryOptions({
      queryKey: ["emergencies", id],
      queryFn: () => tuyau.emergencies({ id }).$get(),
    }),

  getPatients: (emergencyId: number) =>
    queryOptions({
      queryKey: ["emergencies", emergencyId, "patients"],
      queryFn: () => tuyau.emergencies({ id: emergencyId }).$get(),
    }),

  countByType: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByType", period],
      queryFn: () =>
        tuyau.emergencies.count.byType.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByReason: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByReason", period],
      queryFn: () =>
        tuyau.emergencies.count.byReason.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByCallType: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByCallType", period],
      queryFn: () =>
        tuyau.emergencies.count.byCallType.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByRegion: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByRegion", period],
      queryFn: () =>
        tuyau.emergencies.count.byRegion.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByNeighborhood: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByNeighborhood", period],
      queryFn: () =>
        tuyau.emergencies.count.byNeighborhood.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByRisk: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByRisk", period],
      queryFn: () =>
        tuyau.emergencies.count.byRisk.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByHospital: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByHospital", period],
      queryFn: () =>
        tuyau.emergencies.count.byHospital.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByIntercurrence: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByIntercurrence", period],
      queryFn: () =>
        tuyau.emergencies.count.byIntercurrence.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),

  countByVehicles: (period: Period) =>
    queryOptions({
      queryKey: ["emergencies", "countByVehicles", period],
      queryFn: () =>
        tuyau.emergencies.count.byVehicles.$get({
          //@ts-expect-error date are stringfied
          query: {
            from: period.from,
            to: period.to,
          },
        }),
    }),
};
