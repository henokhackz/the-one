"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { Magnetic } from "@/components/ui/magnetic-button";
import { useLocale } from "@/lib/locale-context";

// Authentic Ge'ez Fidel glyph bank
const GEEZ_GLYPHS = [
  "ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ",
  "ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ",
  "ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ",
  "መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ",
  "ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ",
  "ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ",
  "ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ",
  "ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ",
  "በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ",
  "ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ",
  "ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ",
  "አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ",
  "ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ",
  "ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ",
  "ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ",
  "የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ",
  "ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ",
  "ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ",
  "ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ",
  "ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ",
  "ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ",
  "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲",
];

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  alpha: number;
  isFocal: boolean;
  color: string;
}

export function Hero2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { locale, t } = useLocale();
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    radius: 120,
  });

  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const isMobile = width < 768;
      const step = isMobile ? 48 : 42;
      const cols = Math.floor(width / step);
      const rows = Math.floor(height / step);

      const offsetX = (width - cols * step) / 2 + step / 2;
      const offsetY = (height - rows * step) / 2 + step / 2;

      // Center area where name settles
      const centerX = width / 2;
      const centerY = height * 0.42;

      // Primary name characters according to selected language
      const nameChars = locale === "am" ? ["ላ", "ን", "ቱ", "ሞ"] : ["L", "A", "N", "T", "U", "M", "O"];
      const nameSpacing = isMobile ? (locale === "am" ? 40 : 26) : (locale === "am" ? 54 : 36);
      const nameStartX = centerX - ((nameChars.length - 1) * nameSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * step;
          const y = offsetY + r * step;

          // Check distance to center name row to avoid overlapping
          const distToCenter = Math.hypot(x - centerX, y - centerY);
          const isNearName = distToCenter < (isMobile ? 90 : 130);

          if (isNearName && Math.random() > 0.3) {
            continue; // Keep center area clean for title prominence
          }

          const char = GEEZ_GLYPHS[Math.floor(Math.random() * GEEZ_GLYPHS.length)];
          const size = isMobile ? 12 : 14;

          particles.push({
            baseX: x,
            baseY: y,
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: 0,
            vy: 0,
            char,
            size,
            alpha: 0.12 + Math.random() * 0.18,
            isFocal: false,
            color: "currentColor",
          });
        }
      }

      // Add prominent "ላንቱሞ" watermark calligraphic glyphs
      nameChars.forEach((char, idx) => {
        const x = nameStartX + idx * nameSpacing;
        const y = centerY;
        particles.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          char,
          size: isMobile ? 32 : 46,
          alpha: 0.85,
          isFocal: true,
          color: "var(--color-accent)",
        });
      });
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse & Touch interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouseRef.current.x = clientX - rect.left;
      mouseRef.current.y = clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    // Intersection observer to freeze off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Spring physics animation loop
    const spring = 0.08;
    const friction = 0.82;
    const forceFactor = 2.2;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const isDark = document.documentElement.classList.contains("dark");
      const defaultColor = isDark ? "#f4f0e8" : "#181512";
      const accentColor = isDark ? "#e5a93c" : "#b87c14";

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          // Calculate distance to cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (mouse.active && dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            p.vx -= Math.cos(angle) * force * forceFactor;
            p.vy -= Math.sin(angle) * force * forceFactor;
          }

          // Return to home position via spring mechanics
          const homeDx = p.baseX - p.x;
          const homeDy = p.baseY - p.y;

          p.vx += homeDx * spring;
          p.vy += homeDy * spring;
          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;
        }

        // Render glyph
        ctx.save();
        ctx.font = `${p.isFocal ? "bold " : ""}${p.size}px var(--font-ethiopic), serif`;

        if (p.isFocal) {
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = isDark ? 16 : 8;
        } else {
          ctx.fillStyle = defaultColor;
          ctx.globalAlpha = p.alpha;
        }

        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    setSettled(true);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [locale]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-border/60 bg-background"
      aria-label="Portfolio Hero Section"
    >
      {/* Interactive 2D Fidel Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      />

      {/* Hero Top Metadata Bar */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TibebCornerStamp geezNumeral={locale === "am" ? "፩" : "01"} />
          <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
            {locale === "am" ? "የፊደል አርክቴክቸር" : "FIDEL ARCHITECTURE"}
          </span>
        </div>

        {/* Live Ethiopian Clock & Calendar */}
        <EthiopianClock showDate={true} />
      </div>

      {/* Minimal Hero Core (Strictly under 25 words) */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col justify-center">
        <div className="max-w-4xl space-y-4">
          <h1 className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-foreground leading-[1.05] ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.hero.name}
          </h1>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-accent font-semibold uppercase">
            {t.hero.role}
          </p>

          <div className="pt-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-accent hover:text-accent-foreground transition-all shadow-md active:scale-95"
            >
              <span>{t.hero.viewWork}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-8 flex items-center justify-between text-muted text-xs font-mono">
        <div className="flex items-center gap-6">
          <span className="tracking-widest uppercase">{t.hero.statusRole}</span>
          <span className="hidden sm:inline opacity-30">•</span>
          <span className="hidden sm:inline tracking-widest uppercase">{t.hero.location}</span>
        </div>

        <a
          href="#selected-work"
          className="flex items-center gap-2 text-muted hover:text-foreground tracking-widest uppercase transition-colors"
          aria-label="Scroll to selected work"
        >
          <span>{t.hero.scroll}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
