import { cn } from "@/lib/utils";

interface ActivityItemProps {
  type: "build" | "reprompt";
  prompt: string;
  framework: string;
  files: number;
  tokens: number;
  durationMs: number;
  createdAt: Date | string;
}

function fmt(ms: number) {
  return `${(ms / 1000).toFixed(1)}s`;
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ActivityItem({
  type,
  prompt,
  framework,
  files,
  tokens,
  durationMs,
  createdAt,
}: ActivityItemProps) {
  const isBuild = type === "build";

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-none">
      <div
        className={cn(
          "size-7 rounded-md border border-border-mid bg-surface flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5",
          isBuild ? "text-success-l" : "text-brand-l",
        )}
      >
        {isBuild ? "✓" : "›"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-foreground">
          {isBuild ? "Built " : "Updated "}
          <strong className="font-semibold">{prompt}</strong>
          <span className="text-muted-foreground"> · {framework} · {files} files</span>
        </p>
        <p className="font-mono text-[11px] text-fg-subtle mt-0.5">
          {fmt(durationMs)} · {tokens.toLocaleString()} tokens
        </p>
      </div>
      <span className="font-mono text-[11px] text-fg-subtle whitespace-nowrap">
        {fmtDate(createdAt)}
      </span>
    </div>
  );
}
