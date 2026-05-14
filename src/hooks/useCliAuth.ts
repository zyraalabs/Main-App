"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfoFromCookie } from "@/lib/auth-client";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import { PUBLIC_AUTH_SERVICE_URL } from "@/lib/env";

interface ApprovePayload {
  requestId: string;
}

interface ApproveResponse {
  message: string;
}

interface UserSnapshot {
  name: string;
  email: string;
  plan: string;
}

const approveCliAccess = requestHandler((data?: ApprovePayload) =>
  axiosInstance.post<ApproveResponse>("/cli/approve", data),
);

export function useCliAuth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const requestId = searchParams.get("req");

  const [user, setUser] = useState<UserSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = getUserInfoFromCookie();
    if (!userInfo) {
      const currentUrl = window.location.href;
      window.location.href = `${PUBLIC_AUTH_SERVICE_URL}/login?callbackUrl=${encodeURIComponent(currentUrl)}`;
      return;
    }
    setUser({ name: userInfo.name, email: userInfo.email, plan: userInfo.plan ?? "FREE" });
    setLoading(false);
  }, []);

  const approve = async () => {
    if (!requestId) return;
    setApproving(true);
    setError(null);

    const result = await approveCliAccess({ requestId });

    if (result.code === "error") {
      const msg =
        result.error instanceof Error
          ? result.error.message
          : "Failed to approve CLI access";
      setError(msg);
      setApproving(false);
      return;
    }

    router.push("/cli-auth/success");
  };

  const deny = () => router.push("/dashboard");

  return { requestId, user, loading, approving, error, approve, deny };
}
