import { NextResponse } from "next/server";
import { db } from "../../../../utils/db";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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
    const service = await db.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
