"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "WORK", href: "/work" },
    { name: "SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-500 ${
        isMenuOpen
          ? "bg-background"
          : scrolled
            ? "bg-background-translucent backdrop-blur-xl"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 xl:px-16 h-20 md:h-24 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2.5 z-50">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Lantumo
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative px-4 py-2 font-mono text-[10px] font-medium tracking-[0.25em] uppercase transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-4 right-4 bottom-0 h-px bg-accent transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA + MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center border border-border hover:border-accent hover:text-accent px-5 py-2.5 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground transition-colors duration-300"
          >
            Let&apos;s Talk
          </Link>
          <ThemeToggle />
          <button
            className="md:hidden text-foreground z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 top-20 bottom-0 z-40 flex flex-col bg-background backdrop-blur-xl md:top-24 md:hidden"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 font-mono text-xl sm:text-2xl font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isActive
                          ? "text-accent"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      <span className="text-[10px] text-muted">
                        0{i + 1}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="px-8 pb-16 flex flex-col items-center gap-4">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center border border-border hover:border-accent hover:text-accent py-4 font-mono text-[11px] tracking-[0.25em] uppercase text-foreground transition-colors duration-300"
              >
                Let&apos;s Talk
              </Link>
              <span className="font-mono text-[9px] tracking-[0.3em] text-muted uppercase">
                Addis Ababa, ET
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
