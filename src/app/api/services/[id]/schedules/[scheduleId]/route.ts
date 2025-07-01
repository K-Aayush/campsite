import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../../../utils/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string; scheduleId: string }> }
) {
  const { scheduleId } = await context.params;

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

    // Check if there are any bookings for this schedule
    const schedule = await db.serviceSchedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    if (schedule.currentBookings > 0) {
      return NextResponse.json(
        { error: "Cannot delete schedule with existing bookings" },
        { status: 400 }
      );
    }

    await db.serviceSchedule.delete({
      where: { id: scheduleId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
