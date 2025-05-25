import { db } from "./db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationtoken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationtoken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
