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

    // Get payment method statistics
    const paymentStats = await db.booking.groupBy({
      by: ["paymentMethod"],
      where: {
        paymentMethod: {
          not: null,
        },
        paymentStatus: "CONFIRMED",
      },
      _count: {
        paymentMethod: true,
      },
    });

    // Transform data for chart
    const paymentData = [
      {
        name: "eSewa",
        value:
          paymentStats.find((stat) => stat.paymentMethod === "ESEWA")?._count
            .paymentMethod || 0,
        icon: "💳",
      },
      {
        name: "Khalti",
        value:
          paymentStats.find((stat) => stat.paymentMethod === "KHALTI")?._count
            .paymentMethod || 0,
        icon: "💳",
      },
      {
        name: "Cash",
        value:
          paymentStats.find((stat) => stat.paymentMethod === "CASH")?._count
            .paymentMethod || 0,
        icon: "💵",
      },
      {
        name: "Bank Transfer",
        value:
          paymentStats.find((stat) => stat.paymentMethod === "BANK_TRANSFER")
            ?._count.paymentMethod || 0,
        icon: "🏦",
      },
    ];

    return NextResponse.json(paymentData);
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment stats" },
      { status: 500 }
    );
  }
}
