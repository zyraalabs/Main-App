"use client";

import type { UserInfo } from "./auth";

export function getUserInfoFromCookie(): UserInfo | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    const userInfoCookie = cookies["user-info"];
    if (!userInfoCookie) {
      return null;
    }

    return JSON.parse(userInfoCookie) as UserInfo;
  } catch (error) {
    console.error("Failed to parse user info from cookie:", error);
    return null;
  }
}

export function clearAuthCookies(): void {
  if (typeof window !== "undefined") {
    document.cookie =
      "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user-info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
