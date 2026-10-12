"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function LocaleToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, toggleLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language selection / የቋንቋ ምርጫ"
      className={`inline-flex items-center border border-border/80 bg-surface/80 p-0.5 rounded-sm font-mono text-[11px] ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-2.5 py-1 tracking-wider uppercase transition-all rounded-xs font-semibold ${
          locale === "en"
            ? "bg-accent text-accent-foreground shadow-xs"
            : "text-muted hover:text-foreground"
        }`}
        title="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("am")}
        aria-pressed={locale === "am"}
        className={`px-2.5 py-1 tracking-wider font-ethiopic transition-all rounded-xs font-bold ${
          locale === "am"
            ? "bg-accent text-accent-foreground shadow-xs"
            : "text-muted hover:text-foreground"
        }`}
        title="ወደ አማርኛ ቀይር (Amharic)"
      >
        አማ
      </button>
    </div>
  );
}
