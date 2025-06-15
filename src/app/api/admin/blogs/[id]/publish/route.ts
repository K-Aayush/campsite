import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../../../utils/db";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const blog = await db.blog.update({
      where: { id: context.params.id },
      data: {
        published: data.published,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update blog status" },
      { status: 500 }
    );
  }
}
