import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current month start
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    // Fetch all stats in parallel
    const [
      totalBookings,
      totalUsers,
      totalServices,
      totalBlogs,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      monthlyBookings,
    ] = await Promise.all([
      db.booking.count(),
      db.user.count(),
      db.service.count(),
      db.blog.count(),
      db.booking.count({ where: { status: "PENDING" } }),
      db.booking.count({ where: { status: "CONFIRMED" } }),
      db.booking.findMany({
        where: {
          OR: [{ status: "CONFIRMED" }, { status: "COMPLETED" }],
        },
        select: { totalAmount: true },
      }),
      db.booking.findMany({
        where: {
          createdAt: { gte: currentMonth },
          OR: [{ status: "CONFIRMED" }, { status: "COMPLETED" }],
        },
        select: { totalAmount: true },
      }),
    ]);

    const totalRevenue = completedBookings.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0
    );

    const monthlyRevenue = monthlyBookings.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0
    );

    return NextResponse.json({
      totalBookings,
      totalUsers,
      totalServices,
      totalBlogs,
      totalRevenue,
      pendingBookings,
      monthlyRevenue,
      confirmedBookings,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
