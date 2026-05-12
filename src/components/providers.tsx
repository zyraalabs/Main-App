"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            border: "1px solid var(--border-mid)",
            color: "var(--foreground)",
            fontFamily: "var(--font-sans)",
            fontSize: "13.5px",
          },
        }}
      />
    </>
  );
}
