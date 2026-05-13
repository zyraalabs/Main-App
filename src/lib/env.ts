export const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://localhost:3001";

export const HOME_URL = process.env.HOME_URL ?? "http://localhost:3000";

export const APP_URL = process.env.APP_URL ?? "http://localhost:3002";

export const JWT_SECRET =
  process.env.JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";
