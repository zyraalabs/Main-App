import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";
import { HOME_URL, JWT_SECRET } from "@/lib/env";

const PUBLIC_PREFIXES = [
  "/api/auth/callback",
  "/api/auth/logout",
  "/auth/",
  "/cli-auth",
  "/_next/",
  "/favicon.ico",
];

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;

  if (!token || !(await isValidToken(token))) {
    const response = NextResponse.redirect(HOME_URL);
    response.cookies.set("auth-token", "", { expires: new Date(0), path: "/" });
    response.cookies.set("user-info", "", { expires: new Date(0), path: "/" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
