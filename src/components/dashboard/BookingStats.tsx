"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  LineElement,
  LineController,
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
import { Skeleton } from "@/components/ui/skeleton";

// Register Chart.js components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartDataPoint {
  date: string;
  bookings: number;
  revenue: number;
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
    yAxisID?: string;
  }[];
}

export default function BookingStats() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const textColor = theme === "dark" ? "#e5e7eb" : "#1f2937";

  useEffect(() => {
    fetchBookingStats();
  }, []);

  const fetchBookingStats = async () => {
    try {
      const response = await fetch("/api/admin/booking-stats");
      if (response.ok) {
        const data = await response.json();
        setChartData(data);
      }
    } catch (error) {
      console.error("Error fetching booking stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const data: ChartData = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "Bookings",
        data: chartData.map((item) => item.bookings),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Revenue (NPR)",
        data: chartData.map((item) => item.revenue),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        fill: false,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
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
            if (context.datasetIndex === 0) {
              return `${context.parsed.y} bookings`;
            } else {
              return `NPR ${context.parsed.y.toLocaleString()}`;
            }
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
        type: "linear" as const,
        display: true,
        position: "left" as const,
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
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Revenue (NPR)",
          color: textColor,
        },
        ticks: {
          color: textColor,
          callback: function (value) {
            return `${Number(value).toLocaleString()}`;
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Booking Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[18rem]">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Booking Statistics & Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[18rem]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <Chart type="line" data={data} options={options} />
        )}
      </CardContent>
    </Card>
  );
}
