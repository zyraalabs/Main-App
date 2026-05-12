import { ActivityItem } from "@/components/dashboard/activity-item";
import { StatCard } from "@/components/dashboard/stat-card";
import { UsageBar } from "@/components/dashboard/usage-bar";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Generation } from "@/models/generation";

async function getOverviewData(userId: string) {
  await connectToDatabase();

  const [agg] = await Generation.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalBuilds: { $sum: 1 },
        totalFiles: { $sum: "$filesGenerated" },
        totalTokens: { $sum: { $add: ["$inputTokens", "$outputTokens"] } },
        totalDurationMs: { $sum: "$durationMs" },
      },
    },
  ]);

  const recent = await Generation.find({ userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return { agg, recent };
}

export default async function OverviewPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { agg, recent } = await getOverviewData(user.id);
  const totalBuilds = agg?.totalBuilds ?? 0;
  const totalFiles = agg?.totalFiles ?? 0;
  const totalTokens = agg?.totalTokens ?? 0;
  const avgSec =
    agg && totalBuilds > 0
      ? Math.round(agg.totalDurationMs / totalBuilds / 100) / 10
      : 0;
  const TOKEN_LIMIT = 100_000;
  const BUILD_LIMIT = user.usage.remainingTrial + totalBuilds;

  return (
    <div className="py-7 px-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Overview</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Welcome back, {user.name.split(" ")[0]}.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <StatCard
          label="Total Builds"
          value={totalBuilds}
          sub={`of ${BUILD_LIMIT} this month`}
          accent
        />
        <StatCard
          label="Tokens Used"
          value={`${(totalTokens / 1000).toFixed(1)}k`}
          sub={`of ${TOKEN_LIMIT / 1000}k limit`}
        />
        <StatCard
          label="Files Generated"
          value={totalFiles}
          sub="across all builds"
        />
        <StatCard
          label="Avg Build Time"
          value={`${avgSec}s`}
          sub="per generation"
        />
      </div>

      <div className="bg-card border border-border rounded-[10px] p-5 mb-7 space-y-4">
        <h2 className="text-[13px] font-semibold">Monthly Usage</h2>
        <UsageBar label="Builds used" used={totalBuilds} total={BUILD_LIMIT} />
        <UsageBar label="Tokens used" used={totalTokens} total={TOKEN_LIMIT} />
      </div>

      <div className="mb-3">
        <h2 className="text-[13px] font-semibold">Recent Activity</h2>
      </div>
      <div className="bg-card border border-border rounded-[10px] px-4">
        {recent.length === 0 ? (
          <p className="py-8 text-center text-[13px] text-muted-foreground">
            No builds yet.
          </p>
        ) : (
          recent.map((g) => (
            <ActivityItem
              key={String(g._id)}
              type="build"
              prompt={g.prompt}
              framework={g.framework}
              files={g.filesGenerated}
              tokens={(g.inputTokens ?? 0) + (g.outputTokens ?? 0)}
              durationMs={g.durationMs}
              createdAt={g.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}
