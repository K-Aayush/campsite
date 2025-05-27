import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { bookingId } = data;

    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Generate transaction UUID
    const transactionUuid = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    // Create HMAC signature
    const message = `${booking.totalAmount},${transactionUuid},${process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE}`;
    const signature = crypto
      .createHmac("sha256", process.env.ESEWA_SECRET_KEY!)
      .update(message)
      .digest("base64");

    // Create payment record
    const payment = await db.payment.create({
      data: {
        bookingId: booking.id,
        userId: booking.userId,
        amount: booking.totalAmount,
        transactionUuid,
        status: "PENDING",
        paymentMethod: "esewa",
      },
    });

    // Return eSewa payment form data
    return NextResponse.json({
      success: true,
      payment,
      esewaData: {
        amount: booking.totalAmount,
        tax_amount: 0,
        total_amount: booking.totalAmount,
        transaction_uuid: transactionUuid,
        product_code: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: process.env.NEXT_PUBLIC_ESEWA_SUCCESS_URL,
        failure_url: process.env.NEXT_PUBLIC_ESEWA_FAILURE_URL,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      },
    });
  } catch (error) {
    console.error("Error initiating eSewa payment:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
