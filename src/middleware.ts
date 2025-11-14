import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/jwt";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

const publicRoutes = [
  "/",
  "/auth-test",
  "/api/auth/callback",
  "/api/auth/logout",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/protected/"))
    return NextResponse.next();

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const authToken = request.cookies.get("auth-token");

    if (!authToken) {
      const authUrl = `${
        process.env.AUTH_SERVICE_URL || "http://localhost:3000"
      }/login`;
      return NextResponse.redirect(new URL(authUrl));
    }

    const payload = verifyJWT(authToken.value);
    if (!payload) {
      const authUrl = `${
        process.env.AUTH_SERVICE_URL || "http://localhost:3000"
      }/login`;
      return NextResponse.redirect(new URL(authUrl));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
