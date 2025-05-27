"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Define the type for booking data
interface Booking {
  id: string;
  packageName: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const bookings: Booking[] = [
  {
    id: "1",
    packageName: "Mountain Adventure",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-07"),
    amount: 15000,
    status: "Confirmed",
  },
  {
    id: "2",
    packageName: "Beach Retreat",
    startDate: new Date("2025-07-10"),
    endDate: new Date("2025-07-15"),
    amount: 12000,
    status: "Pending",
  },
  {
    id: "3",
    packageName: "City Tour",
    startDate: new Date("2025-08-20"),
    endDate: new Date("2025-08-22"),
    amount: 8000,
    status: "Cancelled",
  },
];

export default function RecentBookings() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Package</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.packageName}</TableCell>
                <TableCell>{format(booking.startDate, "PPP")}</TableCell>
                <TableCell>{format(booking.endDate, "PPP")}</TableCell>
                <TableCell>NPR {booking.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === "Confirmed"
                        ? "default"
                        : booking.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
