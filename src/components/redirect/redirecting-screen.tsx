"use client";

import { useEffect } from "react";
import { RedirectBg } from "./redirect-bg";
import { RedirectDots } from "./redirect-dots";
import { RedirectLogo } from "./redirect-logo";
import { RedirectProgress } from "./redirect-progress";

interface RedirectingScreenProps {
  name: string;
}

export function RedirectingScreen({ name }: RedirectingScreenProps) {
  const firstName = name.split(" ")[0] || "there";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden relative">
      <RedirectBg />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <RedirectLogo />
        <RedirectDots firstName={firstName} />
      </div>
      <RedirectProgress />
    </div>
  );
}
