"use client";

import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import type { CreditsData } from "@/lib/types";

interface CreditsResponse {
  success: boolean;
  data: CreditsData;
}

const fetchCredits = requestHandler((_: void) =>
  axiosInstance.get<CreditsResponse>("/dashboard/credits"),
);

export function useCredits() {
  const [data, setData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCredits().then((result) => {
      if (result.code === "success") {
        setData(result.data.data);
      } else {
        const message = isAxiosError<{ error?: string }>(result.error)
          ? (result.error.response?.data?.error ?? "Failed to load credits")
          : "Network error";
        setError(message);
      }
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
