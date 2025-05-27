"use client";

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

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Define the type for payment data
interface PaymentData {
  name: string;
  value: number;
  icon: string;
}

// Define payment data with explicit type
const data: PaymentData[] = [
  {
    name: "eSewa",
    value: 0,
    icon: "💳",
  },
  {
    name: "Khalti",
    value: 0,
    icon: "💳",
  },
];

export default function PaymentHistory() {
  const { theme } = useTheme(); 

  const textColor = theme === "dark" ? "#e5e7eb" : "#1f2937"; 

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
          display: false, // Disable y-axis grid for cleaner look
        },
      },
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Payment Methods Used
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[12rem]">
        <Chart type="bar" data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}

// Define Chart.js types for data and options
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
