"use client";

import { useSession } from "next-auth/react";
import { Card } from "@tremor/react";
import { BarChart, Calendar, CreditCard } from "lucide-react";
import BookingStats from "@/components/dashboard/BookingStats";
import RecentBookings from "@/components/dashboard/RecentBookings";
import PaymentHistory from "@/components/dashboard/PaymentHistory";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {session.user?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Bookings</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-semibold">NPR 0</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingStats />
        <PaymentHistory />
      </div>

      <RecentBookings />
    </div>
  );
}
