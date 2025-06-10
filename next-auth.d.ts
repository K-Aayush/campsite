import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: "ADMIN" | "USER"; 
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    role?: "ADMIN" | "USER";
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends AdapterUser {
    role: "ADMIN" | "USER";
  }
}
