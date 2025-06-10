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

    // Fetch all stats in parallel
    const [
      totalBookings,
      totalUsers,
      totalServices,
      totalBlogs,
      pendingBookings,
      confirmedBookings,
    ] = await Promise.all([
      db.booking.count(),
      db.user.count(),
      db.service.count(),
      db.blog.count(),
      db.booking.count({ where: { status: "PENDING" } }),
      db.booking.findMany({
        where: { status: "CONFIRMED" },
        select: { totalAmount: true },
      }),
    ]);

    const totalRevenue = confirmedBookings.reduce(
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
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
