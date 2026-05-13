"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  name: string;
  email: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="size-8 rounded-full bg-[linear-gradient(135deg,#2A1800,var(--brand-d))] border border-border-mid flex items-center justify-center text-[12px] font-bold text-brand-l cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 shrink-0"
      >
        {initials(name)}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-10 z-50 min-w-52 rounded-xl border border-border-mid bg-card shadow-lg">
            <div className="px-4 py-3">
              <p className="text-[13px] font-semibold text-foreground truncate">
                {name}
              </p>
              <p className="font-mono text-[11px] text-fg-subtle truncate">
                {email}
              </p>
            </div>
            <div className={cn("border-t border-border")} />
            <div className="p-1.5">
              <Link
                href="/api/auth/logout"
                className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
              >
                Sign out
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
