import { NextResponse } from "next/server";
import { db } from "../../../../utils/db";

export async function GET() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        url: true,
        createdAt: true,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}
