import { NextResponse } from "next/server";
import { db } from "../../../../../../utils/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const service = await db.service.findUnique({
      where: { id },
      include: {
        schedules: {
          where: {
            isActive: true,
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
        },
        bookings: {
          where: {
            status: {
              in: ["PENDING", "CONFIRMED"],
            },
          },
          select: {
            startDate: true,
            endDate: true,
            numberOfPeople: true,
            timeSlot: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Calculate availability for each schedule
    const availabilityData = service.schedules.map((schedule) => {
      const bookingsForSchedule = service.bookings.filter((booking) => {
        const bookingDate = booking.startDate.toDateString();
        const scheduleDate = schedule.date.toDateString();
        return bookingDate === scheduleDate;
      });

      const totalBooked = bookingsForSchedule.reduce(
        (sum, booking) => sum + (booking.numberOfPeople || 1),
        0
      );

      return {
        id: schedule.id,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        maxCapacity: schedule.maxCapacity,
        currentBookings: schedule.currentBookings,
        totalBooked,
        availableSpots: schedule.maxCapacity - totalBooked,
        isAvailable: schedule.maxCapacity > totalBooked,
      };
    });

    // Parse available dates and time slots
    let availableDates = [];
    let timeSlots = [];

    if (service.availableDates) {
      try {
        availableDates = JSON.parse(service.availableDates);
      } catch (e) {
        console.error("Error parsing available dates:", e);
      }
    }

    if (service.timeSlots) {
      try {
        timeSlots = JSON.parse(service.timeSlots);
      } catch (e) {
        console.error("Error parsing time slots:", e);
      }
    }

    return NextResponse.json({
      service: {
        id: service.id,
        name: service.name,
        maxCapacity: service.maxCapacity,
        currentBookings: service.currentBookings,
        status: service.status,
        startDate: service.startDate,
        endDate: service.endDate,
        availableDates,
        timeSlots,
      },
      schedules: availabilityData,
      totalAvailableSpots: service.maxCapacity - service.currentBookings,
    });
  } catch (error) {
    console.error("Error fetching service availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch service availability" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const { date, numberOfPeople = 1 } = await request.json();

    // Check service availability
    const service = await db.service.findUnique({
      where: { id },
      include: {
        schedules: {
          where: {
            date: new Date(date),
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

    // Check if there's a specific schedule for this date
    const schedule = service.schedules.find(
      (s) => s.date.toDateString() === new Date(date).toDateString()
    );

    let availableCapacity = service.maxCapacity - service.currentBookings;

    if (schedule) {
      availableCapacity = schedule.maxCapacity - schedule.currentBookings;
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

    return NextResponse.json({
      available: true,
      availableSpots: availableCapacity,
      message: `${numberOfPeople} spot(s) available for booking`,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
