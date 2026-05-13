"use client";

import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requesthandler";
import type { ActivityEntry } from "@/lib/types";

interface ActivityResponse {
  success: boolean;
  data: ActivityEntry[];
}

const fetchActivity = requestHandler((_: void) =>
  axiosInstance.get<ActivityResponse>("/dashboard/activity"),
);

export function useActivity() {
  const [data, setData] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivity().then((result) => {
      if (result.code === "success") {
        setData(result.data.data);
      } else {
        const message = isAxiosError<{ error?: string }>(result.error)
          ? (result.error.response?.data?.error ?? "Failed to load activity")
          : "Network error";
        setError(message);
      }
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
