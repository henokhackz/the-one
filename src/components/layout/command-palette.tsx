"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Copy,
  Check,
  Github,
  Send,
  FileText,
  Briefcase,
  X,
  Languages,
} from "lucide-react";
import { PROJECTS } from "@/lib/projects-data";
import { useLocale } from "@/lib/locale-context";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { locale, toggleLocale, t } = useLocale();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText("hbirhanu.dev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1000);
  };

  const navCategory = t.commandPalette.navigation;
  const projCategory = t.commandPalette.projects;
  const actCategory = t.commandPalette.actions;

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: t.commandPalette.home,
      category: navCategory,
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => {
        router.push("/");
        onClose();
      },
    },
    {
      id: "nav-work",
      title: t.commandPalette.work,
      category: navCategory,
      icon: <Briefcase className="w-4 h-4" />,
      action: () => {
        router.push("/work");
        onClose();
      },
    },
    {
      id: "nav-about",
      title: t.commandPalette.about,
      category: navCategory,
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        router.push("/about");
        onClose();
      },
    },
    {
      id: "nav-blogs",
      title: t.commandPalette.blogs,
      category: navCategory,
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        router.push("/blogs");
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: t.commandPalette.contact,
      category: navCategory,
      icon: <Send className="w-4 h-4" />,
      action: () => {
        router.push("/contact");
        onClose();
      },
    },

    // Projects
    ...PROJECTS.map((project) => ({
      id: `project-${project.slug}`,
      title: `${project.title} — ${project.subtitle}`,
      category: projCategory,
      icon: <Briefcase className="w-4 h-4 text-accent" />,
      action: () => {
        router.push(`/work/${project.slug}`);
        onClose();
      },
    })),

    // Actions
    {
      id: "act-locale",
      title: t.commandPalette.switchLocale,
      category: actCategory,
      icon: <Languages className="w-4 h-4 text-accent" />,
      action: () => {
        toggleLocale();
        onClose();
      },
    },
    {
      id: "act-theme",
      title: `${t.commandPalette.switchTheme} (${theme === "dark" ? "Parchment Light" : "Carbon Dark"})`,
      category: actCategory,
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        onClose();
      },
    },
    {
      id: "act-copy-email",
      title: copiedEmail ? t.commandPalette.copied : t.commandPalette.copyEmail,
      category: actCategory,
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />,
      action: copyEmail,
    },
    {
      id: "act-github",
      title: t.commandPalette.openGithub,
      category: actCategory,
      icon: <Github className="w-4 h-4" />,
      action: () => {
        window.open("https://github.com/henokhackz", "_blank");
        onClose();
      },
    },
    {
      id: "act-telegram",
      title: t.commandPalette.openTelegram,
      category: actCategory,
      icon: <Send className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.open("https://t.me/lyzon1", "_blank");
        onClose();
      },
    },
    {
      id: "act-cv",
      title: t.commandPalette.downloadCv,
      category: actCategory,
      icon: <FileText className="w-4 h-4 text-accent" />,
      action: () => {
        window.open("/Lantumo_Birhanu_resume.pdf", "_blank");
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 px-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface border-2 border-double border-border rounded-[1px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-background/50">
          <Search className="w-4 h-4 text-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.commandPalette.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-foreground focus:outline-none font-mono placeholder:text-muted"
          />
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-border/40 p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-muted">
              {t.commandPalette.noResults} &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors font-mono text-xs rounded-sm ${
                    isSelected
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground hover:bg-surface/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="truncate">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-muted shrink-0">
                    <span className="uppercase tracking-widest">{cmd.category}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-border bg-background/50 flex items-center justify-between text-[10px] font-mono text-muted">
          <div className="flex items-center gap-3">
            <span>{t.commandPalette.hintNav}</span>
            <span>{t.commandPalette.hintSelect}</span>
            <span>{t.commandPalette.hintClose}</span>
          </div>
          <span className="text-accent">
            {locale === "am" ? "የፊደል አሰሳ" : "FIDEL NAVIGATION"}
          </span>
        </div>
      </div>
    </div>
  );
}
