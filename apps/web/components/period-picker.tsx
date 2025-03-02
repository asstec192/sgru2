"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { usePeriod } from "@/hooks/use-period";

export function PeriodPicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { period, setPeriod } = usePeriod();
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(period);

  const canAppyDate = React.useMemo(
    () => !!tempDate?.from && !!tempDate.to,
    [tempDate]
  );

  const applyDate = () => {
    if (canAppyDate) {
      setPeriod({
        from: tempDate!.from!,
        to: tempDate!.to!,
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="period"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !period && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {period?.from ? (
              period.to ? (
                <>
                  {format(period.from, "LLL dd, y")} -{" "}
                  {format(period.to, "LLL dd, y")}
                </>
              ) : (
                format(period.from, "LLL dd, y")
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={setTempDate}
            numberOfMonths={2}
          />
          <div className="p-2">
            <Button
              disabled={!canAppyDate}
              onClick={applyDate}
              className="w-full"
            >
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
