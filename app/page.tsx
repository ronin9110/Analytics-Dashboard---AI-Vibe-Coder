"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";
import { fetchCryptoPrices } from "@/hooks/useCryptoPrices";
import { fetchCryptoHistory } from "@/hooks/cryptoHistory";
import Loading from "./loading";
import { ChartBarInteractive } from "@/components/charts/chart-bar-interactive";
import { ChartRadarInteractive } from "@/components/charts/chart-radar-interactive";
  import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";


export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [SectionData, setSectionData] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ChartData, setChartData] = useState<any>();
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

      setInterval(() => {
        loadPrices();
      }, 10000);
  }, []);

  if (isLoading || !SectionData)
    return (
      <div className="flex justify-center h-full">
        <Loading />
      </div>
    );
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleExportCSV = (data: any[]) => {
  const csvContent = [
    ["Title", "Value", "Growth", "Trend Message", "Subtext"],
    ...data.map((item) => [
      item.title,
      item.value,
      item.growth,
      item.trendMessage,
      item.subtext,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "crypto_prices.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleExportPDF = (data: any[]) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Crypto Prices Overview", 10, 10);

  let y = 20;
  data.forEach((item) => {
    doc.text(`${item.title}: ${item.value}`, 10, y);
    doc.text(`${item.growth} (${item.trendMessage})`, 10, y + 8);
    doc.text(item.subtext, 10, y + 16);
    y += 28;
  });

  doc.save("crypto_prices.pdf");
};


  const { current, previous } = SectionData;
  console.log(SectionData);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <div className="flex justify-end gap-4 ps-6 pb-4">
              <div>
                <Button
              type="button"
              variant={"outline"}
                onClick={() => handleExportCSV(cards)}
              >
                Export as CSV
              </Button>
              <Button
              variant={"outline"}
                onClick={() => handleExportPDF(cards)}
              >
                Export as PDF
              </Button>
              <CardDescription className="flex justify-end mt-2">
          *Updated Every 10 Seconds
        </CardDescription>
              </div>
            </div>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {cards.map((metric, i) => (
                  <SectionCards key={i} {...metric} />
                ))}
              </section>
            </div>
            
            <div className="flex flex-col gap-6 px-4 lg:px-6">
              <ChartAreaInteractive chartData={ChartData} />
              <ChartBarInteractive chartData={ChartData} />
              <ChartRadarInteractive chartData={current} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
