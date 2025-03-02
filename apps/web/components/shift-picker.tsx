"use client";

import { usePeriod } from "@/hooks/use-period";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export function ShiftPicker() {
  const { shift, setShift } = usePeriod();
  return (
    <Select value={shift} onValueChange={setShift}>
      <SelectTrigger className="w-[180px] h-10">
        <SelectValue placeholder="Turnos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Turnos da regulação</SelectLabel>
          <SelectItem value="T0">T0 (1h - 7h)</SelectItem>
          <SelectItem value="T1">T1 (7h - 13h)</SelectItem>
          <SelectItem value="T2">T2 (13h - 19h)</SelectItem>
          <SelectItem value="T3">T3 (19h - 1h)</SelectItem>
          <SelectItem value="ALL">Todos (0h - 24h)</SelectItem>
          <SelectItem value="ALL1">Todos (1h - 1h)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Turnos da frota</SelectLabel>
          <SelectItem value="F0">F0 (7h - 19h)</SelectItem>
          <SelectItem value="F1">F1 (19h - 7h)</SelectItem>
          <SelectItem value="ALL2">Todos (7h - 7h)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
