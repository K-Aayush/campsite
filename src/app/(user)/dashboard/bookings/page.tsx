"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { showToast } from "@/utils/Toast";

// Define the type for booking data, matching API response
interface Booking {
  id: string;
  packageName: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  payment?: {
    status: "PENDING" | "CONFIRMED" | "FAILED";
  };
}

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchBookings();
    }
  }, [status, session]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch bookings");
      }
      const data: Booking[] = await response.json();
      setBookings(data);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      setError(error.message || "Failed to load bookings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (response.ok) {
        showToast("success", {
          title: "Booking cancelled successfully",
        });
        fetchBookings();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel booking");
      }
    } catch (error: any) {
      console.error("Error cancelling booking:", error);
      showToast("error", {
        title: error.message || "Failed to cancel booking",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "CONFIRMED":
        return "bg-green-500 hover:bg-green-600";
      case "CANCELLED":
        return "bg-red-500 hover:bg-red-600";
      case "COMPLETED":
        return "bg-blue-500 hover:bg-blue-600";
      case "FAILED":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-7xl mt-32">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-7xl mt-32">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">My Bookings</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              View and manage your booking history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Please sign in to view your bookings.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-7xl mt-32">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-7xl mt-32">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">My Bookings</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              View and manage your booking history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-red-500 dark:text-red-400">
              {error}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl mt-32">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">My Bookings</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            View and manage your booking history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        {booking.packageName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Duration: {booking.numberOfDays}{" "}
                          {booking.numberOfDays === 1 ? "day" : "days"}
                        </p>
                        <p>
                          Dates: {format(new Date(booking.startDate), "PPP")} -{" "}
                          {format(new Date(booking.endDate), "PPP")}
                        </p>
                        <p>NPR {booking.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        className={`${getStatusColor(booking.status)} text-white`}
                      >
                        {booking.status}
                      </Badge>
                      {booking.payment && (
                        <Badge
                          className={`${getStatusColor(booking.payment.status)} text-white`}
                        >
                          Payment: {booking.payment.status}
                        </Badge>
                      )}
                      {booking.status === "PENDING" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(booking.id)}
                          className="mt-2"
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {bookings.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No bookings found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
