"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Server, Layers } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Frontend",
    subtitle: "Interface Engineering",
    icon: Code2,
    description:
      "Pixel-perfect UIs built for performance. From design systems to micro-interactions, I craft experiences that feel alive — fast, accessible, and visually striking.",
    tags: ["React", "Next.js", "TypeScript", "Framer Motion", "Three.js"],
    link: "/contact",
  },
  {
    id: "02",
    title: "Backend",
    subtitle: "Systems Architecture",
    icon: Server,
    description:
      "Scalable, secure server-side infrastructure. REST & GraphQL APIs, database design, authentication flows, and cloud-native deployments that handle real-world load.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "Redis", "AWS"],
    link: "/contact",
  },
  {
    id: "03",
    title: "Fullstack",
    subtitle: "End-to-End Delivery",
    icon: Layers,
    description:
      "Complete product ownership from zero to deployed. I bridge the gap between polished interfaces and robust infrastructure — one cohesive, well-architected solution.",
    tags: ["Full Cycle", "DevOps", "CI/CD", "Testing", "Performance"],
    link: "/contact",
  },
];

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 text-foreground md:py-32"
    >
      {/* ── Background: mirrors Hero ── */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 section-gradient" />
        {/* Dot grid with radial mask */}
        <div
          className="absolute inset-0 text-foreground opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
          }}
        />
        {/* Ambient amber glow */}
        <div className="absolute -top-32 right-[5%] h-[640px] w-[640px] rounded-full bg-accent/[0.04] blur-[140px]" />
        {/* Film grain */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
          aria-hidden="true"
        >
          <filter id="services-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#services-grain)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-10">
        {/* Section header */}
        <div className="flex flex-col gap-2  pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              What I Do
            </span>
            <h2 className="mt-3 font-heading text-[clamp(2.8rem,6vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
              Service
              <br />
              <span className="text-muted">Expertise</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            Deep industry knowledge paired with modern engineering practices —
            delivering solutions that scale, perform, and impress.
          </p>
        </div>

        {/* Service rows */}
        <div className="mt-0 divide-y divide-border">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hovered === index;

            return (
              <div
                key={service.id}
                className="group relative cursor-pointer py-10 transition-all duration-500 md:py-12"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hover background glow */}
                <div
                  className={`pointer-events-none absolute inset-0 -mx-5 transition-opacity duration-500 md:-mx-10 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(245,158,11,0.03) 30%, rgba(245,158,11,0.05) 50%, rgba(245,158,11,0.03) 70%, transparent)",
                  }}
                />

                {/* Left amber bar */}
                <div
                  className={`absolute bottom-0 left-0 top-0 w-[2px] transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, #f59e0b 40%, #f59e0b 60%, transparent)",
                  }}
                />

                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
                  {/* Number + icon */}
                  <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-3">
                    <span
                      className={`font-mono text-[11px] tracking-[0.25em] transition-colors duration-300 ${isHovered ? "text-accent" : "text-muted"}`}
                    >
                      {service.id}
                    </span>
                    <div
                      className={`flex h-10 w-10 items-center justify-center border transition-all duration-300 ${isHovered ? "border-accent/40 bg-accent/10 text-accent" : "border-border bg-foreground/[0.03] text-muted"}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Main content */}
                   <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-16">
                     <div className="min-w-0 md:min-w-[200px]">
                      <h3
                        className={`text-3xl font-bold uppercase tracking-[-0.02em] transition-colors duration-300 md:text-4xl ${isHovered ? "text-foreground" : "text-muted"}`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${isHovered ? "text-accent" : "text-muted"}`}
                      >
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-300 break-words md:text-base ${isHovered ? "text-muted" : "text-muted"}`}
                      >
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-all duration-300 ${isHovered ? "border-accent/20 bg-accent/5 text-accent/70" : "border-border/[0.07] text-muted"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex md:justify-end">
                    <Link
                      href={service.link}
                      className={`group/btn flex h-11 w-11 items-center justify-center border transition-all duration-300 ${isHovered ? "border-accent bg-accent text-background" : "border-border text-muted"}`}
                    >
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "-translate-y-0.5 translate-x-0.5" : ""}`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Ready to build something great?
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group flex h-12 items-center gap-3 border border-border bg-foreground/[0.03] px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-foreground"
            >
              Start a Project
            </Link>
            <Link
              href="/projects"
              className="flex h-12 items-center gap-3 bg-accent px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-[#d97706]"
            >
              View Work
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
