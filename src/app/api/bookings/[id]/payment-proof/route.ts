import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../../utils/db";

export async function POST(req: Request) {
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

    const data = await req.json();
    const { serviceId, startDate, endDate, totalAmount } = data;

    // Calculate deposit amount (e.g., 20% of total)
    const depositAmount = totalAmount * 0.2;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    const booking = await db.booking.create({
      data: {
        userId: user.id,
        serviceId,
        startDate: start,
        endDate: end,
        totalAmount,
        depositAmount,
        duration,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
