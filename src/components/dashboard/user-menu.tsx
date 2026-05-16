"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  name: string;
  email: string;
  image?: string;
  variant?: "topnav" | "sidebar";
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({
  name,
  image,
  size,
}: {
  name: string;
  image?: string;
  size: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden shrink-0 bg-[linear-gradient(135deg,#2A1800,var(--brand-d))] border border-border-mid flex items-center justify-center text-brand-l font-bold"
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          width={size}
          height={size}
          className="size-full object-cover"
        />
      ) : (
        <span style={{ fontSize: size * 0.42 }}>{initials(name)}</span>
      )}
    </div>
  );
}

function Dropdown({
  name,
  email,
  onClose,
}: {
  name: string;
  email: string;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-40 cursor-default"
        onClick={onClose}
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
        <div className="border-t border-border" />
        <div className="p-1.5">
          <a
            href="/api/auth/logout"
            className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  );
}

export function UserMenu({
  name,
  email,
  image,
  variant = "topnav",
}: UserMenuProps) {
  const [open, setOpen] = useState(false);

  if (variant === "sidebar") {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex items-center gap-[9px] w-full px-2.5 py-2 rounded-[6px] cursor-pointer",
            "hover:bg-surface transition-colors focus-visible:outline-none",
          )}
        >
          <Avatar name={name} image={image} size={28} />
          <div className="min-w-0 flex-1 text-left">
            <div className="text-[12px] font-semibold text-foreground truncate">
              {name}
            </div>
            <div className="font-mono text-[10px] text-fg-subtle truncate">
              {email}
            </div>
          </div>
        </button>
        {open && (
          <Dropdown name={name} email={email} onClose={() => setOpen(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="size-8 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <Avatar name={name} image={image} size={32} />
      </button>
      {open && (
        <Dropdown name={name} email={email} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
