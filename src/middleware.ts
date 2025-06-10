import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?callbackUrl=/admin", request.url)
      );
    }
  }

  // Profile routes protection
  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?callbackUrl=/profile", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
