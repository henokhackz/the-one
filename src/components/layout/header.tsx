"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "./locale-toggle";
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
    { label: t.nav.contact, href: "/contact" },
  ];

  const brandName = locale === "am" ? "ላንቱሞ" : "Lantumo";
  const brandMonogram = locale === "am" ? "ላ" : "L";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border/80 shadow-sm"
          : "bg-background/40 backdrop-blur-sm border-border/20"
      }`}
    >
      {/* Clean 4-Item Flex Layout: [1. Brand] [2. Navigation] [3. Language] [4. Theme/Menu] */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-20 flex items-center justify-between gap-3 sm:gap-6">
        {/* Item 1: Brand Monogram & Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label="Lantumo Birhanu Home"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 border border-border group-hover:border-accent flex items-center justify-center font-bold text-accent bg-surface/80 transition-colors">
            <span className={locale === "am" ? "font-ethiopic text-base" : "font-mono text-sm"}>
              {brandMonogram}
            </span>
          </div>
          <span
            className={`font-bold text-base md:text-lg tracking-tight text-foreground group-hover:text-accent transition-colors leading-none ${
              locale === "am" ? "font-ethiopic" : "font-heading"
            }`}
          >
            {brandName}
          </span>
        </Link>

        {/* Item 2: Main Navigation Links (Desktop) */}
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
                className={`relative py-1 text-xs tracking-[0.25em] uppercase transition-colors ${
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

        {/* Right Group: Items 3 & 4 */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Item 3: Language Toggle (EN / አማ) */}
          <LocaleToggle />

          {/* Item 4: Theme Toggle & Mobile Trigger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-between border-t border-border">
          <nav className="flex flex-col gap-6 pt-6" aria-label="Mobile Navigation">
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

          <div className="pt-6 border-t border-border/60 flex items-center justify-between text-muted text-xs font-mono">
            <span>{locale === "am" ? "ላንቱሞ ብርሃኑ" : "LANTUMO BIRHANU"}</span>
            <a
              href="mailto:hbirhanu.dev@gmail.com"
              className="text-accent underline"
            >
              hbirhanu.dev@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
