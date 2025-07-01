import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../../utils/db";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

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

    const { date, startTime, endTime, maxCapacity } = await req.json();

    // Check if schedule already exists for this date and time
    const existingSchedule = await db.serviceSchedule.findFirst({
      where: {
        serviceId: id,
        date: new Date(date),
        startTime,
      },
    });

    if (existingSchedule) {
      return NextResponse.json(
        { error: "Schedule already exists for this date and time" },
        { status: 400 }
      );
    }

    const schedule = await db.serviceSchedule.create({
      data: {
        serviceId: id,
        date: new Date(date),
        startTime,
        endTime,
        maxCapacity: parseInt(maxCapacity),
      },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}
