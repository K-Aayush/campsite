"use server";

import { db } from "../utils/db";
import { getUserByEmail } from "../utils/usersQuery";
import { getVerificationTokenByToken } from "../utils/verificationTokenQuery";

export const newVerification = async (token: string) => {
  console.log("token", token);
  const existingToken = await getVerificationTokenByToken(token);

  console.log("existingToken", existingToken);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  console.log("hasExpired", hasExpired);

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  console.log("existingUser", existingUser);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
