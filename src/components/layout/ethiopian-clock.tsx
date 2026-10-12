"use client";

import React, { useEffect, useState } from "react";
import {
  getEthiopianDate,
  getEthiopianTime,
  EthiopianDate,
  EthiopianTime,
} from "@/lib/ethiopian-date";

export function EthiopianClock({
  showDate = true,
  compact = false,
}: {
  showDate?: boolean;
  compact?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [ethDate, setEthDate] = useState<EthiopianDate | null>(null);
  const [ethTime, setEthTime] = useState<EthiopianTime | null>(null);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      setEthDate(getEthiopianDate(now));
      setEthTime(getEthiopianTime(now));
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !ethTime || !ethDate) {
    return (
      <div className="flex items-center gap-2 font-mono text-[10px] text-muted tracking-wider select-none animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <span>ADDIS ABABA</span>
      </div>
    );
  }

  return (
    <div
      className="group relative flex items-center gap-2.5 font-mono text-[10px] tracking-widest text-muted select-none cursor-default"
      title="Live Ethiopian Time & Calendar (Addis Ababa, EAT)"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>

      {/* Time Display */}
      <div className="flex items-center gap-1.5 text-foreground font-medium">
        <span className="font-ethiopic text-accent text-xs font-semibold">
          {ethTime.periodAmharic}
        </span>
        <span className="tracking-[0.15em]">{ethTime.formatted12}</span>
      </div>

      {/* Date Display */}
      {showDate && !compact && (
        <>
          <span className="hidden lg:inline text-muted/40">/</span>
          <div className="hidden lg:flex items-center gap-1.5 text-muted hover:text-foreground transition-colors">
            <span className="font-ethiopic text-[11px]">
              {ethDate.monthNameAmharic} {ethDate.day}
            </span>
            <span className="tracking-widest">
              {ethDate.year} <span className="text-[9px] text-accent/80 font-semibold">ዓ.ም</span>
            </span>
          </div>
        </>
      )}

      {/* Subtle Explanatory Tooltip on Hover */}
      <div className="absolute top-full left-0 mt-2 hidden group-hover:block z-50 min-w-[240px] p-3 rounded-sm border border-border bg-surface text-foreground shadow-xl backdrop-blur-md transition-all">
        <div className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">
          Ethiopian Solar Calendar
        </div>
        <p className="text-[11px] leading-relaxed text-muted font-sans font-normal">
          Ethiopia calculates time on a 12-hour cycle beginning at sunrise (6:00 AM Gregorian = 12:00 ጠዋት) and observes 13 months per year.
        </p>
        <div className="mt-2 pt-2 border-t border-border/50 text-[9px] text-muted flex justify-between font-mono">
          <span>ADDIS ABABA (UTC+3)</span>
          <span className="text-accent">{ethDate.formattedEnglish}</span>
        </div>
      </div>
    </div>
  );
}
