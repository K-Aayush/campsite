import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    const isAdmin = user?.role === "ADMIN";

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin access:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
