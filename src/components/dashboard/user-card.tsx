import type { UserInfo } from "@/lib/auth";

interface UserCardProps {
  user: UserInfo;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-surface transition-colors cursor-default">
      <div className="size-8 rounded-full bg-[linear-gradient(135deg,#2A1800,var(--brand-d))] border border-border-mid flex items-center justify-center text-[11px] font-bold text-brand-l shrink-0">
        {initials(user.name)}
      </div>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-foreground truncate">
          {user.name}
        </div>
        <div className="font-mono text-[10px] text-fg-subtle truncate">
          {user.email}
        </div>
      </div>
    </div>
  );
}
