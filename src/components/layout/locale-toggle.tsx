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
      className={`inline-flex items-center border border-border bg-transparent p-0.5 rounded-[1px] font-mono text-[11px] ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-2.5 py-1 tracking-wider uppercase transition-all rounded-[1px] font-semibold ${
          locale === "en"
            ? "bg-foreground text-background"
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
        className={`px-2.5 py-1 tracking-wider font-ethiopic transition-all rounded-[1px] font-bold ${
          locale === "am"
            ? "bg-foreground text-background"
            : "text-muted hover:text-foreground"
        }`}
        title="ወደ አማርኛ ቀይር (Amharic)"
      >
        አማ
      </button>
    </div>
  );
}
