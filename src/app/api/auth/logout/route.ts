import type { NextRequest } from "next/server";
import { SuccessResponse } from "@/lib/apiResponse";
import { authServiceAxiosInstance } from "@/lib/axiosInstance";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";

    try {
      await authServiceAxiosInstance.get("/api/auth/signout", {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      });

      logger.info("auth-logout", "Logged out from authentication service");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logger.warn(
        "auth-logout",
        `Failed to logout from authentication service: ${errorMsg}`,
      );
    }

    const response = SuccessResponse({
      message: "Logout successful",
    });

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("user-info", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    logger.info("auth-logout", "Local authentication cookies cleared");

    return response;
  } catch (error) {
    logger.error("auth-logout", "Logout failed", error);
    return SuccessResponse({ message: "Logout completed" });
  }
}
