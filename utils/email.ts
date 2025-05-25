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
  // host: process.env.NODEMAILER_HOST,
  // port: process.env.NODEMAILER_PORT,
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

const sendEmail = async ({
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
