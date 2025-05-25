import options from "@/app/config/auth";
import NextAuth from "next-auth";
const handler = NextAuth(options); // it takes some options. but we need those configuration in multiples places
export { handler as GET, handler as POST };
