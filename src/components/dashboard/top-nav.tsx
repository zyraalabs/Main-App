import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { UserInfo } from "@/lib/auth";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface TopNavProps {
  user: UserInfo;
}

export function TopNav({ user }: TopNavProps) {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-card border-b border-border z-10">
      <Link
        href="/dashboard"
        className="font-extrabold text-[18px] tracking-[-0.03em] leading-none"
      >
        <span className="text-brand-l">Z</span>
        <span className="text-foreground">yraa</span>
      </Link>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-[rgba(217,114,24,0.25)] bg-[var(--brand-dim)] text-brand-l">
          {user.plan}
        </span>
        {!user.isPremium && (
          <Button variant="brand" size="sm">
            Upgrade to Pro
          </Button>
        )}
        <div className="size-8 rounded-full bg-[linear-gradient(135deg,#2A1800,var(--brand-d))] border border-border-mid flex items-center justify-center text-[12px] font-bold text-brand-l cursor-pointer">
          {initials(user.name)}
        </div>
      </div>
    </header>
  );
}
