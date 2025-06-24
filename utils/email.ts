"use server";

import { Resend } from "resend";
import nodemailer from "nodemailer";

// === Config ===
const USE_RESEND = process.env.USE_RESEND === "true"; // toggle via env
const domain = process.env.NEXT_PUBLIC_APP_URL;

// === Resend Setup ===
const resend = new Resend(process.env.RESEND_API_KEY);

// === Nodemailer Setup ===
const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  secure: true,
  auth: {
    user: process.env.NODEMAILER_SENDING_EMAIL_TO,
    pass: process.env.NODEMAILER_SENDING_EMAIL_APPPASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// === Generic Email Sender ===
const sendViaNodemailer = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    html,
  });
};

const sendViaResend = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await resend.emails.send({
    from: process.env.RESEND_EMAIL || "your@domain.com",
    to,
    subject,
    html,
  });
};

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (USE_RESEND) {
    try {
      await sendViaResend({ to, subject, html });
    } catch (error) {
      console.error("Resend failed:", error);
    }
  } else {
    try {
      await sendViaNodemailer({ to, subject, html });
    } catch (error) {
      console.error("Nodemailer failed:", error);
    }
  }
};

// === Exported Usage Functions ===

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const html = `<p>Your 2FA code: ${token}</p>`;
  await sendEmail({
    to: email,
    subject: "2FA Code",
    html,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const html = `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`;
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const html = `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`;
  await sendEmail({
    to: email,
    subject: "Confirm your email",
    html,
  });
};

// === New Booking Notification Functions ===

export const sendBookingNotificationToAdmin = async ({
  bookingId,
  userName,
  userEmail,
  serviceName,
  packageName,
  startDate,
  endDate,
  totalAmount,
  depositAmount,
}: {
  bookingId: string;
  userName: string;
  userEmail: string;
  serviceName: string;
  packageName: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  depositAmount: number;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mayurwellness.com";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #16a34a;">New Booking Received!</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Start Date:</strong> ${startDate.toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> NPR ${totalAmount.toLocaleString()}</p>
        <p><strong>Deposit Amount:</strong> NPR ${depositAmount.toLocaleString()}</p>
      </div>

      <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${domain}/admin/bookings" 
           style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View in Admin Panel
        </a>
      </div>

      <p style="color: #666; font-size: 14px;">
        Please review this booking and approve/reject the payment proof when submitted.
      </p>
    </div>
  `;

  await sendEmail({
    to: adminEmail,
    subject: `New Booking: ${serviceName} - ${userName}`,
    html,
  });
};

export const sendBookingStatusUpdateToUser = async ({
  userEmail,
  userName,
  serviceName,
  bookingId,
  status,
  paymentStatus,
  startDate,
  endDate,
  totalAmount,
}: {
  userEmail: string;
  userName: string;
  serviceName: string;
  bookingId: string;
  status: string;
  paymentStatus: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}) => {
  const getStatusMessage = (status: string, paymentStatus: string) => {
    if (paymentStatus === "CONFIRMED" && status === "CONFIRMED") {
      return {
        title: "Booking Confirmed! 🎉",
        message:
          "Great news! Your booking has been confirmed and your payment has been approved.",
        color: "#16a34a",
        bgColor: "#e8f5e8",
      };
    } else if (paymentStatus === "REJECTED") {
      return {
        title: "Payment Rejected ❌",
        message:
          "Unfortunately, your payment proof has been rejected. Please contact us for assistance.",
        color: "#dc2626",
        bgColor: "#fee2e2",
      };
    } else if (status === "COMPLETED") {
      return {
        title: "Booking Completed! ✅",
        message:
          "Thank you for choosing Mayur Wellness! We hope you had a wonderful experience.",
        color: "#16a34a",
        bgColor: "#e8f5e8",
      };
    } else if (status === "CANCELLED") {
      return {
        title: "Booking Cancelled ❌",
        message:
          "Your booking has been cancelled. If you have any questions, please contact us.",
        color: "#dc2626",
        bgColor: "#fee2e2",
      };
    } else {
      return {
        title: "Booking Update 📋",
        message: "Your booking status has been updated.",
        color: "#2563eb",
        bgColor: "#eff6ff",
      };
    }
  };

  const statusInfo = getStatusMessage(status, paymentStatus);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${statusInfo.color};">${statusInfo.title}</h2>
      
      <p>Dear ${userName},</p>
      
      <div style="background-color: ${statusInfo.bgColor}; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;">${statusInfo.message}</p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Start Date:</strong> ${startDate.toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> NPR ${totalAmount.toLocaleString()}</p>
        <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p>
        <p><strong>Payment Status:</strong> ${paymentStatus.replace("_", " ")}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${domain}/my-bookings" 
           style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View My Bookings
        </a>
      </div>

      <p style="color: #666; font-size: 14px;">
        If you have any questions, please don't hesitate to contact us at contact@mayurwellness.com
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #999; font-size: 12px; text-align: center;">
        This is an automated message from Mayur Wellness. Please do not reply to this email.
      </p>
    </div>
  `;

  await sendEmail({
    to: userEmail,
    subject: `Booking Update: ${serviceName} - ${statusInfo.title}`,
    html,
  });
};
