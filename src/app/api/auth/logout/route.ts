import { type NextRequest, NextResponse } from "next/server";
import { SuccessResponse } from "@/lib/apiResponse";
import { COOKIE_DOMAIN, HOME_URL, IS_PRODUCTION } from "@/lib/env";
import { logger } from "@/lib/logger";

const ALL_COOKIES = [
  { name: "auth-token", httpOnly: true },
  { name: "user-info", httpOnly: false },
  { name: "next-auth.session-token", httpOnly: true },
  { name: "__Secure-next-auth.session-token", httpOnly: true },
  { name: "next-auth.callback-url", httpOnly: false },
  { name: "next-auth.csrf-token", httpOnly: false },
];

function clearAllCookies(response: NextResponse) {
  const base = {
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    expires: new Date(0),
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  };
  for (const { name, httpOnly } of ALL_COOKIES) {
    response.cookies.set(name, "", { ...base, httpOnly });
  }
}

export async function GET(_request: NextRequest) {
  logger.info("auth-logout", "Clearing all cookies and redirecting to home");
  const response = NextResponse.redirect(HOME_URL);
  clearAllCookies(response);
  return response;
}

export async function POST(_request: NextRequest) {
  try {
    const response = SuccessResponse({ message: "Logout successful" });
    clearAllCookies(response);
    logger.info("auth-logout", "Cookies cleared");
    return response;
  } catch (error) {
    logger.error("auth-logout", "Logout failed", error);
    return SuccessResponse({ message: "Logout completed" });
  }
}
