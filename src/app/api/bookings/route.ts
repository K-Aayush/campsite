import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../utils/db";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookings = await db.booking.findMany({
      where: { userId: user.id },
      include: {
        service: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform bookings to match expected format
    const transformedBookings = bookings.map((booking) => ({
      id: booking.id,
      packageName: booking.service.name,
      startDate: booking.startDate.toISOString(),
      endDate: booking.endDate.toISOString(),
      numberOfDays:
        Math.ceil(
          (booking.endDate.getTime() - booking.startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      totalAmount: booking.totalAmount,
      depositAmount: booking.depositAmount,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      paymentProof: booking.paymentProof,
      createdAt: booking.createdAt.toISOString(),
      service: {
        name: booking.service.name,
        image: booking.service.image,
      },
    }));

    return NextResponse.json(transformedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
