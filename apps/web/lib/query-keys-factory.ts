import { Period } from "@/hooks/use-period";
import { queryOptions } from "@tanstack/react-query";
import { tuyau } from "./api";

export const queryFactory = {
  emergencies: {
    findMany: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", period],
        queryFn: () =>
          tuyau.emergencies.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
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
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByReason: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByReason", period],
        queryFn: () =>
          tuyau.emergencies.count.byReason.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByCallType: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByCallType", period],
        queryFn: () =>
          tuyau.emergencies.count.byCallType.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByRegion: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByRegion", period],
        queryFn: () =>
          tuyau.emergencies.count.byRegion.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByNeighborhood: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByNeighborhood", period],
        queryFn: () =>
          tuyau.emergencies.count.byNeighborhood.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByRisk: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByRisk", period],
        queryFn: () =>
          tuyau.emergencies.count.byRisk.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByHospital: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByHospital", period],
        queryFn: () =>
          tuyau.emergencies.count.byHospital.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByIntercurrence: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByIntercurrence", period],
        queryFn: () =>
          tuyau.emergencies.count.byIntercurrence.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),

    countByVehicles: (period: Period) =>
      queryOptions({
        queryKey: ["emergencies", "countByVehicles", period],
        queryFn: () =>
          tuyau.emergencies.count.byVehicles.$get({
            query: {
              from: period.from.toDateString(),
              to: period.to.toDateString(),
            },
          }),
      }),
  },
};
