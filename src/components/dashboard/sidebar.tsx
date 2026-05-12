import {
  BarChart2,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Lock,
  User,
  Zap,
} from "lucide-react";
import type { UserInfo } from "@/lib/auth";
import { NavItem } from "./nav-item";
import { UserCard } from "./user-card";

const MAIN_NAV = [
  { href: "/dashboard", icon: <LayoutDashboard />, label: "Overview" },
  { href: "/dashboard/builds", icon: <Zap />, label: "Builds" },
  { href: "/dashboard/credits", icon: <BarChart2 />, label: "Credits & Usage" },
];

const SETTINGS_NAV = [
  { href: "/dashboard/profile", icon: <User />, label: "Profile" },
  { href: "/dashboard/password", icon: <Lock />, label: "Password" },
  { href: "/dashboard/billing", icon: <CreditCard />, label: "Billing" },
  { href: "/dashboard/cli", icon: <KeyRound />, label: "CLI Config" },
];

interface SidebarProps {
  user: UserInfo;
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="w-[220px] shrink-0 flex flex-col bg-card border-r border-border overflow-y-auto">
      <div className="p-2.5 pt-3">
        <p className="font-mono text-[9px] font-semibold text-fg-subtle tracking-[0.1em] uppercase px-2.5 pb-1">
          Main
        </p>
        {MAIN_NAV.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      <div className="p-2.5">
        <p className="font-mono text-[9px] font-semibold text-fg-subtle tracking-[0.1em] uppercase px-2.5 pb-1">
          Settings
        </p>
        {SETTINGS_NAV.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      <div className="mt-auto p-2.5 border-t border-border">
        <UserCard user={user} />
      </div>
    </aside>
  );
}
