"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
}

export function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-[9px] px-2.5 py-[7px] rounded-[6px] text-[13px] transition-all",
        active
          ? "bg-(--brand-dim) text-brand-l"
          : "text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
    >
      <span className="font-mono text-[12px] w-4 text-center shrink-0 leading-none">
        {icon}
      </span>
      {label}
    </Link>
  );
}
