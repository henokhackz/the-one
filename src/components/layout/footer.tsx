"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Send, Mail } from "lucide-react";
import { TibebDivider, TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "./ethiopian-clock";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { locale, t } = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-surface/40 border-t border-border mt-24">
      {/* Procedural Tibeb Accent Divider */}
      <TibebDivider />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border/60">
          {/* Col 1: Identity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <TibebCornerStamp geezNumeral={t.footer.stamp} />
              <span className={`font-bold text-xl tracking-tight text-foreground ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                {t.footer.name}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              {t.footer.bio}
            </p>
            <div className="mt-2">
              <EthiopianClock showDate={true} />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-foreground font-semibold tracking-widest uppercase mb-1">
              {t.footer.indexTitle}
            </span>
            <Link href="/work" className="text-muted hover:text-accent transition-colors">
              {t.nav.work}
            </Link>
            <Link href="/about" className="text-muted hover:text-accent transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/blogs" className="text-muted hover:text-accent transition-colors">
              {t.nav.blog}
            </Link>
            <Link href="/contact" className="text-muted hover:text-accent transition-colors">
              {t.nav.contact}
            </Link>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-foreground font-semibold tracking-widest uppercase mb-1">
              {t.footer.channelsTitle}
            </span>
            <a
              href="https://github.com/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/lyzon1</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lantumobirhanu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>linkedin.com/in/lantumobirhanu</span>
            </a>
            <a
              href="https://t.me/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>t.me/lyzon1 (Telegram)</span>
            </a>
            <a
              href="mailto:hbirhanu.dev@gmail.com"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hbirhanu.dev@gmail.com</span>
            </a>
          </div>

          {/* Col 4: Ethiopian Identity Quote & Back to Top */}
          <div className="flex flex-col justify-between">
            <div className="p-4 border border-border/80 bg-background/50 rounded-sm">
              <p className={`text-sm text-accent mb-1 leading-relaxed ${locale === "am" ? "font-ethiopic" : "italic"}`}>
                {t.footer.quote}
              </p>
              <p className="text-[11px] text-muted font-mono">
                {t.footer.quoteSub}
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center justify-between px-4 py-2.5 border border-border hover:border-accent font-mono text-xs text-muted hover:text-foreground tracking-widest uppercase transition-colors"
              aria-label="Back to top of page"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            © {new Date().getFullYear()} {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <span>Next.js App Router</span>
            <span>•</span>
            <span>TypeScript Strict</span>
            <span>•</span>
            <span className="text-accent">{t.footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
