import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-[10px] p-5">
      <p className="font-mono text-[10px] font-medium text-fg-subtle tracking-[0.07em] uppercase mb-2">
        {label}
      </p>
      <p
        className={cn(
          "text-[26px] font-extrabold tracking-[-0.03em]",
          accent ? "text-brand-l" : "text-foreground",
        )}
      >
        {value}
      </p>
      {sub && (
        <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>
      )}
    </div>
  );
}
