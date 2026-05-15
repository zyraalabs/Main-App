"use client";

import { useQuery } from "@tanstack/react-query";
import { cliTokenQuery } from "@/lib/api/dashboard";

export function useCliToken() {
  const { data, isLoading: loading, error } = useQuery(cliTokenQuery);
  return {
    command: data?.command ?? null,
    loading,
    error: error?.message ?? null,
  };
}
