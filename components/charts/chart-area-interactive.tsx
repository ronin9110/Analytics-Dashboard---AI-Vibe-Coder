"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Slider } from "@/components/ui/slider";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  bitcoin: { label: "Bitcoin", color: "var(--chart-1)" },
  ethereum: { label: "Ethereum", color: "var(--chart-2)" },
  solana: { label: "Solana", color: "var(--chart-3)" },
  cardano: { label: "Cardano", color: "var(--chart-4)" },
} satisfies ChartConfig;

interface CryptoDataPoint {
  timestamp: string; // ISO string
  bitcoin: number;
  ethereum: number;
  solana: number;
  cardano: number;
}

const currencies = Object.entries(chartConfig).map(
  ([key, { label }]: any) => key
);

interface ChartAreaInteractiveProps {
  chartData: CryptoDataPoint[];
}

export function ChartAreaInteractive({ chartData }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();

  const [timeRange, setTimeRange] = React.useState("90d");
  const [ActiveCurr, setActiveCurr] = React.useState(currencies);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date(); // Today
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract);

    return chartData.filter((item) => {
      const date = new Date(item.timestamp);
      return date >= startDate;
    });
  }, [chartData, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => {
              if (val) setTimeRange(val);
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={timeRange}
            onValueChange={(val) => {
              if (val) setTimeRange(val);
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="line"
                />
              }
            />
            {ActiveCurr.map((i: keyof typeof chartConfig, ind: number) => (
              <Area
                key={ind}
                dataKey={i}
                type="natural"
                fill={ind % 2 === 0 ? "url(#fillMobile)" : "url(#fillDesktop)"}
                stroke={chartConfig[i].color}
                stackId={ind}
              />
            ))}
          </AreaChart>
        </ChartContainer>
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 w-full justify-center">
          <ToggleGroup
            value={ActiveCurr}
            variant="outline"
            type="multiple"
            onValueChange={setActiveCurr}
            className="flex flex-wrap mt-4"
          >
            {currencies.map((i: any, ind) => (
              <ToggleGroupItem
                key={ind}
                value={i}
                aria-label={`Toggle ${i}`}
                className="text-xs sm:text-sm md:text-base px-3 py-1"
              >
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
}
