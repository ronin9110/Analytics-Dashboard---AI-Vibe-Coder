import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardProps {
  title: string;
  value: string;
  growth: string;
  trendMessage?: string;
  subtext?: string;
}

export function SectionCards({
  title,
  value,
  growth,
  trendMessage = "Trending up this month",
  subtext = "Visitors for the last 6 months",
}: SectionCardProps) {
  return (
    
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {growth}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {trendMessage} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {subtext}
          </div>
        </CardFooter>
      </Card>
  )
}
