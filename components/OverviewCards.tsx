"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const exportToCSV = (prices: Record<string, number>) => {
  const rows = Object.entries(prices).map(([coin, price]) => `${coin},${price}`)
  const csv = `Coin,Price\n${rows.join("\n")}`
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "crypto_prices.csv"
  a.click()
  URL.revokeObjectURL(url)
}

const exportToPDF = async () => {
  const element = document.getElementById("overview-card-group")
  if (!element) return

  const canvas = await html2canvas(element)
  const imgData = canvas.toDataURL("image/png")
  const pdf = new jsPDF()
  pdf.addImage(imgData, "PNG", 10, 10, 190, 0) // Fit to width
  pdf.save("dashboard_cards.pdf")
}
