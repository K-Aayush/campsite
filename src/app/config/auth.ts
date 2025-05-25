import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../../../utils/db";

import bcrytjs from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../utils/usersQuery";

const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     console.log("credentaisls", credentials, req);
    //     console.log("here");
    //     return true;
    //   },
    // }),
    Credentials({
      name: "Credentails",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentails in authorize", credentials);
        console.log("req in authorize", req);
        if (!credentials) return null;

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        console.log("user in authorize", user);

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrytjs.compare(
          credentials.password,
          user.password
        );

        console.log("passwordMatch", passwordMatch);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
};

export default options;
