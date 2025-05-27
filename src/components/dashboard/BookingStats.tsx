"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useTheme } from "next-themes";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define the type for chart data
interface ChartDataPoint {
  date: string;
  Bookings: number;
}

// Define chartdata with explicit type
const chartdata: ChartDataPoint[] = [
  { date: "Jan 23", Bookings: 0 },
  { date: "Feb 23", Bookings: 10 },
  { date: "Mar 23", Bookings: 25 },
  { date: "Apr 23", Bookings: 15 },
  { date: "May 23", Bookings: 30 },
];

export default function BookingStats() {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "#e5e7eb" : "#1f2937";
  const [value, setValue] = useState<ChartDataPoint | null>(null);

  const data: ChartData = {
    labels: chartdata.map((item) => item.date),
    datasets: [
      {
        label: "Bookings",
        data: chartdata.map((item) => item.Bookings),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: textColor,
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} bookings`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: textColor,
        },
        ticks: { color: textColor },
      },
      y: {
        title: {
          display: true,
          text: "Bookings",
          color: textColor,
        },
        ticks: {
          color: textColor,
          callback: function (value) {
            return `${value}`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedData = chartdata[index];
        setValue(selectedData);
      }
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Booking Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[18rem]">
        <Chart type="line" data={data} options={options} />
      </CardContent>
    </Card>
  );
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
}
