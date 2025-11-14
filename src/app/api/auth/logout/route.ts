import { NextRequest } from "next/server";
import { logger } from "@/lib/logger";
import { SuccessResponse } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
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

    logger.info("auth-logout", "Authentication cookies cleared successfully");

    return response;
  } catch (error) {
    logger.error("auth-logout", "Logout failed", error);
    return SuccessResponse({ message: "Logout completed" });
  }
}
