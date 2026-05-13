"use client";

import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import type { DashboardStats } from "@/lib/types";

interface StatsResponse {
  success: boolean;
  data: DashboardStats;
}

const fetchStats = requestHandler((_: void) =>
  axiosInstance.get<StatsResponse>("/dashboard/stats"),
);

export function useStats() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats().then((result) => {
      if (result.code === "success") {
        setData(result.data.data);
      } else {
        const message = isAxiosError<{ error?: string }>(result.error)
          ? (result.error.response?.data?.error ?? "Failed to load stats")
          : "Network error";
        setError(message);
      }
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
