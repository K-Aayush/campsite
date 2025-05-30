import { NextResponse } from "next/server";
import { db } from "../../../../../utils/db";

export async function GET() {
  try {
    const blogs = await db.blog.findMany({});
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
