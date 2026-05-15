"use client";

import { useQuery } from "@tanstack/react-query";
import { statsQuery } from "@/lib/api/dashboard";

export function useStats() {
  const { data = null, isLoading: loading, error } = useQuery(statsQuery);
  return { data, loading, error: error?.message ?? null };
}
