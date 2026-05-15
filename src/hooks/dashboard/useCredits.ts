"use client";

import { useQuery } from "@tanstack/react-query";
import { creditsQuery } from "@/lib/api/dashboard";

export function useCredits() {
  const { data = null, isLoading: loading, error } = useQuery(creditsQuery);
  return { data, loading, error: error?.message ?? null };
}
