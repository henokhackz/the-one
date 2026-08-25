"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/lyzon1",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/lantumobirhanu/",
    icon: FaLinkedin,
  },
  {
    name: "Telegram",
    href: "https://t.me/lyzon1",
    icon: FaTelegramPlane,
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 w-full bg-background text-foreground pt-24 pb-12 px-6 md:px-16 overflow-hidden border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        {/* Top CTA */}
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-muted font-medium text-sm md:text-base tracking-wide">
            Let's Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-none">
            Let's Collaborate
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-3xl font-bold tracking-tight">
              Lantumo
            </Link>
            <p className="text-muted text-[15px] leading-relaxed max-w-sm">
              My approach is rooted in research, where I dig deep into user
              behaviors and feedback to inform every decision.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-foreground transition-colors text-[15px]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-bold">Connect</h4>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="p-3 border border-border rounded-full text-muted hover:text-foreground hover:border-accent transition-all duration-300"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-center gap-2 text-center text-[13px] text-muted">
          <p>
            © Copyright 2024 | Design by Lantumo Birhanu | Powered By Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
