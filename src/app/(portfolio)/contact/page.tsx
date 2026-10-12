"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Linkedin, Github, MessageSquare, ArrowUpRight } from "lucide-react";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { useLocale } from "@/lib/locale-context";

export default function ContactPage() {
  const { locale, t } = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam prevention field
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      // Bot detected, silently fake success
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage(locale === "am" ? "እባክዎ ሁሉንም አስፈላጊ ክፍሎች ይሙሉ" : "Please fill out all required fields.");
      return;
    }

    setStatus("submitting");

    // Simulate submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
      setErrorMessage(
        locale === "am"
          ? "መልዕክቱ አልተላከም። እባክዎ በቀጥታ በኢሜይል ወይም በቴሌግራም ያግኙኝ።"
          : "Failed to send message. Please reach out directly via email or Telegram."
      );
    }
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-24 text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral={locale === "am" ? "አድራሻ" : "MSG"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.contactPage.tag}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.contactPage.title}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-muted font-light mt-6 leading-relaxed">
            {t.contactPage.description}
          </p>
        </div>

        {/* Main Grid: Form + Direct Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          {/* Left: Contact Form (7 Columns) */}
          <div className="lg:col-span-7 border border-border bg-surface/30 p-8 md:p-10 rounded-sm">
            <h2 className={`text-2xl font-bold text-foreground mb-6 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
              {t.contactPage.formTitle}
            </h2>

            {status === "success" ? (
              <div
                role="alert"
                className="p-6 border border-emerald-500/50 bg-emerald-500/10 rounded-sm space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.contactPage.successTitle}</span>
                </div>
                <p className="text-sm text-muted">
                  {t.contactPage.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-4 py-2 border border-border text-xs font-mono tracking-widest uppercase hover:border-accent transition-colors"
                >
                  {t.contactPage.anotherBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field for bot suppression */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website">Do not fill this out</label>
                  <input
                    type="text"
                    id="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="p-4 border border-rose-500/50 bg-rose-500/10 text-rose-500 text-xs font-mono flex items-center gap-2 rounded-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                    >
                      {t.contactPage.nameLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder={locale === "am" ? "ለምሳሌ፡ ሄኖክ፣ አበበ፣ ሳራ" : "e.g. Henok, Abebe, Sarah"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground font-mono text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                    >
                      {t.contactPage.emailLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground font-mono text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                  >
                    {t.contactPage.subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder={locale === "am" ? "ስለ ሶፍትዌር ፕሮጀክት / የሥራ እድል" : "Engineering Role / Project Consultation"}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground font-mono text-sm transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-wider text-muted mb-2"
                  >
                    {t.contactPage.messageLabel} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder={locale === "am" ? "የፕሮጀክትዎን ዝርዝር ወይም የቡድንዎን ፍላጎት እዚህ ይጻፉ..." : "Tell me about your team, timeline, or requirements..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground font-mono text-sm transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? t.contactPage.submittingBtn : t.contactPage.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Channels & Timezone (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 border border-border bg-surface/30 rounded-sm space-y-6">
              <h2 className={`text-xl font-bold text-foreground ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                {t.contactPage.channelsTitle}
              </h2>

              <div className="space-y-4 font-mono text-xs">
                <a
                  href="mailto:hbirhanu.dev@gmail.com"
                  className="group flex items-center justify-between p-4 border border-border bg-background hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-3 text-muted group-hover:text-foreground">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>hbirhanu.dev@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://t.me/lyzon1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border border-border bg-background hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-3 text-muted group-hover:text-foreground">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <span>Telegram: @lyzon1</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://www.linkedin.com/in/lantumobirhanu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border border-border bg-background hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-3 text-muted group-hover:text-foreground">
                    <Linkedin className="w-4 h-4 text-accent" />
                    <span>linkedin.com/in/lantumobirhanu</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://github.com/henokhackz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border border-border bg-background hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-3 text-muted group-hover:text-foreground">
                    <Github className="w-4 h-4 text-accent" />
                    <span>github.com/lyzon1</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Timezone / Availability card */}
            <div className="p-8 border border-border bg-surface/30 rounded-sm space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-border/50">
                <span className="text-muted">{t.contactPage.locationLabel}</span>
                <span className="text-foreground">{t.contactPage.locationValue}</span>
              </div>
              <div className="pt-2">
                <EthiopianClock showDate={true} />
              </div>
            </div>
          </div>
        </div>

        <TibebDivider className="mt-20" />
      </div>
    </div>
  );
}
