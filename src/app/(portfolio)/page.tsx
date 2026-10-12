"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { HeroFidel } from "@/components/hero/hero-fidel";
import { SelectedWork } from "@/components/work/selected-work";
import { AboutTeaser } from "@/components/about/about-teaser";
import { TibebBorderStrip, TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const { locale, t } = useLocale();

  return (
    <div className="w-full">
      {/* 1. Hero with Capability-Gated Fidel WebGL / 2D Canvas */}
      <HeroFidel />

      {/* Decorative Woven Border Accent */}
      <TibebBorderStrip />

      {/* 2. Selected Work (4 Flagship Projects with Hover Previews) */}
      <SelectedWork />

      {/* 3. About & Philosophy Teaser */}
      <AboutTeaser />

      {/* 4. Contact Call to Action */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-20">
        <div className="relative border border-border bg-surface/30 p-8 sm:p-12 md:p-16 rounded-sm overflow-hidden">
          {/* Ge'ez Watermark Stamp */}
          <div className="absolute right-6 -bottom-8 pointer-events-none select-none font-ethiopic text-9xl text-accent/5 font-bold">
            {locale === "am" ? "ፊደል" : "FIDEL"}
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <TibebCornerStamp geezNumeral={locale === "am" ? "መልዕክት" : "MSG"} />
              <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-medium">
                {t.homeCta.tag}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
              {t.homeCta.heading}
            </h2>

            <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
              {t.homeCta.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all shadow-md active:scale-95"
              >
                <span>{t.homeCta.button}</span>
                <Send className="w-4 h-4" />
              </Link>

              <a
                href="https://t.me/lyzon1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-border hover:border-accent text-foreground hover:text-accent font-semibold tracking-widest uppercase transition-colors"
              >
                <span>{t.homeCta.telegram}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
