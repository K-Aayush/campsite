"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface PaymentData {
  name: string;
  value: number;
  icon: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
  }[];
}

export default function PaymentHistory() {
  const { theme } = useTheme();
  const [data, setData] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);

  const textColor = theme === "dark" ? "#e5e7eb" : "#1f2937";

  useEffect(() => {
    fetchPaymentStats();
  }, []);

  const fetchPaymentStats = async () => {
    try {
      const response = await fetch("/api/admin/payment-stats");
      if (response.ok) {
        const paymentStats = await response.json();
        setData(paymentStats);
      }
    } catch (error) {
      console.error("Error fetching payment stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData: ChartData = {
    labels: data.map((item) => `${item.icon} ${item.name}`),
    datasets: [
      {
        label: "Payments",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(22, 163, 74, 0.6)",
        borderColor: "#16a34a",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: textColor,
        bodyColor: textColor,
        callbacks: {
          label: function (context) {
            return `${context.parsed.x} payments`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Number of Payments",
          color: textColor,
        },
        ticks: {
          color: textColor,
          stepSize: 1,
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Payment Method",
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Payment Methods Used
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[12rem]">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Payment Methods Used
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[12rem]">
        {data.length === 0 || data.every((item) => item.value === 0) ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No payment data available</p>
          </div>
        ) : (
          <Chart type="bar" data={chartData} options={options} />
        )}
      </CardContent>
    </Card>
  );
}
