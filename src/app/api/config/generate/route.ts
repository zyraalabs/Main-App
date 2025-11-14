import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { generateConfigToken } from "@/lib/jwt";
import { logger } from "@/lib/logger";
import { SuccessResponse, ErrorResponse } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const user = await getCurrentUser();

    if (!user) {
      logger.warn(
        "config-generate",
        "Unauthorized config token generation attempt"
      );
      return ErrorResponse("Unauthorized", 401);
    }

    const configToken = generateConfigToken({
      id: user.id,
      email: user.email,
    });

    logger.info(
      "config-generate",
      `Config token generated for user: ${user.email}`
    );

    return SuccessResponse({
      token: configToken,
      command: `zyra config "${configToken}"`,
    });
  } catch (error) {
    logger.error("config-generate", "Failed to generate config token", error);
    return ErrorResponse("Failed to generate config token", 500);
  }
}
