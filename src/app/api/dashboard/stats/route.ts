import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Generation } from "@/models/generation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const [agg] = await Generation.aggregate([
    { $match: { userId: user.id } },
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

  const stats = {
    totalBuilds: agg?.totalBuilds ?? 0,
    totalFiles: agg?.totalFiles ?? 0,
    totalTokens: agg?.totalTokens ?? 0,
    avgDurationSec: agg
      ? Math.round(agg.totalDurationMs / agg.totalBuilds / 100) / 10
      : 0,
    remainingTrial: user.usage.remainingTrial,
    plan: user.plan,
    isPremium: user.isPremium,
  };

  return NextResponse.json(stats);
}
