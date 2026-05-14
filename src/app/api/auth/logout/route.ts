import { type NextRequest, NextResponse } from "next/server";
import { SuccessResponse } from "@/lib/apiResponse";
import { AUTH_SERVICE_URL, COOKIE_DOMAIN, HOME_URL, IS_PRODUCTION } from "@/lib/env";
import { logger } from "@/lib/logger";

function clearAuthCookies(response: NextResponse) {
  const base = {
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    expires: new Date(0),
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  };
  response.cookies.set("auth-token", "", { ...base, httpOnly: true });
  response.cookies.set("user-info", "", { ...base, httpOnly: false });
}

export async function GET(_request: NextRequest) {
  const sessionClearUrl = `${AUTH_SERVICE_URL}/api/auth/session-clear?callbackUrl=${encodeURIComponent(HOME_URL)}`;
  const response = NextResponse.redirect(sessionClearUrl);
  clearAuthCookies(response);
  logger.info("auth-logout", "Cookies cleared, chaining to session-clear");
  return response;
}

export async function POST(_request: NextRequest) {
  try {
    const response = SuccessResponse({ message: "Logout successful" });
    clearAuthCookies(response);
    logger.info("auth-logout", "Cookies cleared");
    return response;
  } catch (error) {
    logger.error("auth-logout", "Logout failed", error);
    return SuccessResponse({ message: "Logout completed" });
  }
}
