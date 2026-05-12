"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CliTokenSection() {
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/config/generate", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setCommand(data.data.command);
      }
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-card border border-border rounded-[10px] p-6">
      <h2 className="text-[14px] font-semibold mb-1">Generate Config Token</h2>
      <p className="text-[12px] text-muted-foreground mb-5">
        Run this command in your terminal to link the CLI to your account.
      </p>

      {!command ? (
        <Button variant="brand" size="sm" onClick={generate} disabled={loading}>
          {loading ? "Generating…" : "Generate token"}
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-input border border-border-mid rounded-lg px-4 py-3">
            <span className="text-brand font-bold font-mono text-[12px]">
              $
            </span>
            <span className="font-mono text-[12px] text-brand-l flex-1 truncate">
              {command}
            </span>
            <Button
              variant="outline"
              size="xs"
              onClick={copy}
              className="shrink-0"
            >
              <Copy className="size-3" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-[12px] text-fg-subtle">
            Token expires in 30 minutes. Generate a new one if needed.
          </p>
        </div>
      )}
    </div>
  );
}
