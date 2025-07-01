"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showToast } from "@/utils/Toast";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  User,
  MapPin,
} from "lucide-react";
import Image from "next/image";

interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  depositAmount: number;
  duration: number;
  packageName?: string;
  packagePrice?: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "PENDING" | "PENDING_APPROVAL" | "CONFIRMED" | "REJECTED";
  paymentMethod?: string;
  paymentProof: string | null;
  paymentNotes?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  service: {
    id: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
  };
}

export default function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/bookings");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update booking status");
      }

      showToast("success", { title: "Booking status updated successfully" });
      fetchBookings();
      setIsDialogOpen(false);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update payment status");
      }

      showToast("success", {
        title: `Payment ${approved ? "approved" : "rejected"} successfully`,
      });
      fetchBookings();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating payment status:", error);
      showToast("error", { title: "Failed to update payment status" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      case "COMPLETED":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500";
      case "PENDING_APPROVAL":
        return "bg-orange-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getBookingsForDay = (day: Date) => {
    return bookings.filter((booking) => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      return day >= startDate && day <= endDate;
    });
  };

  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const extractPhoneNumber = (paymentNotes?: string) => {
    if (!paymentNotes) return null;
    const phoneMatch = paymentNotes.match(/Phone:\s*([+\d\s\-()]+)/);
    return phoneMatch ? phoneMatch[1].trim() : null;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Booking Calendar - {format(currentDate, "MMMM yyyy")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-2 text-center font-semibold text-gray-600 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const dayBookings = getBookingsForDay(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[120px] p-2 border rounded-lg ${
                    isCurrentMonth
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  } ${isToday ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div
                    className={`text-sm font-medium mb-2 ${
                      isCurrentMonth
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-400"
                    }`}
                  >
                    {format(day, "d")}
                  </div>

                  <div className="space-y-1">
                    {dayBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        onClick={() => openBookingDetails(booking)}
                        className={`p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(booking.status)} text-white`}
                      >
                        <div className="font-medium truncate">
                          {booking.user.name}
                        </div>
                        <div className="truncate opacity-90">
                          {booking.service.name}
                        </div>
                      </div>
                    ))}
                    {dayBookings.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayBookings.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[1280px] max-h-[90vh] overflow-y-auto custom-scrollbar">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Booking Details
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1  gap-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedBooking.user.image} />
                        <AvatarFallback className="text-lg">
                          {selectedBooking.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedBooking.user.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                          <span>{selectedBooking.user.email}</span>
                        </div>
                        {extractPhoneNumber(selectedBooking.paymentNotes) && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Phone className="h-4 w-4" />
                            <span>
                              {extractPhoneNumber(selectedBooking.paymentNotes)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Service Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedBooking.service.image && (
                      <div className="relative h-32 w-full rounded-lg overflow-hidden">
                        <Image
                          src={selectedBooking.service.image}
                          alt={selectedBooking.service.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold">
                        {selectedBooking.service.name}
                      </h3>
                      {selectedBooking.packageName && (
                        <p className="text-gray-600 dark:text-gray-400">
                          Package: {selectedBooking.packageName}
                        </p>
                      )}
                      {selectedBooking.service.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {selectedBooking.service.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Booking Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Start Date
                        </label>
                        <p className="font-semibold">
                          {format(new Date(selectedBooking.startDate), "PPP")}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          End Date
                        </label>
                        <p className="font-semibold">
                          {format(new Date(selectedBooking.endDate), "PPP")}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Duration
                        </label>
                        <p className="font-semibold">
                          {selectedBooking.duration}{" "}
                          {selectedBooking.duration === 1 ? "day" : "days"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Booking ID
                        </label>
                        <p className="font-semibold text-xs">
                          {selectedBooking.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Badge className={getStatusColor(selectedBooking.status)}>
                        {selectedBooking.status}
                      </Badge>
                      <Badge
                        className={getPaymentStatusColor(
                          selectedBooking.paymentStatus
                        )}
                      >
                        Payment:{" "}
                        {selectedBooking.paymentStatus.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Total Amount
                        </label>
                        <p className="font-semibold text-lg">
                          NPR {selectedBooking.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Deposit Amount
                        </label>
                        <p className="font-semibold text-lg">
                          NPR {selectedBooking.depositAmount.toLocaleString()}
                        </p>
                      </div>
                      {selectedBooking.paymentMethod && (
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Payment Method
                          </label>
                          <p className="font-semibold">
                            {selectedBooking.paymentMethod}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Booked On
                        </label>
                        <p className="font-semibold">
                          {format(new Date(selectedBooking.createdAt), "PPP")}
                        </p>
                      </div>
                    </div>

                    {selectedBooking.paymentProof && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                          Payment Proof
                        </label>
                        <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                          <Image
                            src={selectedBooking.paymentProof}
                            alt="Payment Proof"
                            fill
                            className="object-contain cursor-pointer hover:opacity-80"
                            onClick={() =>
                              window.open(
                                selectedBooking.paymentProof!,
                                "_blank"
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t">
                {selectedBooking.paymentStatus === "PENDING_APPROVAL" && (
                  <>
                    <Button
                      onClick={() =>
                        handlePaymentApproval(selectedBooking.id, true)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve Payment
                    </Button>
                    <Button
                      onClick={() =>
                        handlePaymentApproval(selectedBooking.id, false)
                      }
                      variant="destructive"
                    >
                      Reject Payment
                    </Button>
                  </>
                )}

                {selectedBooking.status === "PENDING" &&
                  selectedBooking.paymentStatus === "CONFIRMED" && (
                    <Button
                      onClick={() =>
                        handleStatusUpdate(selectedBooking.id, "CONFIRMED")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Confirm Booking
                    </Button>
                  )}

                {selectedBooking.status === "CONFIRMED" && (
                  <Button
                    onClick={() =>
                      handleStatusUpdate(selectedBooking.id, "COMPLETED")
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Mark Complete
                  </Button>
                )}

                {(selectedBooking.status === "PENDING" ||
                  selectedBooking.status === "CONFIRMED") && (
                  <Button
                    onClick={() =>
                      handleStatusUpdate(selectedBooking.id, "CANCELLED")
                    }
                    variant="destructive"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
