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
      phoneNumber,
      paymentMethod,
      numberOfPeople = 1,
      timeSlot,
    } = data;

    // Validate required fields
    if (
      !serviceId ||
      !startDate ||
      !endDate ||
      !totalAmount ||
      !phoneNumber ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify service exists and is bookable
    const service = await db.service.findUnique({
      where: { id: serviceId },
      include: {
        schedules: {
          where: {
            date: new Date(startDate),
            isActive: true,
          },
        },
      },
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

    // Check capacity
    const schedule = service.schedules.find(
      (s) => s.date.toDateString() === new Date(startDate).toDateString()
    );

    let availableCapacity = service.maxCapacity - service.currentBookings;
    let scheduleToUpdate = null;

    if (schedule) {
      availableCapacity = schedule.maxCapacity - schedule.currentBookings;
      scheduleToUpdate = schedule;
    }

    if (numberOfPeople > availableCapacity) {
      return NextResponse.json(
        {
          error: "Not enough capacity available",
          availableSpots: availableCapacity,
        },
        { status: 400 }
      );
    }

    // Check for date conflicts with existing bookings
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

    if (conflictingBooking && !schedule) {
      return NextResponse.json(
        { error: "Service is already booked for the selected dates" },
        { status: 400 }
      );
    }

    // Calculate final amounts
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
        paymentMethod: paymentMethod,
        paymentNotes: phoneNumber ? `Phone: ${phoneNumber}` : null,
        numberOfPeople,
        timeSlot,
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

    // Update service capacity
    await db.service.update({
      where: { id: serviceId },
      data: {
        currentBookings: {
          increment: numberOfPeople,
        },
      },
    });

    // Update schedule capacity if applicable
    if (scheduleToUpdate) {
      await db.serviceSchedule.update({
        where: { id: scheduleToUpdate.id },
        data: {
          currentBookings: {
            increment: numberOfPeople,
          },
        },
      });
    }

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
        phoneNumber: phoneNumber,
        paymentMethod: paymentMethod,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
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
