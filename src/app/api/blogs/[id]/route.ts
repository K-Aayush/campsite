export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../utils/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const blog = await db.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}
