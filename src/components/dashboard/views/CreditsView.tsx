"use client";

import { UsageBar } from "@/components/dashboard/usage-bar";
import { Button } from "@/components/ui/button";
import { useCredits } from "@/hooks/dashboard/useCredits";
import { useStats } from "@/hooks/dashboard/useStats";

const TOKEN_LIMIT = 100_000;

export function CreditsView() {
  const { data: credits, loading } = useCredits();
  const { data: stats } = useStats();

  const totalTokens = credits?.totalTokens ?? 0;
  const builds = credits?.builds ?? [];
  const maxTokens = builds.reduce(
    (m, b) => Math.max(m, b.inputTokens + b.outputTokens),
    1,
  );

  return (
    <div className="py-7 px-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">
          Credits &amp; Usage
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Token usage across builds this month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-[10px] p-5">
          <p className="font-mono text-[10px] font-medium text-fg-subtle tracking-[0.07em] uppercase mb-3">
            Token Balance
          </p>
          <p className="text-[32px] font-extrabold tracking-[-0.03em] text-brand-l leading-none">
            {loading ? "—" : totalTokens.toLocaleString()}
            <span className="text-[14px] font-normal text-muted-foreground">
              {" "}
              used
            </span>
          </p>
          <p className="text-[12px] text-fg-subtle mt-1 mb-4">
            of {TOKEN_LIMIT.toLocaleString()} monthly limit
          </p>
          <UsageBar
            label=""
            used={totalTokens}
            total={TOKEN_LIMIT}
            note={`${(TOKEN_LIMIT - totalTokens).toLocaleString()} tokens remaining`}
          />
        </div>

        <div className="bg-card border border-border rounded-[10px] p-5">
          <p className="font-mono text-[10px] font-medium text-fg-subtle tracking-[0.07em] uppercase mb-4">
            Usage by Build
          </p>
          {loading ? (
            <p className="text-[13px] text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-3">
              {builds.slice(0, 6).map((b) => {
                const t = b.inputTokens + b.outputTokens;
                const pct = Math.round((t / maxTokens) * 100);
                return (
                  <div key={b._id}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-muted-foreground truncate max-w-[60%]">
                        {b.prompt}
                      </span>
                      <span className="font-mono font-semibold text-brand-l">
                        {t.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1 bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {!stats?.isPremium && (
        <div className="bg-card border border-border rounded-[10px] p-5">
          <h2 className="text-[13px] font-semibold mb-1">
            Want unlimited tokens?
          </h2>
          <p className="text-[12px] text-muted-foreground mb-4">
            Upgrade to Pro for unlimited builds and 1M tokens per month.
          </p>
          <Button variant="brand" size="sm" disabled>
            Upgrade to Pro - $20/mo
          </Button>
        </div>
      )}
    </div>
  );
}
