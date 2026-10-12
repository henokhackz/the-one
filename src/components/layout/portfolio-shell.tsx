"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { CommandPalette } from "./command-palette";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScrollProvider } from "./smooth-scroll";
import { Command } from "lucide-react";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global hotkey listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen relative flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        {/* Subtle Tactile Grain Overlay */}
        <GrainOverlay />

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Main Header with Live Ethiopian Clock */}
        <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Content Stream */}
        <main className="flex-1 w-full">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Command Palette Modal */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />

        {/* Floating ⌘K Mobile Trigger Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden fixed bottom-20 right-6 z-40 w-11 h-11 rounded-full border border-border bg-surface/90 text-accent shadow-xl backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Open Command Search"
        >
          <Command className="w-5 h-5" />
        </button>
      </div>
    </SmoothScrollProvider>
  );
}
