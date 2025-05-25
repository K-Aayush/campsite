"use server";

import * as z from "zod";

// // import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { db } from "../utils/db";
import { loginSchema } from "../schemas";
import { getUserByEmail } from "../utils/usersQuery";
import { getTwoFactorConfirmationByUserId } from "../utils/twoFactorConfirmation";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "../utils/tokenQuery";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "../utils/email";
import { getTwoFactorTokenByEmail } from "../utils/twoFactorTokenQuery";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  console.log("login first things", email, password, code);

  const existingUser = await getUserByEmail(email);

  console.log("existingUser", existingUser);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: true, message: "Confirmation message Sent!!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { success: false, error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { success: false, error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { success: false, error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  return { success: true, email, password };

  // try {
  //   await signIn("credentials", {
  //     email,
  //     password,
  //     redirectTo: callbackUrl || "/profile",
  //     // DEFAULT_LOGIN_REDIRECT,
  //   });
  // } catch (error) {
  //   console.log("log", error);
  //   return { success: false, error: "Something went wrong !!" };
  //   // if (error instanceof AuthError) {
  //   //   switch (error.type) {
  //   //     case "CredentialsSignin":
  //   //       return { error: "Invalid credentials!" };
  //   //     default:
  //   //       return { error: "Something went wrong!" };
  //   //   }
  //   // }

  //   throw error;
  // }
};
