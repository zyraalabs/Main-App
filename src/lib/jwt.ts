import jwt from "jsonwebtoken";

export interface JWTPayload {
  sub: string; // user id
  email: string;
  name: string;
  emailVerified: boolean;
  isPremium: boolean;
  plan: string;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
  exp: number;
}

export function generateJWT(userData: {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  isPremium: boolean;
  plan: string;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
}): string {
  const payload: JWTPayload = {
    sub: userData.id,
    email: userData.email,
    name: userData.name,
    emailVerified: userData.emailVerified,
    isPremium: userData.isPremium,
    plan: userData.plan,
    trialUsed: userData.trialUsed,
    usage: userData.usage,
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
  };

  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET or NEXTAUTH_SECRET must be defined");
  }

  return jwt.sign(payload, secret);
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET or NEXTAUTH_SECRET must be defined");
    }

    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export interface ConfigPayload {
  userId: string;
  email: string;
  apiEndpoint: string;
  permissions: string[];
  exp: number;
}

export function generateConfigToken(userData: {
  id: string;
  email: string;
}): string {
  const payload: ConfigPayload = {
    userId: userData.id,
    email: userData.email,
    apiEndpoint: process.env.APP_URL || "http://localhost:3001",
    permissions: ["build", "deploy", "logs"],
    exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
  };

  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET or NEXTAUTH_SECRET must be defined");
  }

  return jwt.sign(payload, secret);
}
