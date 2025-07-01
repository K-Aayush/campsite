import { NextResponse } from "next/server";
import { db } from "../../../../utils/db";
import { getServerSession } from "next-auth";
import { ServiceStatus } from "@prisma/client";

export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        schedules: true,
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

    const data = await req.json();

    // Parse packages if they exist
    let packages = [];
    if (data.packages && typeof data.packages === "string") {
      try {
        packages = JSON.parse(data.packages);
      } catch (e) {
        console.log(e);
        packages = [];
      }
    } else if (Array.isArray(data.packages)) {
      packages = data.packages;
    }

    // Parse schedules if they exist
    let schedules = [];
    if (data.schedules && typeof data.schedules === "string") {
      try {
        schedules = JSON.parse(data.schedules);
      } catch (e) {
        console.log(e);
        schedules = [];
      }
    } else if (Array.isArray(data.schedules)) {
      schedules = data.schedules;
    }

    let status: ServiceStatus = ServiceStatus.ACTIVE;
    const now = new Date();
    if (data.startDate && data.endDate) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (now < startDate) {
        status = ServiceStatus.SCHEDULED;
      } else if (now > endDate) {
        status = ServiceStatus.COMPLETED;
      }
    }

    const service = await db.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        isBookable: data.isBookable,
        depositPercentage: data.depositPercentage,
        category: data.category || "general",
        packages: JSON.stringify(packages),
        durations: JSON.stringify(data.durations || 1),
        maxCapacity: data.maxCapacity || 10,
        status,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        availableDates: data.availableDates || null,
        timeSlots: data.timeSlots || null,
      },
    });

    // Create individual schedules if provided
    if (schedules.length > 0) {
      for (const schedule of schedules) {
        await db.serviceSchedule.create({
          data: {
            serviceId: service.id,
            date: new Date(schedule.date),
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            maxCapacity: schedule.maxCapacity,
          },
        });
      }
    }

    return NextResponse.json(service);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
