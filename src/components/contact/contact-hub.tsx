"use client";

import React, { useState, useEffect } from "react";
import { Mail, Check, Copy, Send, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { useLocale } from "@/lib/locale-context";
import { getResumeData } from "@/sanity/lib/api";

export function ContactHub() {
  const [copied, setCopied] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/Lantumo_Birhanu_resume.pdf");
  const { locale } = useLocale();
  const email = "hbirhanu.dev@gmail.com";

  useEffect(() => {
    getResumeData().then((r) => {
      if (r?.fileUrl) setResumeUrl(r.fileUrl);
    });
  }, []);

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
      <div className="relative border-2 border-double border-border bg-transparent p-8 sm:p-12 md:p-16 rounded-[1px]">
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

          {/* Direct One-Click Actions: Equal width and aligned on mobile */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6 font-mono text-xs w-full max-w-2xl sm:max-w-none">
            {/* Copy Email Button with Toast Feedback */}
            <button
              onClick={handleCopy}
              className="btn-ink group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 border border-foreground text-foreground font-semibold tracking-widest uppercase hover:bg-foreground/5 transition-all duration-200 active:translate-y-[1px] text-center"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">hbirhanu.dev@gmail.com</span>
                  <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity ml-1 shrink-0" />
                </>
              )}
            </button>

            {/* Telegram Direct */}
            <a
              href="https://t.me/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-8 py-3.5 border border-border hover:border-foreground text-foreground font-semibold tracking-widest uppercase transition-colors active:translate-y-[1px] text-center"
            >
              <span>Telegram (@lyzon1)</span>
              <Send className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* Resume PDF */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-8 py-3.5 border border-border hover:border-foreground text-muted hover:text-foreground font-semibold tracking-widest uppercase transition-colors active:translate-y-[1px] text-center"
            >
              <FileText className="w-4 h-4 text-accent shrink-0" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 font-mono text-xs text-muted w-full overflow-hidden">
            <a
              href="https://github.com/henokhackz"
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link inline-flex items-center gap-2 hover:text-accent transition-colors truncate max-w-full"
            >
              <Github className="w-4 h-4 shrink-0" />
              <span className="truncate">https://github.com/henokhackz1</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lantumobirhanu/"
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link inline-flex items-center gap-2 hover:text-accent transition-colors truncate max-w-full"
            >
              <Linkedin className="w-4 h-4 shrink-0" />
              <span className="truncate">linkedin.com/in/lantumobirhanu</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
