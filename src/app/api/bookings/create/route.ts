import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

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
    const {
      serviceId,
      packageName,
      packagePrice,
      startDate,
      endDate,
      duration,
      totalAmount,
      depositAmount,
    } = data;

    // Validate required fields
    if (!serviceId || !startDate || !endDate || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify service exists and is bookable
    const service = await db.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (!service.isBookable) {
      return NextResponse.json(
        { error: "Service is not available for booking" },
        { status: 400 }
      );
    }

    // Check for date conflicts
    const conflictingBooking = await db.booking.findFirst({
      where: {
        serviceId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        OR: [
          {
            AND: [
              { startDate: { lte: new Date(startDate) } },
              { endDate: { gte: new Date(startDate) } },
            ],
          },
          {
            AND: [
              { startDate: { lte: new Date(endDate) } },
              { endDate: { gte: new Date(endDate) } },
            ],
          },
          {
            AND: [
              { startDate: { gte: new Date(startDate) } },
              { endDate: { lte: new Date(endDate) } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: "Service is already booked for the selected dates" },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        userId: user.id,
        serviceId,
        packageName: packageName || null,
        packagePrice: packagePrice || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration: duration || 1,
        totalAmount,
        depositAmount: depositAmount || totalAmount * 0.2,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: {
        service: {
          select: {
            name: true,
          },
        },
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
