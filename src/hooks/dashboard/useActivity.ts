"use client";

import { useQuery } from "@tanstack/react-query";
import { activityQuery } from "@/lib/api/dashboard";

export function useActivity() {
  const { data = [], isLoading: loading, error } = useQuery(activityQuery);
  return { data, loading, error: error?.message ?? null };
}
