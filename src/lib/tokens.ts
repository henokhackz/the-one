/**
 * "Fidel" Design System Tokens
 * Handcrafted Ethiopian manuscript aesthetic balanced with modern performance engineering.
 * Base unit: 8px. Color harmony: Ink Black, Warm Brana Parchment, Saffron Gold (ወርቅ), Highland Emerald & Crimson accents.
 */

export const tokens = {
  colors: {
    // Ink-Dark Theme (Primary / Default)
    dark: {
      background: "#0a0908", // Deep Ethiopian carbon ink
      surface: "#141210",    // Layered parchment slate
      surfaceElevated: "#1c1916",
      foreground: "#f4f0e8", // Aged vellum / Brana white
      muted: "#9e988e",      // Secondary manuscript ink
      subtle: "#544e45",     // Hairline guide lines
      border: "rgba(244, 240, 232, 0.12)",
      borderStrong: "rgba(244, 240, 232, 0.24)",
      accent: "#e5a93c",     // Saffron Gold / ወርቅ (Meskel flower & royal gold)
      accentForeground: "#0a0908",
      accentMuted: "rgba(229, 169, 60, 0.15)",
      accentHover: "#f5b74f",
      // Ethiopian national accents (used sparingly as badges/signals)
      flagGreen: "#10b981",  // Highland Teff green
      flagRed: "#e11d48",    // Crimson ink
      flagYellow: "#eab308",
    },
    // Warm Parchment Light Theme (ብራና - Authentic goatskin vellum)
    light: {
      background: "#f7f4eb", // Natural parchment tone
      surface: "#efe9da",    // Aged manuscript page
      surfaceElevated: "#e5decb",
      foreground: "#181512", // Iron-gall carbon ink
      muted: "#6e6659",      // Secondary inscription tone
      subtle: "#aba293",     // Faint rubrication guide
      border: "rgba(24, 21, 18, 0.12)",
      borderStrong: "rgba(24, 21, 18, 0.24)",
      accent: "#b87c14",     // Burnished amber saffron
      accentForeground: "#ffffff",
      accentMuted: "rgba(184, 124, 20, 0.12)",
      accentHover: "#9a650c",
      flagGreen: "#059669",
      flagRed: "#be123c",
      flagYellow: "#ca8a04",
    },
  },

  typography: {
    fonts: {
      heading: "var(--font-heading)",
      body: "var(--font-body)",
      mono: "var(--font-mono)",
      ethiopic: "var(--font-ethiopic)",
    },
    scale: {
      xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.04em" }],
      sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.02em" }],
      base: ["1rem", { lineHeight: "1.6rem", letterSpacing: "0em" }],
      lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
      xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
      "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
      "5xl": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
      "6xl": ["3.75rem", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
      "7xl": ["4.5rem", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
      "8xl": ["6rem", { lineHeight: "0.92", letterSpacing: "-0.05em" }],
    },
  },

  spacing: {
    base: 8, // 8px base grid
    xs: "0.25rem", // 4px
    sm: "0.5rem",  // 8px
    md: "1rem",    // 16px
    lg: "1.5rem",  // 24px
    xl: "2rem",    // 32px
    "2xl": "3rem",  // 48px
    "3xl": "4rem",  // 64px
    "4xl": "6rem",  // 96px
    "5xl": "8rem",  // 128px
  },

  grid: {
    columns: 12,
    maxWidth: "1600px",
    gutter: {
      mobile: "1rem",
      tablet: "2rem",
      desktop: "3rem",
    },
  },

  motion: {
    // 3 Strict Durations
    duration: {
      fast: 0.15,      // 150ms - Micro-interactions, cursor, hovers
      normal: 0.4,     // 400ms - Layout reveals, drawer animations, card hovers
      deliberate: 0.8, // 800ms - Hero glyph-settle, page dissolves, route transitions
    },
    // 2 Strict Easings
    ease: {
      snappy: [0.16, 1, 0.3, 1] as const,     // Swift & precise (ease-out quint)
      smooth: [0.65, 0, 0.35, 1] as const,    // Editorial, organic flow (in-out cubic)
    },
    // Pre-composed Framer Motion transition configs
    transitions: {
      snappy: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
      normal: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
      deliberate: {
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  },

  tibeb: {
    // Procedural Habesha woven embroidery pattern specs
    diamondSize: 12,
    borderHeight: 16,
    strokeWidth: 1.5,
  },
} as const;

export type DesignTokens = typeof tokens;
