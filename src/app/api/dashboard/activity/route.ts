import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Generation } from "@/models/generation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const recent = await Generation.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .limit(10)
    .select(
      "prompt framework filesGenerated inputTokens outputTokens durationMs createdAt reprompts",
    )
    .lean();

  const activity = recent.flatMap((g) => {
    const main = {
      type: "build" as const,
      prompt: g.prompt,
      framework: g.framework,
      files: g.filesGenerated,
      tokens: (g.inputTokens ?? 0) + (g.outputTokens ?? 0),
      durationMs: g.durationMs,
      createdAt: g.createdAt,
    };
    const reprompts = (g.reprompts ?? []).map(
      (r: {
        prompt: string;
        filesChanged: number;
        inputTokens: number;
        outputTokens: number;
        durationMs: number;
        createdAt: Date;
      }) => ({
        type: "reprompt" as const,
        prompt: r.prompt,
        framework: g.framework,
        files: r.filesChanged,
        tokens: (r.inputTokens ?? 0) + (r.outputTokens ?? 0),
        durationMs: r.durationMs,
        createdAt: r.createdAt,
      }),
    );
    return [main, ...reprompts];
  });

  return NextResponse.json(activity.slice(0, 10));
}
