"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

export function AboutTeaser() {
  const { locale, t } = useLocale();

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Philosophy & Identity */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ስለ" : "02"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.aboutTeaser.tag}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.aboutTeaser.heading}
          </h2>

          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            {t.aboutTeaser.description}
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-accent hover:underline w-fit mt-2"
          >
            <span>{t.aboutTeaser.readStory}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: 3 Core Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 border border-border bg-surface/30 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 border border-border flex items-center justify-center text-accent mb-4 bg-background">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className={`font-semibold text-xl text-foreground mb-2 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                {t.aboutTeaser.p1Title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {t.aboutTeaser.p1Desc}
              </p>
            </div>
            <span className="mt-6 font-mono text-[10px] tracking-widest text-accent uppercase">
              {t.aboutTeaser.p1Tag}
            </span>
          </div>

          <div className="p-6 border border-border bg-surface/30 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 border border-border flex items-center justify-center text-accent mb-4 bg-background">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className={`font-semibold text-xl text-foreground mb-2 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                {t.aboutTeaser.p2Title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {t.aboutTeaser.p2Desc}
              </p>
            </div>
            <span className="mt-6 font-mono text-[10px] tracking-widest text-accent uppercase">
              {t.aboutTeaser.p2Tag}
            </span>
          </div>

          <div className="p-6 border border-border bg-surface/30 rounded-sm flex flex-col justify-between sm:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className={`font-semibold text-xl text-foreground mb-1 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                  {t.aboutTeaser.p3Title}
                </h3>
                <p className="text-sm text-muted max-w-md">
                  {t.aboutTeaser.p3Desc}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-mono text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors shrink-0"
              >
                {t.aboutTeaser.p3Btn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
