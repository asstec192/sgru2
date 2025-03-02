"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { Period, Shift } from "@/hooks/use-period";
import { cn } from "@workspace/ui/lib/utils";
import { InferResponseType } from "@tuyau/client";
import { tuyau } from "@/lib/api";

export function RiskChart({
  data,
  period,
  shift,
  className,
}: {
  data: InferResponseType<typeof tuyau.emergencies.count.byRisk.$get>;
  period: Period;
  shift: Shift;
  className?: string;
}) {
  const emergencies = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    //@ts-expect-error nada errado aqui
    acc[item.risk] = {
      label: item.risk,
      color: `"hsl(var(--chart-${index + 1}))"`,
    };
    return acc;
  }, {} satisfies ChartConfig);

  console.log(chartConfig);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Ocorrências por classificação de risco</CardTitle>
        <CardDescription>
          {period.from.toLocaleString()} - {period.to.toLocaleString()}
          {shift?.includes("ALL") ? null : ` - ${shift}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="risk"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {emergencies.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Ocorrências
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
