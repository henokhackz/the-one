"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, MapPin, Terminal } from "lucide-react";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { useLocale } from "@/lib/locale-context";

export default function AboutPage() {
  const { locale, t } = useLocale();

  const experiences = [
    {
      company: "Ideeza",
      role: locale === "am" ? "የThree.js እና የ3D ፍሮንትኤንድ መሃንዲስ" : "Three.js & Creative Frontend Engineer",
      period: locale === "am" ? "2024 — አሁን" : "2024 — Present",
      location: locale === "am" ? "የርቀት ሥራ" : "Remote",
      description:
        locale === "am"
          ? "በThree.js እና በWebGL የተገነቡ 3D ገጾችን፣ የኤሌክትሮኒክስ ቦርድ እይታዎችን እና በ60fps ፍጥነት የሚሰሩ የእውነተኛ ጊዜ ቪዥዋላይዜሽን ሲስተሞችን እገነባለሁ።"
          : "Building interactive WebGL and Three.js 3D web experiences, circuit board component configurators, and real-time visualization systems with strict 60fps performance budgets.",
      technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "TypeScript", "React"],
      geezNumeral: "፩",
      numeral: "01",
    },
    {
      company: locale === "am" ? "ገለልተኛ የሶፍትዌር መሃንዲስ" : "Independent Fullstack Developer",
      role: locale === "am" ? "የፉልስታክ አርክቴክቸር ኢንጂነሪንግ" : "Fullstack Architecture & Contract Engineering",
      period: "2023 — 2024",
      location: locale === "am" ? "አዲስ አበባ፣ ኢትዮጵያ" : "Addis Ababa, ET",
      description:
        locale === "am"
          ? "የዜንቢል (Zembil) የኢ-ኮሜርስ ክፍያ ስርዓትን እና የAi Mentor Plus ኮርስ ማመንጫን ጨምሮ በርካታ ፕሮጀክቶችን ገንብቻለሁ። የተሟላ PostgreSQL ዳታቤዝ እና ፈጣን UI አሰራርን አካቷል።"
          : "Engineered production web applications including the Zembil e-commerce multi-gateway platform and Ai Mentor Plus course generator. Implemented edge streaming, relational PostgreSQL modeling, and accessible UIs.",
      technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      geezNumeral: "፪",
      numeral: "02",
    },
    {
      company: "Ethio Telecom",
      role: locale === "am" ? "የሶፍትዌር ኢንጂነሪንግ ሰልጣኝ" : "Software Engineering Intern",
      period: "2023",
      location: locale === "am" ? "አዲስ አበባ፣ ኢትዮጵያ" : "Addis Ababa, ET",
      description:
        locale === "am"
          ? "የሰራተኞች አስተያየት መገምገሚያ የዳሽቦርድ ሲስተም ከChart.js ግራፎች እና ከExpress REST APIs ጋር ገንብቻለሁ።"
          : "Developed internal feedback management portal dashboards for analyzing employee organizational sentiments with real-time Chart.js visualizations and RESTful Express APIs.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      geezNumeral: "፫",
      numeral: "03",
    },
    {
      company: "Nile Technologies",
      role: locale === "am" ? "ጀማሪ የድር መሃንዲስ" : "Junior Web Developer",
      period: "2022 — 2023",
      location: locale === "am" ? "አዲስ አበባ፣ ኢትዮጵያ" : "Addis Ababa, ET",
      description:
        locale === "am"
          ? "ለደንበኞች ተስማሚ የሆኑ ድረ-ገጾችን ገንብቻለሁ፣ እንዲሁም የኮድ ፍጥነት እና የCore Web Vitals መለኪያዎችን አሻሽያለሁ።"
          : "Built responsive client web applications, collaborated on UI component libraries, and optimized frontend bundle sizes and Core Web Vitals.",
      technologies: ["JavaScript", "React", "Tailwind CSS", "REST APIs"],
      geezNumeral: "፬",
      numeral: "04",
    },
  ];

  const skillGroups = [
    {
      title: locale === "am" ? "የፊት ለፊት እና 3D ቴክኖሎጂ" : "Creative Frontend & 3D Web",
      skills: [
        "React",
        "Next.js (App Router)",
        "TypeScript (Strict)",
        "Three.js",
        "React Three Fiber (R3F)",
        "GLSL Shaders",
        "Tailwind CSS",
        "Framer Motion / Motion",
        "HTML5 Canvas API",
        "Lenis Smooth Scroll",
      ],
    },
    {
      title: locale === "am" ? "የጀርባ ሲስተም እና ዳታቤዝ" : "Backend & Systems Architecture",
      skills: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma ORM",
        "MongoDB",
        "Stripe / PayPal APIs",
        "Server-Sent Events (SSE)",
        "OpenAI API Integration",
        "RESTful API Design",
        "Zod Validation",
      ],
    },
    {
      title: locale === "am" ? "የኢንጂነሪንግ ልምምዶች እና ፍጥነት" : "Engineering Practices & Performance",
      skills: [
        "Core Web Vitals Optimization",
        "WCAG AA Accessibility",
        "Git & GitHub Workflows",
        "Docker Basics",
        "Vercel Deployment",
        "Bundle Size Profiling",
        "GPU Capability Gating",
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen pt-28 pb-24 text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="pb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ስለ" : "02"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.aboutPage.tag}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.aboutPage.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/Lantumo_Birhanu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-foreground text-background font-mono text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t.aboutPage.resumeBtn}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-border hover:border-accent text-foreground hover:text-accent font-mono text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              <span>{t.aboutPage.contactBtn}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-border">
          {/* Left: Bio portrait / card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-surface rounded-sm">
              <Image
                src="/profile.jpg"
                alt="Lantumo Birhanu"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-background/90 backdrop-blur-md border border-border text-xs font-mono flex items-center justify-between">
                <span className="text-accent font-semibold">{locale === "am" ? "ላንቱሞ ብርሃኑ" : "LANTUMO BIRHANU"}</span>
                <span className="text-muted">{locale === "am" ? "አዲስ አበባ" : "ADDIS ABABA, ET"}</span>
              </div>
            </div>

            <div className="p-5 border border-border/80 bg-surface/30 rounded-sm font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-muted">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{locale === "am" ? "አድራሻ: አዲስ አበባ፣ ኢትዮጵያ (UTC+3)" : "Location: Addis Ababa, Ethiopia (UTC+3)"}</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Terminal className="w-4 h-4 text-accent" />
                <span>{locale === "am" ? "ትኩረት: ፉልስታክ እና 3D ፍሮንትኤንድ" : "Primary Focus: Fullstack & 3D Frontend"}</span>
              </div>
              <div className="pt-2 border-t border-border/50">
                <EthiopianClock showDate={true} />
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-muted font-light leading-relaxed">
            <h2 className={`text-2xl sm:text-3xl font-bold text-foreground ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
              {t.aboutPage.bioLead}
            </h2>

            <p>{t.aboutPage.bioP1}</p>
            <p>{t.aboutPage.bioP2}</p>
            <p>{t.aboutPage.bioP3}</p>

            <div className="p-6 border-l-2 border-accent bg-surface/20 mt-8">
              <p className="font-mono text-xs sm:text-sm text-foreground italic leading-relaxed">
                {locale === "am"
                  ? "«ዋናው ግብ ግልጽ ነው፡ ፈጣን፣ በምርት ላይ አስተማማኝ እና የሰው ልጅ ማንነት የሚታይበትን ሶፍትዌር መገንባት።»"
                  : '"The goal is simple: engineer software that is blazing fast, rock-solid in production, and undeniably human in identity."'}
              </p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <section className="py-16 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ታሪክ" : "EXP"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.aboutPage.timelineSubtitle}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold text-foreground mb-12 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.aboutPage.timelineTitle}
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="group p-6 md:p-8 border border-border bg-surface/20 hover:border-accent/70 transition-all rounded-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/50 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={locale === "am" ? "font-ethiopic text-accent font-bold text-base" : "font-mono text-xs text-muted"}>
                      {locale === "am" ? exp.geezNumeral : exp.numeral}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                      {exp.role}
                    </h3>
                    <span className="text-muted text-sm font-mono">• {exp.company}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <span className="text-accent">{exp.period}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-muted font-light leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border border-border bg-background/50 text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Grouped by Domain */}
        <section className="py-16">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ችሎታ" : "SKL"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.aboutPage.skillsSubtitle}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold text-foreground mb-12 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.aboutPage.skillsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 border border-border bg-surface/30 rounded-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                      {locale === "am" ? `ምድብ 0${idx + 1}` : `0${idx + 1}`}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold text-foreground mb-6 ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2.5 font-mono text-xs text-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <TibebDivider className="mt-12" />
      </div>
    </div>
  );
}
