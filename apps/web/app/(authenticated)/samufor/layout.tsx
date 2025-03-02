import { PeriodPicker } from "@/components/period-picker";
import { ShiftPicker } from "@/components/shift-picker";
import { ReactNode } from "react";

export default function SAMUForLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 self-end mb-4">
        <ShiftPicker />
        <PeriodPicker />
      </div>
      {children}
    </div>
  );
}
