"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartData = {
  [key: string]: {
    month: string
    value: number
  }[]
}

const colors = {
  bitcoin: "var(--chart-1)",
  ethereum: "var(--chart-2)",
  solana: "var(--chart-3)",
  cardano: "var(--chart-4)",
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartRadarInteractive({ chartData }: any) {

  const simulateHistory = (current: number): { month: string; value: number }[] => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const res =months.map((month, i) => ({
      month,
      value: +(current * (0.9 + 0.02 * i)).toFixed(2),
    }))
    console.log(current)
    return res;
  }

  const Chart = {
    bitcoin: simulateHistory(chartData.bitcoin),
    ethereum: simulateHistory(chartData.ethereum),
    solana: simulateHistory(chartData.solana),
    cardano: simulateHistory(chartData.cardano),
  }

  console.log(chartData)
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Crypto Radar Overview</CardTitle>
        <CardDescription>Price patterns for last 6 months</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(Chart).map(([name, data]) => (
          <div key={name} className="flex flex-col items-center">
            <ChartContainer
              config={{ [name]: { label: name, color: colors[name as keyof typeof colors] } }}
              className="aspect-square w-full max-w-[200px]"
            >
              <RadarChart data={data}>
                <ChartTooltip
              content={<ChartTooltipContent hideIndicator />}
              cursor={false}  
              // defaultIndex={1}
            />
            <PolarGrid className="fill-(--color-primary) opacity-15" />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="value"
                  label={2}
                  fill={colors[name as keyof typeof colors]}
                  fillOpacity={.6}
                  dot={{ r: 3, fillOpacity: 1 }}
                />
              </RadarChart>
            </ChartContainer>
            <span className="text-sm font-medium capitalize mt-2">{name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
