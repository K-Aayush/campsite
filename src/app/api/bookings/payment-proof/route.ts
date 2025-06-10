import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const paymentProof = formData.get("paymentProof") as File;
    const bookingId = formData.get("bookingId") as string;

    if (!paymentProof || !bookingId) {
      return NextResponse.json(
        { error: "Payment proof and booking ID are required" },
        { status: 400 }
      );
    }

    // Verify booking exists and belongs to user
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.user.email !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Upload file to Firebase Storage
    const bytes = await paymentProof.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `payment-proofs/${bookingId}-${Date.now()}-${paymentProof.name}`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, buffer);
    const downloadURL = await getDownloadURL(storageRef);

    // Update booking with payment proof
    const updatedBooking = await db.booking.update({
      where: { id: bookingId },
      data: {
        paymentProof: downloadURL,
        paymentStatus: "PENDING_APPROVAL",
      },
    });

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    return NextResponse.json(
      { error: "Failed to upload payment proof" },
      { status: 500 }
    );
  }
}
