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
    console.log("Received update data:", data);

    // Validate required fields
    if (!data.name || !data.description || data.price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, or price" },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (isNaN(data.price) || data.price < 0) {
      return NextResponse.json(
        { error: "Price must be a valid positive number" },
        { status: 400 }
      );
    }

    if (
      isNaN(data.depositPercentage) ||
      data.depositPercentage < 0 ||
      data.depositPercentage > 100
    ) {
      return NextResponse.json(
        { error: "Deposit percentage must be between 0 and 100" },
        { status: 400 }
      );
    }

    if (isNaN(data.maxCapacity) || data.maxCapacity < 1) {
      return NextResponse.json(
        { error: "Max capacity must be at least 1" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      name: data.name.trim(),
      description: data.description.trim(),
      price: data.price,
      depositPercentage: data.depositPercentage,
      maxCapacity: data.maxCapacity,
      isBookable: Boolean(data.isBookable),
      category: data.category || "general",
    };

    // Handle optional fields
    if (data.image !== undefined) {
      updateData.image = data.image || null;
    }

    if (data.startDate) {
      updateData.startDate = new Date(data.startDate);
    } else {
      updateData.startDate = null;
    }

    if (data.endDate) {
      updateData.endDate = new Date(data.endDate);
    } else {
      updateData.endDate = null;
    }

    // Handle packages
    if (data.packages) {
      try {
        let packages = data.packages;
        if (typeof packages === "string") {
          packages = JSON.parse(packages);
        }
        updateData.packages = JSON.stringify(packages);
      } catch (error) {
        console.error("Error processing packages:", error);
        updateData.packages = null;
      }
    } else {
      updateData.packages = null;
    }

    // Handle durations
    if (data.durations) {
      try {
        let durations = data.durations;
        if (typeof durations === "string") {
          durations = JSON.parse(durations);
        }
        updateData.durations = JSON.stringify(durations);
      } catch (error) {
        console.error("Error processing durations:", error);
        updateData.durations = null;
      }
    } else {
      updateData.durations = null;
    }

    console.log("Final update data:", updateData);

    // Update the service
    const service = await db.service.update({
      where: { id: id },
      data: updateData,
    });

    console.log("Updated service:", service);

    return NextResponse.json({
      success: true,
      service,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      {
        error: "Failed to update service",
        details: error instanceof Error ? error.message : "Unknown error",
      },
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
