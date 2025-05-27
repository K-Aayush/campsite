import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const {
      packageType,
      packageName,
      startDate,
      endDate,
      numberOfDays,
      totalAmount,
    } = data;

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const booking = await db.booking.create({
      data: {
        userId: user.id,
        packageType,
        packageName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        numberOfDays,
        totalAmount,
        status: "PENDING",
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
