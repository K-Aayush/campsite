import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // Verify session
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const data = await req.json();
    const { bookingId } = data;

    // Fetch booking details
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Generate transaction UUID (alphanumeric and hyphen only)
    const transactionUuid = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    // Format total_amount as a string without decimals
    const totalAmount = Math.floor(booking.totalAmount).toString();

    // Validate environment variables
    const merchantCode = process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY;
    if (!merchantCode || !secretKey) {
      console.error(
        "Missing environment variables: ESEWA_MERCHANT_CODE or ESEWA_SECRET_KEY"
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create HMAC signature
    const message = `${totalAmount},${transactionUuid},${merchantCode}`;
    console.log("Signature Message:", message); // Debug: Log the exact message
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(message)
      .digest("base64");
    console.log("Generated Signature:", signature); // Debug: Log the signature

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

    // Prepare eSewa form data
    const esewaData = {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: merchantCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url:
        process.env.NEXT_PUBLIC_ESEWA_SUCCESS_URL ||
        "https://yourapp.com/success",
      failure_url:
        process.env.NEXT_PUBLIC_ESEWA_FAILURE_URL ||
        "https://yourapp.com/failure",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    console.log("eSewa Form Data:", esewaData); // Debug: Log form data

    // Return response
    return NextResponse.json({
      success: true,
      payment,
      esewaData,
    });
  } catch (error) {
    console.error("Error initiating eSewa payment:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
