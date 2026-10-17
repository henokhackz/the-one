"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Send, Mail } from "lucide-react";
import { TibebDivider, TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "./ethiopian-clock";
import { useLocale } from "@/lib/locale-context";

const CHANNELS = [
  { label: "GitHub", href: "https://github.com/henokhackz", Icon: Github, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lantumobirhanu/", Icon: Linkedin, external: true },
  { label: "Telegram", href: "https://t.me/lyzon1", Icon: Send, external: true },
  { label: "hbirhanu.dev@gmail.com", href: "mailto:hbirhanu.dev@gmail.com", Icon: Mail, external: false },
];

export function Footer() {
  const { locale, t } = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: t.nav.work, href: "/work" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blogs" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="relative z-10 w-full bg-surface/40 border-t border-border">
      {/* Procedural Tibeb Accent Divider */}
      <TibebDivider />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 pb-10">
        {/* Closing Epigraph */}
        <div className="text-center pb-12">
          <p
            className={`text-base sm:text-lg text-accent/90 leading-relaxed ${
              locale === "am" ? "font-ethiopic" : "font-heading italic"
            }`}
          >
            {t.footer.quote}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {t.footer.quoteSub}
          </p>
        </div>

        {/* Main Grid: Identity / Index / Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-10 border-b border-border/60">
          {/* Identity */}
          <div className="sm:col-span-2 lg:col-span-6 flex flex-col gap-5">
            <Link href="/" className="group inline-flex items-center gap-3 w-fit">
              <TibebCornerStamp geezNumeral={t.footer.stamp} />
              <span
                className={`text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors ${
                  locale === "am" ? "font-ethiopic" : "font-heading"
                }`}
              >
                {t.footer.name}
              </span>
            </Link>

            <p className="text-sm text-muted leading-relaxed max-w-md">
              {t.footer.bio}
            </p>

            <div className="pt-1">
              <EthiopianClock showDate={true} />
            </div>
          </div>

          {/* Index */}
          <nav className="lg:col-span-2" aria-label={t.footer.indexTitle}>
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted mb-4">
              {t.footer.indexTitle}
            </h2>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-muted hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Channels */}
          <div className="lg:col-span-4" aria-label={t.footer.channelsTitle}>
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted mb-4">
              {t.footer.channelsTitle}
            </h2>
            <ul className="space-y-3">
              {CHANNELS.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-2.5 font-mono text-xs text-muted hover:text-accent transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-muted/70 group-hover:text-accent transition-colors" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <span>
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="text-accent">{t.footer.location}</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 uppercase tracking-widest hover:text-foreground transition-colors"
              aria-label="Back to top of page"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
