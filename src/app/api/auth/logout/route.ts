import { type NextRequest, NextResponse } from "next/server";
import { SuccessResponse } from "@/lib/apiResponse";
import { AUTH_SERVICE_URL, COOKIE_DOMAIN, HOME_URL, IS_PRODUCTION } from "@/lib/env";
import { logger } from "@/lib/logger";

function clearAuthCookies(response: NextResponse, request: NextRequest) {
  const base = {
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    expires: new Date(0),
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  };

  const incoming = request.cookies.getAll();
  console.log("[logout] COOKIE_DOMAIN =", COOKIE_DOMAIN || "(none)");
  console.log("[logout] IS_PRODUCTION =", IS_PRODUCTION);
  console.log("[logout] Incoming cookies:", incoming.map((c) => c.name));
  console.log("[logout] auth-token present:", request.cookies.has("auth-token"));
  console.log("[logout] Clearing with base opts:", JSON.stringify(base));

  response.cookies.set("auth-token", "", { ...base, httpOnly: true });
  response.cookies.set("user-info", "", { ...base, httpOnly: false });
}

export async function GET(request: NextRequest) {
  const sessionClearUrl = `${AUTH_SERVICE_URL}/api/auth/session-clear?callbackUrl=${encodeURIComponent(HOME_URL)}`;
  console.log("[logout] GET hit → redirecting to:", sessionClearUrl);
  const response = NextResponse.redirect(sessionClearUrl);
  clearAuthCookies(response, request);
  logger.info("auth-logout", "Cookies cleared, chaining to session-clear");
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const response = SuccessResponse({ message: "Logout successful" });
    clearAuthCookies(response, request);
    logger.info("auth-logout", "Cookies cleared");
    return response;
  } catch (error) {
    logger.error("auth-logout", "Logout failed", error);
    return SuccessResponse({ message: "Logout completed" });
  }
}
