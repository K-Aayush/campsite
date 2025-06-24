import { NextResponse } from "next/server";
import { db } from "../../../../../utils/db";
import { sendEmail } from "../../../../../utils/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Add to database
    await db.newsletterSubscriber.create({
      data: {
        email,
        subscribedAt: new Date(),
      },
    });

    // Send welcome email
    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Welcome to Mayur Wellness Newsletter! 🌿</h2>
        
        <p>Thank you for subscribing to our newsletter!</p>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;">You'll now receive:</p>
          <ul style="margin: 10px 0;">
            <li>Exclusive meditation guides</li>
            <li>Yoga tips and techniques</li>
            <li>Wellness insights and articles</li>
            <li>Special offers and updates</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Visit Our Website
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">
          If you didn't subscribe to this newsletter, you can safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          Mayur Wellness - Where Adventure, Nature and Well-being Come Together
        </p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Welcome to Mayur Wellness Newsletter! 🌿",
      html: welcomeHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
