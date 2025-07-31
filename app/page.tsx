"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";
import { fetchCryptoPrices } from "@/lib/hoorks/useCryptoPrices";
import { fetchCryptoHistory } from "@/lib/hoorks/cryptoHistory";
import Loading from "./loading";
import { ChartBarInteractive } from "@/components/charts/chart-bar-interactive";
import { ChartRadarInteractive } from "@/components/charts/chart-radar-interactive";

export default function Page() {
  const [SectionData, setSectionData] = useState<any>(null);
  const [ChartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPrices() {
      try {
        const prices = await fetchCryptoPrices();
        const chartData = await fetchCryptoHistory(90);
        setChartData(chartData);
        setSectionData(prices);
      } catch (error) {
        console.error("Failed to load prices:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPrices();
  }, []);

  if (isLoading || !SectionData)
    return (
      <div className="flex justify-center h-full">
        <Loading />
      </div>
    );

  const { current, previous } = SectionData;
  console.log(SectionData);

  const cards = Object.entries(current).map(([key, val]: any) => {
    const price = val; // keep as number
    const prev = previous[key as keyof typeof previous]; // ensure correct type
    const change = ((price - prev) / prev) * 100;
    const trendUp = change >= 0;

    return {
      title: `${key.charAt(0).toUpperCase() + key.slice(1)} Price`,
      value: `$${price.toLocaleString()}`, // format number with commas
      growth: `${trendUp ? "+" : ""}${change.toFixed(2)}%`,
      trendMessage: trendUp
        ? `${key.toUpperCase()} gaining momentum`
        : `${key.toUpperCase()} losing momentum`,
      subtext: `Compared to previous simulated value $${prev.toLocaleString()}`,
    };
  });

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className=" ps-6 pr-6">
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((metric, i) => (
                  <SectionCards key={i} {...metric} />
                ))}
              </section>
            </div>

            <div className="flex flex-col gap-6 px-4 lg:px-6">
              <ChartAreaInteractive chartData={ChartData} />
              <ChartBarInteractive   chartData={ChartData} />
              <ChartRadarInteractive chartData={current} />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
