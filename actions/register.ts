"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import { db } from "../utils/db";
import { sendVerificationEmail } from "../utils/email";
import { generateVerificationToken } from "../utils/tokenQuery";
import { getUserByEmail } from "../utils/usersQuery";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  console.log("email password, name", validatedFields);
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: false, error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  console.log("verification toekn generated", verificationToken);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: true, message: "Confirmation Email Sent!!" };
};
