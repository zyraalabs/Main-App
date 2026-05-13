"use client";

import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import type { BuildEntry } from "@/lib/types";

interface BuildsResponse {
  success: boolean;
  data: BuildEntry[];
}

const fetchBuilds = requestHandler((_: void) =>
  axiosInstance.get<BuildsResponse>("/dashboard/builds"),
);

export function useBuilds() {
  const [data, setData] = useState<BuildEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBuilds().then((result) => {
      if (result.code === "success") {
        setData(result.data.data);
      } else {
        const message = isAxiosError<{ error?: string }>(result.error)
          ? (result.error.response?.data?.error ?? "Failed to load builds")
          : "Network error";
        setError(message);
      }
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
