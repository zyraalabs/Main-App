interface UsageBarProps {
  label: string;
  used: number;
  total: number;
  note?: string;
}

export function UsageBar({ label, used, total, note }: UsageBarProps) {
  const pct = total > 0 ? Math.min((used / total) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-1.5">
        <span>{label}</span>
        <span>
          {used.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-[linear-gradient(90deg,var(--brand-d),var(--brand-l))] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {note && (
        <p className="text-[11px] text-fg-subtle mt-1.5">{note}</p>
      )}
    </div>
  );
}
