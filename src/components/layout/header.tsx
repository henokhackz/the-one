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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLocale();

  // 1. Track scroll progress for the navbar indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Active Section Spy
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "projects", "skills", "testimonials", "writing", "contact"];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 120;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const navItems = [
    { id: "projects", label: locale === "am" ? "ስራዎች" : "Projects", href: "/#projects" },
    { id: "skills", label: locale === "am" ? "ችሎታዎች" : "Skills", href: "/#skills" },
    { id: "testimonials", label: locale === "am" ? "ምስክርነቶች" : "Voices", href: "/#testimonials" },
    { id: "writing", label: locale === "am" ? "ጽሁፎች" : "Writing", href: "/#writing" },
    { id: "contact", label: locale === "am" ? "ግንኙነት" : "Contact", href: "/#contact" },
  ];

  const brandName = locale === "am" ? "ላንቱሞ" : "Lantumo";
  const brandMonogram = locale === "am" ? "ላ" : "L";

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full transition-all duration-200 border-b border-border bg-background"
    >
      {/* Scroll Progress Bar across the top of navbar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-accent transition-all duration-75 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* Main 4-Item Flex Layout: [1. Brand] [2. Navigation] [3. Language] [4. Theme/Menu] */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-20 flex items-center justify-between gap-3 sm:gap-6">
        {/* Item 1: Brand Monogram & Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label="Lantumo Birhanu Home"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <div className="w-8 h-8 md:w-9 md:h-9 border border-border group-hover:border-accent flex items-center justify-center font-bold text-accent bg-transparent transition-colors">
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

        {/* Item 2: Main Navigation with Active Highlight */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Primary Section Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`ink-link relative py-1 text-xs tracking-[0.2em] uppercase transition-colors flex items-center ${
                  locale === "am" ? "font-ethiopic font-semibold" : "font-mono"
                } ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {/* Small ink-stamp style active marker (small square mark in flag red) */}
                {isActive && (
                  <span
                    className="inline-block w-1.5 h-1.5 bg-[#DA121A] ml-2 shrink-0 animate-in fade-in duration-200"
                    aria-hidden="true"
                  />
                )}
              </a>
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/98 backdrop-blur-xl z-50 p-6 flex flex-col justify-between border-t border-border">
          <nav className="flex flex-col gap-5 pt-4" aria-label="Mobile Navigation">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline justify-between border-b border-border/40 pb-3 text-2xl font-medium tracking-wide ${
                    locale === "am" ? "font-ethiopic" : "font-heading"
                  } ${isActive ? "text-accent font-bold" : "text-foreground"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    <span>{item.label}</span>
                  </div>
                </a>
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
