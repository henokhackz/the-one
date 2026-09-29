"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes the menu
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled && !open
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : open
              ? "border-b border-border bg-background"
              : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10 lg:h-20 lg:px-16">
          {/* Logo — italic serif wordmark like the reference */}
          <Link
            href="/"
            aria-label="Lantumo Birhanu — home"
            className="font-serif-accent text-xl italic tracking-tight text-foreground sm:text-2xl"
          >
            {profile.firstName} {profile.lastName}
          </Link>

          {/* Desktop nav — only once there is room for it */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-10">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-[15px] transition-colors duration-200",
                        active
                          ? "text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu — rendered outside <header> so the scrolled
          backdrop-blur cannot become its containing block */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <nav
          aria-label="Mobile navigation"
          className={cn(
            "flex h-full flex-col overflow-y-auto bg-background px-5 pb-10 pt-2 transition-opacity duration-200 md:px-10",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 border-b border-border py-4 text-lg transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        active ? "bg-accent" : "bg-transparent",
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3">
            <p className="text-sm text-muted">
              Open to new projects and collaborations.
            </p>
            <Link href="/contact" className="btn-pill group">
              Get In Touch
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
