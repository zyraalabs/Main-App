import { CliTokenSection } from "@/components/dashboard/cli-token-section";

export default function CliPage() {
  return (
    <div className="p-7 max-w-xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">CLI Config</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Authenticate the Zyra CLI with your account.
        </p>
      </div>

      <CliTokenSection />

      <div className="bg-card border border-border rounded-[10px] p-6 mt-4">
        <h2 className="text-[14px] font-semibold mb-1">Install the CLI</h2>
        <p className="text-[12px] text-muted-foreground mb-4">
          If you haven&apos;t installed Zyra yet:
        </p>
        <div className="bg-input border border-border-mid rounded-lg px-4 py-3 font-mono text-[12px]">
          <span className="text-brand font-bold">$</span>{" "}
          <span className="text-foreground">npm install -g zyra-cli</span>
        </div>
      </div>
    </div>
  );
}
