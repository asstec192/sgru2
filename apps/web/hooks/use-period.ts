import { addDays, setHours, setMinutes, setSeconds } from "date-fns";
import { create } from "zustand";

export type Period = {
  from: Date;
  to: Date;
};

export const shiftHours = {
  T0: { start: 1, end: 7 },
  T1: { start: 7, end: 13 },
  T2: { start: 13, end: 19 },
  T3: { start: 19, end: 1 },
  F0: { start: 7, end: 19 },
  F1: { start: 19, end: 7 },
  ALL: { start: 0, end: 0 },
  ALL1: { start: 1, end: 1 },
  ALL2: { start: 7, end: 7 },
};

export type Shift = keyof typeof shiftHours;

interface DateState {
  period: Period;
  shift: Shift;
  setPeriod: (period: Period) => void;
  setShift: (shift: Shift) => void;
}

const applyShiftToPeriod = (period: Period, shift: Shift): Period => {
  const { start, end } = shiftHours[shift];
  const from = setHours(setMinutes(setSeconds(period.from, 0), 0), start);
  let to = setHours(setMinutes(setSeconds(period.to, 0), 0), end);

  // Adjust the 'to' date if the shift crosses midnight and the dates are the same
  if (start >= end && from.toDateString() === period.to.toDateString()) {
    to = addDays(to, 1);
  }

  return { from, to };
};

export const usePeriod = create<DateState>((set, get) => ({
  period: applyShiftToPeriod(
    {
      from: new Date(),
      to: addDays(new Date(), 1),
    },
    "T0"
  ),
  shift: "T0",
  setPeriod: (period) =>
    set({ period: applyShiftToPeriod(period, get().shift) }),
  setShift: (shift) =>
    set({ shift, period: applyShiftToPeriod(get().period, shift) }),
}));
