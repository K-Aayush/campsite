import { NextResponse } from "next/server";
import { sendEmail } from "../../../../utils/email";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "contact@mayurwellness.com";

    // Send email to admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "No subject provided"}</p>
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${email}" 
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reply to ${name}
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">
          This message was sent from the Mayur Wellness contact form.
        </p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `Contact Form: ${subject || "New Message"} - ${name}`,
      html: adminHtml,
    });

    // Send confirmation email to user
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Thank You for Contacting Us! 🙏</h2>
        
        <p>Dear ${name},</p>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;">We've received your message and will get back to you within 24-48 hours.</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Message</h3>
          <p><strong>Subject:</strong> ${subject || "No subject"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; font-style: italic;">${message}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Visit Our Website
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">
          In the meantime, feel free to explore our services and book your wellness experience.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          Mayur Wellness - Where Adventure, Nature and Well-being Come Together<br>
          Email: contact@mayurwellness.com | Phone: (123) 456-7890
        </p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Thank you for contacting Mayur Wellness",
      html: userHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
