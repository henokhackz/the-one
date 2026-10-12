"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

export default function NotFound() {
  const { locale, t } = useLocale();

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center px-6 py-24 text-foreground">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <TibebCornerStamp geezNumeral={t.notFound.stamp} />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            {t.notFound.error}
          </span>
        </div>

        <div className="py-4">
          <h1 className={`text-4xl sm:text-6xl font-bold tracking-tight text-foreground ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.notFound.title}
          </h1>
        </div>

        <p className="text-base text-muted font-light leading-relaxed max-w-md mx-auto">
          {t.notFound.description}
        </p>

        <TibebDivider className="my-6" />

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background font-mono text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.notFound.homeBtn}</span>
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-border hover:border-accent text-foreground hover:text-accent font-mono text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>{t.notFound.workBtn}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
