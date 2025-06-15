import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin role
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get last 6 months of data
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const bookings = await db.booking.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        createdAt: true,
        totalAmount: true,
        status: true,
      },
    });

    // Group by month
    const monthlyData: {
      [key: string]: { bookings: number; revenue: number };
    } = {};

    bookings.forEach((booking) => {
      const monthKey = booking.createdAt.toISOString().slice(0, 7);

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { bookings: 0, revenue: 0 };
      }

      monthlyData[monthKey].bookings += 1;

      // Only count revenue for confirmed bookings
      if (booking.status === "CONFIRMED" || booking.status === "COMPLETED") {
        monthlyData[monthKey].revenue += booking.totalAmount;
      }
    });

    // Convert to array and sort by date
    const chartData = Object.entries(monthlyData)
      .map(([date, data]) => ({
        date: new Date(date + "-01").toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        bookings: data.bookings,
        revenue: data.revenue,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking stats" },
      { status: 500 }
    );
  }
}
