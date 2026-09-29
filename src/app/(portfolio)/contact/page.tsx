import type { Metadata } from "next";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { SocialIcon } from "@/components/social-icon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lantumo Birhanu — open to new opportunities, collaborations and creative challenges.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-32 md:px-10 md:pt-40 lg:px-16">
      {/* Header */}
      <div className="text-center">
        <p className="section-slash">/ Contact</p>
        <h1 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
          Let&apos;s Make It Happen
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[15px] text-muted">
          Always open to new opportunities, collaborations and creative
          challenges. Tell me about your project and let&apos;s build it
          together.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-14 md:mt-24 lg:grid-cols-2 lg:gap-20">
        {/* Left — direct channels */}
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/60 text-accent-foreground">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                Email
              </span>
              <span className="truncate text-[15px] font-medium text-foreground">
                {profile.email}
              </span>
            </span>
            <ArrowUpRight
              className="ml-auto h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/60 text-accent-foreground">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                Phone
              </span>
              <span className="truncate text-[15px] font-medium text-foreground">
                {profile.phone}
              </span>
            </span>
            <ArrowUpRight
              className="ml-auto h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          {/* Socials */}
          <div className="mt-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Elsewhere
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                  >
                    <SocialIcon
                      name={social.icon}
                      className="h-[18px] w-[18px]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resume */}
          <a
            href={profile.resumeUrl}
            download
            className="btn-pill mt-6 self-start"
          >
            Download Resume
          </a>
        </div>

        {/* Right — form (mailto fallback, no backend yet) */}
        <form
          action={`mailto:${profile.email}`}
          method="post"
          encType="text/plain"
          className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                Name
              </span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell me about your project…"
              className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
            />
          </label>

          <button type="submit" className="btn-pill mt-2 self-start">
            Send Message
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
