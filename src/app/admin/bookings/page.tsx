"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showToast } from "@/utils/Toast";

interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  depositAmount: number;
  status: string;
  paymentStatus: string;
  paymentProof: string | null;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to fetch bookings" });
    }
  };

  const handleApprovePayment = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/approve`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to approve payment");

      showToast("success", { title: "Payment approved" });
      fetchBookings();
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to approve payment" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.serviceId}</TableCell>
              <TableCell>{booking.userId}</TableCell>
              <TableCell>
                {new Date(booking.startDate).toLocaleDateString()} -
                {new Date(booking.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                ${booking.totalAmount}
                <br />
                <span className="text-sm text-gray-500">
                  (Deposit: ${booking.depositAmount})
                </span>
              </TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                {booking.paymentStatus}
                {booking.paymentProof && (
                  <a
                    href={booking.paymentProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-500 hover:underline"
                  >
                    View Proof
                  </a>
                )}
              </TableCell>
              <TableCell>
                {booking.paymentStatus === "PENDING" &&
                  booking.paymentProof && (
                    <Button
                      onClick={() => handleApprovePayment(booking.id)}
                      size="sm"
                    >
                      Approve Payment
                    </Button>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
