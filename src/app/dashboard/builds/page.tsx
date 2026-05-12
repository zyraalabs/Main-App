import { BuildItem } from "@/components/dashboard/build-item";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Generation } from "@/models/generation";

export default async function BuildsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  await connectToDatabase();
  const builds = await Generation.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return (
    <div className="py-7 px-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Builds</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          All prompts and sub-prompts across your sessions.
        </p>
      </div>

      {builds.length === 0 ? (
        <div className="bg-card border border-border rounded-[10px] p-12 text-center">
          <p className="text-[14px] font-medium text-foreground mb-1">
            No builds yet
          </p>
          <p className="text-[13px] text-muted-foreground">
            Run{" "}
            <span className="font-mono text-brand-l">
              zyra &quot;your prompt&quot;
            </span>{" "}
            in your terminal to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {builds.map((b) => (
            <BuildItem
              key={String(b._id)}
              prompt={b.prompt}
              framework={b.framework}
              filesGenerated={b.filesGenerated}
              inputTokens={b.inputTokens ?? 0}
              outputTokens={b.outputTokens ?? 0}
              durationMs={b.durationMs}
              createdAt={b.createdAt}
              reprompts={b.reprompts ?? []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
