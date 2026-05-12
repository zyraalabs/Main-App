import { UsageBar } from "@/components/dashboard/usage-bar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Generation } from "@/models/generation";

const TOKEN_LIMIT = 100_000;

async function getCreditsData(userId: string) {
  await connectToDatabase();
  const builds = await Generation.find({ userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const totalTokens = builds.reduce(
    (s, g) => s + (g.inputTokens ?? 0) + (g.outputTokens ?? 0),
    0,
  );
  return { builds, totalTokens };
}

export default async function CreditsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { builds, totalTokens } = await getCreditsData(user.id);
  const maxTokens = builds.reduce(
    (m, g) => Math.max(m, (g.inputTokens ?? 0) + (g.outputTokens ?? 0)),
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
            {totalTokens.toLocaleString()}
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
          <div className="space-y-3">
            {builds.slice(0, 6).map((g) => {
              const t = (g.inputTokens ?? 0) + (g.outputTokens ?? 0);
              const pct = Math.round((t / maxTokens) * 100);
              return (
                <div key={String(g._id)}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-muted-foreground truncate max-w-[60%]">
                      {g.prompt}
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
        </div>
      </div>

      {!user.isPremium && (
        <div className="bg-card border border-border rounded-[10px] p-5">
          <h2 className="text-[13px] font-semibold mb-1">
            Want unlimited tokens?
          </h2>
          <p className="text-[12px] text-muted-foreground mb-4">
            Upgrade to Pro for unlimited builds and 1M tokens per month.
          </p>
          <Button variant="brand" size="sm">
            Upgrade to Pro — $20/mo
          </Button>
        </div>
      )}
    </div>
  );
}
