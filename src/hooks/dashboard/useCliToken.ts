"use client";

import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";

interface CliTokenResponse {
  success: boolean;
  data: { token: string; command: string };
}

const generateToken = requestHandler((_?: void) =>
  axiosInstance.post<CliTokenResponse>("/config/generate"),
);

export function useCliToken() {
  const [command, setCommand] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateToken().then((result) => {
      if (result.code === "success") {
        setCommand(result.data.data.command);
      } else {
        const message = isAxiosError<{ error?: string }>(result.error)
          ? (result.error.response?.data?.error ?? "Failed to generate token")
          : "Network error";
        setError(message);
      }
      setLoading(false);
    });
  }, []);

  return { command, loading, error };
}
