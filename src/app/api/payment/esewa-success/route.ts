// pages/api/payment/esewa-success.js
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "../../../../../utils/db";

export async function GET(req: NextRequest) {
  const encodedResponse = req.nextUrl.searchParams.get("data");
  if (!encodedResponse) {
    return NextResponse.json({ error: "No response data" }, { status: 400 });
  }

  try {
    const decodedResponse = JSON.parse(
      Buffer.from(encodedResponse, "base64").toString()
    );
    const {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    } = decodedResponse;

    // Verify response signature
    const message = `${transaction_code},${status},${total_amount},${transaction_uuid},${product_code},${signed_field_names}`;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.ESEWA_SECRET_KEY!)
      .update(message)
      .digest("base64");

    console.log("Response Message:", message); // Debug
    console.log("Response Signature:", signature); // Debug
    console.log("Generated Signature:", generatedSignature); // Debug

    if (generatedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid response signature" },
        { status: 400 }
      );
    }

    // Update payment status
    if (status === "COMPLETE") {
      await db.payment.update({
        where: { transactionUuid: transaction_uuid },
        data: { status: "COMPLETED" },
      });
    }

    return NextResponse.redirect("/booking/success");
  } catch (error) {
    console.error("Error processing eSewa success response:", error);
    return NextResponse.json(
      { error: "Failed to process response" },
      { status: 500 }
    );
  }
}
