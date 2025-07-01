"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  };
  service: {
    id: string;
    name: string;
    description?: string;
    price?: number;
  };
}

interface ApiResponse {
  success: boolean;
  bookings: Booking[];
  count: number;
}

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, paymentStatusFilter, dateFilter, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/bookings");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load bookings";
      setError(errorMessage);
      showToast("error", {
        title: "Failed to load bookings",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.user?.name?.toLowerCase().includes(term) ||
          booking.user?.email?.toLowerCase().includes(term) ||
          booking.service?.name?.toLowerCase().includes(term) ||
          booking.packageName?.toLowerCase().includes(term) ||
          booking.id.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Payment status filter
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter(
        (booking) => booking.paymentStatus === paymentStatusFilter
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        const bookingDay = new Date(
          bookingDate.getFullYear(),
          bookingDate.getMonth(),
          bookingDate.getDate()
        );

        switch (dateFilter) {
          case "today":
            return bookingDay.getTime() === today.getTime();
          case "week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return bookingDay >= weekAgo;
          case "month":
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return bookingDay >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredBookings(filtered);
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update booking status");
      }

      showToast("success", { title: "Booking status updated successfully" });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update booking";
      showToast("error", {
        title: "Failed to update booking",
        description: errorMessage,
      });
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update payment status");
      }

      showToast("success", {
        title: `Payment ${approved ? "approved" : "rejected"} successfully`,
      });
      fetchBookings();
    } catch (error) {
      console.error("Error updating payment status:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update payment status";
      showToast("error", {
        title: "Failed to update payment status",
        description: errorMessage,
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default";
      case "CANCELLED":
        return "destructive";
      case "COMPLETED":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default";
      case "REJECTED":
        return "destructive";
      case "PENDING_APPROVAL":
        return "secondary";
      default:
        return "outline";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setDateFilter("all");
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={fetchBookings}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by customer name, email, service, package, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Payment Status
              </label>
              <Select
                value={paymentStatusFilter}
                onValueChange={setPaymentStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Payment Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PENDING_APPROVAL">
                    Pending Approval
                  </SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Date Range
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredBookings.length} of {bookings.length} bookings
            </span>
            {(searchTerm ||
              statusFilter !== "all" ||
              paymentStatusFilter !== "all" ||
              dateFilter !== "all") && (
              <span className="text-blue-600">Filters applied</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {searchTerm ||
            statusFilter !== "all" ||
            paymentStatusFilter !== "all" ||
            dateFilter !== "all"
              ? "No bookings found matching your filters"
              : "No bookings found"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {booking.service?.name || "Unknown Service"}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {booking.serviceId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {booking.user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.user?.email || "No email"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.packageName ? (
                      <div>
                        <p className="font-medium">{booking.packageName}</p>
                        {booking.packagePrice && (
                          <p className="text-sm text-gray-500">
                            NPR {booking.packagePrice}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">No package</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                      <p className="text-gray-500">to</p>
                      <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">
                        ({booking.duration || 1}{" "}
                        {(booking.duration || 1) === 1 ? "day" : "days"})
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        NPR {booking.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Deposit: NPR {booking.depositAmount.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Badge
                        variant={getPaymentStatusBadgeVariant(
                          booking.paymentStatus
                        )}
                      >
                        {booking.paymentStatus.replace("_", " ")}
                      </Badge>
                      {booking.paymentMethod && (
                        <p className="text-xs text-gray-500">
                          via {booking.paymentMethod}
                        </p>
                      )}
                      {booking.paymentProof && (
                        <div className="mt-2">
                          <Image
                            src={booking.paymentProof}
                            alt="Payment Proof"
                            width={60}
                            height={60}
                            className="rounded cursor-pointer hover:opacity-80 object-cover"
                            onClick={() =>
                              window.open(booking.paymentProof!, "_blank")
                            }
                          />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {booking.paymentStatus === "PENDING_APPROVAL" && (
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            onClick={() =>
                              handlePaymentApproval(booking.id, true)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve Payment
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handlePaymentApproval(booking.id, false)
                            }
                          >
                            Reject Payment
                          </Button>
                        </div>
                      )}
                      {booking.status === "PENDING" &&
                        booking.paymentStatus === "CONFIRMED" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(booking.id, "CONFIRMED")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Confirm Booking
                          </Button>
                        )}
                      {booking.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(booking.id, "COMPLETED")
                          }
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
