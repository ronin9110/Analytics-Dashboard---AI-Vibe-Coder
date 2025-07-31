import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTrendDetails(current: number, previous: number) {
  const diff = current - previous;
  const growth = ((diff / previous) * 100).toFixed(2);

  const isUp = diff >= 0;
  const trendMessage = isUp ? "Trending up" : "Slight dip";
  const subtext = isUp ? "Positive growth since last check" : "Price dropped slightly";

  return {
    growth: `${isUp ? "+" : ""}${growth}%`,
    trendMessage,
    subtext,
  };
}
