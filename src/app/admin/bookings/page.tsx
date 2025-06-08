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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  depositAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "PENDING" | "PENDING_APPROVAL" | "CONFIRMED" | "REJECTED";
  paymentProof: string | null;
  user: {
    name: string;
    email: string;
  };
  service: {
    name: string;
  };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showToast("error", { title: "Failed to load bookings" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      showToast("success", { title: "Booking status updated" });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      showToast("error", { title: "Failed to update booking" });
    }
  };

  const handlePaymentApproval = async (
    bookingId: string,
    approved: boolean
  ) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }

      showToast("success", {
        title: `Payment ${approved ? "approved" : "rejected"}`,
      });
      fetchBookings();
    } catch (error) {
      console.error("Error updating payment status:", error);
      showToast("error", { title: "Failed to update payment status" });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <TableCell>{booking.service.name}</TableCell>
              <TableCell>
                {booking.user.name}
                <br />
                <span className="text-sm text-gray-500">
                  {booking.user.email}
                </span>
              </TableCell>
              <TableCell>
                {new Date(booking.startDate).toLocaleDateString()} -
                {new Date(booking.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                NPR {booking.totalAmount}
                <br />
                <span className="text-sm text-gray-500">
                  (Deposit: NPR {booking.depositAmount})
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "CONFIRMED"
                      ? "default"
                      : booking.status === "CANCELLED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.paymentStatus === "CONFIRMED"
                      ? "default"
                      : booking.paymentStatus === "REJECTED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {booking.paymentStatus}
                </Badge>
                {booking.paymentProof && (
                  <div className="mt-2">
                    <Image
                      src={booking.paymentProof}
                      alt="Payment Proof"
                      width={100}
                      height={100}
                      className="rounded cursor-pointer hover:opacity-80"
                      onClick={() =>
                        window.open(booking.paymentProof!, "_blank")
                      }
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  {booking.paymentStatus === "PENDING_APPROVAL" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handlePaymentApproval(booking.id, true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve Payment
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handlePaymentApproval(booking.id, false)}
                      >
                        Reject Payment
                      </Button>
                    </>
                  )}
                  {booking.status === "PENDING" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleStatusUpdate(booking.id, "CONFIRMED")
                      }
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
