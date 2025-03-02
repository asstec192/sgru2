"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { InferResponseType } from "@tuyau/client";
import { tuyau } from "@/lib/api";

const chartConfig = {
  count: {
    label: "Ocorrências",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function EmergencyTypeChart({
  period,
  shift,
  data,
  className,
}: {
  period: Period;
  shift: Shift;
  data: InferResponseType<typeof tuyau.emergencies.count.byType.$get>;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ocorrências por tipo</CardTitle>
        <CardDescription>
          {period.from.toLocaleString()} - {period.to.toLocaleString()}
          {shift?.includes("ALL") ? null : ` - ${shift}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={120}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/*    <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
