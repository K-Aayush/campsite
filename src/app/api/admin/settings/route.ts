import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../../../../utils/db";

export async function GET() {
  try {
    // Try to get settings from database
    let settings = await db.settings.findFirst();

    // If no settings exist, create default ones
    if (!settings) {
      settings = await db.settings.create({
        data: {
          siteName: "Mayur Wellness",
          siteDescription:
            "Where Adventure, Nature and Well-being Come Together",
          contactEmail: "contact@mayurwellness.com",
          contactPhone: "(123) 456-7890",
          address: "123 Forest Path, Tranquil Valley, TV 45678",
          socialMedia: JSON.stringify({
            facebook: "",
            instagram: "",
            twitter: "",
          }),
        },
      });
    }

    // Parse social media JSON
    const socialMedia = JSON.parse(settings.socialMedia);

    return NextResponse.json({
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
      socialMedia,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
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

    // Validate required fields
    if (!data.siteName || !data.contactEmail || !data.contactPhone) {
      return NextResponse.json(
        { error: "Site name, contact email, and phone are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if settings exist
    const existingSettings = await db.settings.findFirst();

    const settingsData = {
      siteName: data.siteName,
      siteDescription: data.siteDescription || "",
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      address: data.address || "",
      socialMedia: JSON.stringify(
        data.socialMedia || {
          facebook: "",
          instagram: "",
          twitter: "",
        }
      ),
    };

    if (existingSettings) {
      // Update existing settings
      await db.settings.update({
        where: { id: existingSettings.id },
        data: settingsData,
      });
    } else {
      // Create new settings
      await db.settings.create({
        data: settingsData,
      });
    }

    return NextResponse.json({
      success: true,
      settings: {
        ...settingsData,
        socialMedia: JSON.parse(settingsData.socialMedia),
      },
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
