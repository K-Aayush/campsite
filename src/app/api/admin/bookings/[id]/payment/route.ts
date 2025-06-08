import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../../../utils/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      where: { id: params.id },
      data: {
        paymentStatus: approved ? "CONFIRMED" : "REJECTED",
        status: approved ? "CONFIRMED" : "PENDING",
      },
    });

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
