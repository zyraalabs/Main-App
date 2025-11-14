import { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import { logger } from "@/lib/logger";
import { SuccessResponse, ErrorResponse } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      logger.warn("auth-callback", "No token provided in callback request");
      return ErrorResponse("No authentication token provided", 400);
    }

    const payload = verifyJWT(token);
    if (!payload) {
      logger.error("auth-callback", "Invalid or expired JWT token");
      return ErrorResponse("Invalid or expired authentication token", 401);
    }

    logger.info(
      "auth-callback",
      `JWT token verified successfully for user: ${payload.email}`
    );

    const response = SuccessResponse({
      message: "Authentication successful",
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        emailVerified: payload.emailVerified,
        isPremium: payload.isPremium,
        plan: payload.plan,
        trialUsed: payload.trialUsed,
        usage: payload.usage,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    response.cookies.set(
      "user-info",
      JSON.stringify({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        emailVerified: payload.emailVerified,
        isPremium: payload.isPremium,
        plan: payload.plan,
        trialUsed: payload.trialUsed,
        usage: payload.usage,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      }
    );

    logger.info(
      "auth-callback",
      `Authentication cookies set successfully for user: ${payload.email}`
    );

    return response;
  } catch (error) {
    logger.error("auth-callback", "Authentication callback failed", error);
    return ErrorResponse("Authentication callback failed", 500);
  }
}
