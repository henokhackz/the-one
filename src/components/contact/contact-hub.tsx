"use client";

import React, { useState } from "react";
import { Mail, Check, Copy, Send, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { useLocale } from "@/lib/locale-context";

export function ContactHub() {
  const [copied, setCopied] = useState(false);
  const { locale } = useLocale();
  const email = "hbirhanu.dev@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 bg-background"
      aria-label="Direct Contact and Hiring Hub"
    >
      <div className="relative border border-border bg-surface/95 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-sm shadow-xl">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <TibebCornerStamp geezNumeral={locale === "am" ? "መልዕክት" : "05"} />
            <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-medium">
              {locale === "am" ? "ግንኙነት እና ቅጥር" : "Available for Select Contracts & Full-Time Roles"}
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight ${
              locale === "am" ? "font-ethiopic" : "font-heading"
            }`}
          >
            {locale === "am" ? "አብረን እንገንባ" : "Let's Build Something Exceptional"}
          </h2>

          <p className="text-base sm:text-lg text-muted font-light max-w-2xl leading-relaxed">
            {locale === "am"
              ? "ለፈጣን ምላሽ በኢሜይል ወይም በቴሌግራም ያግኙኝ። አዲስ አበባ ላይ እገኛለሁ፣ በሩቅ (Remote) መስራት እችላለሁ።"
              : "Looking for a fullstack engineer who delivers sub-second frontends and bulletproof backend architectures? I am available for senior engineering roles, high-impact contracts, and creative web consultations."}
          </p>

          <div className="pt-2">
            <EthiopianClock showDate={true} />
          </div>

          {/* Direct One-Click Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            {/* Copy Email Button with Toast Feedback */}
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-foreground text-background font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>hbirhanu.dev@gmail.com</span>
                  <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity ml-1" />
                </>
              )}
            </button>

            {/* Telegram Direct */}
            <a
              href="https://t.me/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 border border-border hover:border-accent text-foreground hover:text-accent font-semibold tracking-widest uppercase transition-colors"
            >
              <span>Telegram (@lyzon1)</span>
              <Send className="w-3.5 h-3.5" />
            </a>

            {/* Resume PDF */}
            <a
              href="/Lantumo_Birhanu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 border border-border hover:border-accent text-muted hover:text-foreground font-semibold tracking-widest uppercase transition-colors"
            >
              <FileText className="w-4 h-4 text-accent" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-border/60 flex items-center gap-6 font-mono text-xs text-muted">
            <a
              href="https://github.com/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>github.com/lyzon1</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lantumobirhanu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>linkedin.com/in/lantumobirhanu</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
