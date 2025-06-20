import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../../../utils/db";
import { sendBookingStatusUpdateToUser } from "../../../../../../../utils/email";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin role
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { approved } = data;

    const booking = await db.booking.update({
      where: { id },
      data: {
        paymentStatus: approved ? "CONFIRMED" : "REJECTED",
        status: approved ? "CONFIRMED" : "REJECTED",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    // Send notification email to user
    try {
      await sendBookingStatusUpdateToUser({
        userEmail: booking.user.email || "",
        userName: booking.user.name || "User",
        serviceName: booking.service.name,
        bookingId: booking.id,
        status: approved ? "approved" : "rejected",
        paymentStatus: booking.paymentStatus,
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalAmount: booking.totalAmount,
      });
    } catch (emailError) {
      console.error("Failed to send user notification:", emailError);
      // Don't fail the update if email fails
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}
