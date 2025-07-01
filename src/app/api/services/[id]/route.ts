import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const service = await db.service.findUnique({
      where: {
        id: id,
      },
      include: {
        schedules: true,
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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

    const data = await request.json();

    // Parse packages if they exist
    let packages = [];
    if (data.packages && typeof data.packages === "string") {
      try {
        packages = JSON.parse(data.packages);
      } catch (e) {
        console.log(e);
        packages = [];
      }
    } else if (Array.isArray(data.packages)) {
      packages = data.packages;
    }

    // Parse schedules if they exist
    let schedules = [];
    if (data.schedules && typeof data.schedules === "string") {
      try {
        schedules = JSON.parse(data.schedules);
      } catch (e) {
        console.error("Error parsing schedules:", e);
        schedules = [];
      }
    } else if (Array.isArray(data.schedules)) {
      schedules = data.schedules;
    }

    const service = await db.service.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        isBookable: data.isBookable,
        depositPercentage: data.depositPercentage,
        category: data.category || "general",
        packages: JSON.stringify(packages),
        durations: JSON.stringify(data.durations || 1),
        maxCapacity: data.maxCapacity || 10,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        availableDates: data.availableDates || null,
        timeSlots: data.timeSlots || null,
        schedules,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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

    await db.service.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
