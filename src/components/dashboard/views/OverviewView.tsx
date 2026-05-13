"use client";

import { ActivityItem } from "@/components/dashboard/activity-item";
import { StatCard } from "@/components/dashboard/stat-card";
import { UsageBar } from "@/components/dashboard/usage-bar";
import { useActivity } from "@/hooks/dashboard/useActivity";
import { useStats } from "@/hooks/dashboard/useStats";

const TOKEN_LIMIT = 100_000;

export function OverviewView() {
  const { data: stats, loading: statsLoading } = useStats();
  const { data: activity, loading: activityLoading } = useActivity();

  const totalBuilds = stats?.totalBuilds ?? 0;
  const buildLimit = (stats?.remainingTrial ?? 0) + totalBuilds;

  return (
    <div className="py-7 px-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Overview</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Your builds and usage at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <StatCard
          label="Total Builds"
          value={statsLoading ? "—" : totalBuilds}
          sub={`of ${buildLimit} this month`}
          accent
        />
        <StatCard
          label="Tokens Used"
          value={
            statsLoading
              ? "—"
              : `${((stats?.totalTokens ?? 0) / 1000).toFixed(1)}k`
          }
          sub={`of ${TOKEN_LIMIT / 1000}k limit`}
        />
        <StatCard
          label="Files Generated"
          value={statsLoading ? "—" : (stats?.totalFiles ?? 0)}
          sub="across all builds"
        />
        <StatCard
          label="Avg Build Time"
          value={statsLoading ? "—" : `${stats?.avgDurationSec ?? 0}s`}
          sub="per generation"
        />
      </div>

      <div className="bg-card border border-border rounded-[10px] p-5 mb-7 space-y-4">
        <h2 className="text-[13px] font-semibold">Monthly Usage</h2>
        <UsageBar label="Builds used" used={totalBuilds} total={buildLimit} />
        <UsageBar
          label="Tokens used"
          used={stats?.totalTokens ?? 0}
          total={TOKEN_LIMIT}
        />
      </div>

      <div className="mb-3">
        <h2 className="text-[13px] font-semibold">Recent Activity</h2>
      </div>
      <div className="bg-card border border-border rounded-[10px] px-4">
        {activityLoading ? (
          <p className="py-8 text-center text-[13px] text-muted-foreground">
            Loading…
          </p>
        ) : activity.length === 0 ? (
          <p className="py-8 text-center text-[13px] text-muted-foreground">
            No builds yet.
          </p>
        ) : (
          activity.map((item, i) => (
            <ActivityItem
              key={`${item.createdAt}-${String(i)}`}
              type={item.type}
              prompt={item.prompt}
              framework={item.framework}
              files={item.files}
              tokens={item.tokens}
              durationMs={item.durationMs}
              createdAt={item.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}
