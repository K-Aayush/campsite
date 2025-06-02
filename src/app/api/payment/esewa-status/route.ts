import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../utils/db";

export async function GET(req: NextRequest) {
  // Extract query parameters using .get()
  const product_code = req.nextUrl.searchParams.get("product_code");
  const total_amount = req.nextUrl.searchParams.get("total_amount");
  const transaction_uuid = req.nextUrl.searchParams.get("transaction_uuid");

  // Validate required parameters
  if (!product_code || !total_amount || !transaction_uuid) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  try {
    // Fetch transaction status from eSewa
    const response = await fetch(
      `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${encodeURIComponent(
        product_code
      )}&total_amount=${encodeURIComponent(
        total_amount
      )}&transaction_uuid=${encodeURIComponent(transaction_uuid)}`
    );

    if (!response.ok) {
      throw new Error(`eSewa API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Update payment status if transaction is complete
    if (data.status === "COMPLETE") {
      await db.payment.update({
        where: { transactionUuid: transaction_uuid },
        data: {
          status: "COMPLETED",
          // Only include refId if it exists in your Prisma schema
          ...(data.ref_id ? { refId: data.ref_id } : {}),
        },
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error checking eSewa status:", error);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    );
  }
}
