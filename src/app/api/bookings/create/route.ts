import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";
import { sendBookingNotificationToAdmin } from "../../../../../utils/email";

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

    // Calculate final amounts - use service base price if no package
    const finalPackagePrice = packagePrice || service.price;
    const finalTotalAmount = totalAmount || finalPackagePrice * (duration || 1);
    const finalDepositAmount =
      depositAmount || (finalTotalAmount * service.depositPercentage) / 100;

    const booking = await db.booking.create({
      data: {
        userId: user.id,
        serviceId,
        packageName: packageName || "Base Service",
        packagePrice: finalPackagePrice,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration: duration || 1,
        totalAmount: finalTotalAmount,
        depositAmount: finalDepositAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: {
        service: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send notification email to admin
    try {
      await sendBookingNotificationToAdmin({
        bookingId: booking.id,
        userName: user.name || "Unknown User",
        userEmail: user.email || "",
        serviceName: service.name,
        packageName: booking.packageName || "Base Service",
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalAmount: booking.totalAmount,
        depositAmount: booking.depositAmount,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
      // Don't fail the booking if email fails
    }

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
