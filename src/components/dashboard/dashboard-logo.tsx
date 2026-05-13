import Link from "next/link";
import { HOME_URL } from "@/lib/env";

interface DashboardLogoProps {
  size?: "default" | "lg";
}

export function DashboardLogo({ size = "default" }: DashboardLogoProps) {
  const cls = size === "lg" ? "text-[22px]" : "text-[18px]";
  return (
    <Link
      href={HOME_URL}
      className={`font-sans font-extrabold tracking-[-0.03em] leading-none ${cls}`}
    >
      <span className="text-brand-l">Z</span>
      <span className="text-foreground">yraa</span>
    </Link>
  );
}
