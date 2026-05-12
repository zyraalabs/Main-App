import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

export default async function BillingPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="p-7 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Billing</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Manage your plan and payment history.
        </p>
      </div>

      <div className="bg-card border border-brand rounded-xl p-6 shadow-[0_0_32px_var(--brand-glow)] flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[11px] font-semibold text-fg-subtle uppercase tracking-[0.08em] mb-1.5">
            {user.plan} Plan
          </p>
          <p className="text-[28px] font-extrabold tracking-[-0.03em]">
            {user.isPremium ? "$20" : "$0"}{" "}
            <sub className="text-[14px] font-normal text-muted-foreground">
              /mo
            </sub>
          </p>
          <p className="text-[12px] text-fg-subtle mt-1">
            {user.isPremium
              ? "Unlimited builds · 1M tokens"
              : `${user.usage.remainingTrial} builds remaining · 100k tokens · resets monthly`}
          </p>
        </div>
        {!user.isPremium && <Button variant="brand">Upgrade to Pro</Button>}
      </div>

      <div className="mb-3">
        <h2 className="text-[14px] font-semibold">Invoice History</h2>
      </div>
      <div className="bg-card border border-border rounded-[10px] p-8 text-center">
        <p className="text-[13px] text-muted-foreground">No invoices yet.</p>
        <p className="text-[12px] text-fg-subtle mt-1">
          Invoices appear here after upgrading to Pro.
        </p>
      </div>
    </div>
  );
}
