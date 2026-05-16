import { cookies, headers } from "next/headers";
import { verifyJWT } from "./jwt";
import { extractBearerToken } from "./bearer";
import { logger } from "./logger";

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  isPremium: boolean;
  plan: string;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
}

export async function getCurrentUser(): Promise<UserInfo | null> {
  try {
    const cookieStore = await cookies();
    const headerStore = await headers();

    const cookieToken = cookieStore.get("auth-token")?.value;
    const bearerToken = extractBearerToken(headerStore.get("authorization"));
    const token = cookieToken ?? bearerToken;

    if (!token) return null;

    const payload = verifyJWT(token);
    if (!payload) return null;

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      image: payload.image,
      emailVerified: payload.emailVerified,
      isPremium: payload.isPremium,
      plan: payload.plan,
      trialUsed: payload.trialUsed,
      usage: payload.usage,
    };
  } catch (error) {
    logger.error("auth-utils", "Failed to get current user", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
