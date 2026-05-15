"use client";

import { useQuery } from "@tanstack/react-query";
import { buildsQuery } from "@/lib/api/dashboard";

export function useBuilds() {
  const { data = [], isLoading: loading, error } = useQuery(buildsQuery);
  return { data, loading, error: error?.message ?? null };
}
