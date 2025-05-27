"use client";

import { Card, Title, AreaChart } from "@tremor/react";
import { useState } from "react";

const chartdata = [
  {
    date: "Jan 23",
    Bookings: 0,
  },
  // Add more data points as needed
];

export default function BookingStats() {
  const [value, setValue] = useState(null);

  return (
    <Card>
      <Title>Booking Statistics</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["Bookings"]}
        colors={["green"]}
        valueFormatter={(number) => `${number} bookings`}
        onValueChange={(v) => setValue(v)}
      />
    </Card>
  );
}