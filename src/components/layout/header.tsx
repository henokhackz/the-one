"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Command } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { EthiopianClock } from "./ethiopian-clock";
import { useLocale } from "@/lib/locale-context";

export function Header({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.work, href: "/work" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blogs" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const brandName = locale === "am" ? "ላንቱሞ" : "Lantumo";
  const brandMonogram = locale === "am" ? "ላ" : "L";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border/80 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 border border-border group-hover:border-accent flex items-center justify-center font-bold text-accent bg-surface transition-colors">
            <span className={locale === "am" ? "font-ethiopic text-base" : "font-mono text-sm"}>
              {brandMonogram}
            </span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-base md:text-lg tracking-tight text-foreground group-hover:text-accent transition-colors leading-none ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
              {brandName}
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase mt-0.5">
              {t.nav.brandSubtitle}
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-1.5 py-1 text-xs tracking-[0.25em] uppercase transition-colors ${
                  locale === "am" ? "font-ethiopic font-semibold" : "font-mono"
                } ${
                  isActive ? "text-accent font-semibold" : "text-muted hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Tools & Clock */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Header Live Clock (Desktop Only) */}
          <div className="hidden xl:block">
            <EthiopianClock showDate={false} compact={true} />
          </div>

          {/* Locale Option on Top of Navbar */}
          <LocaleToggle />

          {/* Command Palette Trigger Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border border-border/80 hover:border-accent bg-surface/80 text-muted hover:text-foreground text-[10px] font-mono tracking-widest uppercase transition-colors"
              title="Open Command Palette (⌘K / Ctrl+K)"
              aria-label="Open command palette"
            >
              <Command className="w-3 h-3 text-accent" />
              <span>⌘K</span>
            </button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-background/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-between border-t border-border">
          <nav className="flex flex-col gap-6 pt-6">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline justify-between border-b border-border/40 pb-4 text-2xl font-medium tracking-wide ${
                    locale === "am" ? "font-ethiopic" : "font-heading"
                  } ${isActive ? "text-accent" : "text-foreground"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border/60 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <LocaleToggle />
              <ThemeToggle />
            </div>
            <EthiopianClock showDate={true} />
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>{locale === "am" ? "ላንቱሞ ብርሃኑ" : "LANTUMO BIRHANU"}</span>
              <a
                href="mailto:hbirhanu.dev@gmail.com"
                className="text-accent underline"
              >
                hbirhanu.dev@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
