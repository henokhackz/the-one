import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { SocialIcon } from "./social-icon";

/**
 * Hero — full-bleed lime gradient with an egg-shaped bright core.
 *
 *   "Hi, I'm Lantumo" — bold sans
 *   "Fullstack Developer" — giant italic serif, partially behind the portrait
 *   cutout portrait (grayscale, lg+) overlapping the serif line
 *   availability pill · trusted row (left) / bio · CTA (right)
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ── Lime gradient: linear base (top→bottom fade) + bright oval core ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 48% at 50% 52%, rgba(201,241,88,0.95) 0%, rgba(201,241,88,0.55) 58%, rgba(201,241,88,0) 100%)," +
            "linear-gradient(180deg, rgba(201,241,88,0.28) 0%, rgba(201,241,88,0.5) 22%, rgba(201,241,88,0.66) 45%, rgba(201,241,88,0.6) 60%, rgba(201,241,88,0.3) 78%, rgba(253,253,251,0) 97%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-6 md:px-10 lg:px-16">
        {/* ── Headline ──────────────────────────────────────────────────── */}
        <div className="relative flex  flex-1 flex-col items-center justify-center pb-12">
          <h1 className="relative z-10 text-center leading-[1.02] tracking-[-0.03em]">
            <span className="block text-[clamp(2.5rem,8vw,6.5rem)] font-semibold text-foreground">
              Hi, I&apos;m {profile.firstName}
            </span>
            <span className="font-serif-accent relative mt-1 block text-[clamp(2.25rem,9vw,8rem)] italic leading-[1.05] text-foreground">
              {profile.role}
            </span>
          </h1>
        </div>

        {/* ── Portrait — grayscale, behind the serif line, fading at the
            bottom edge so it melts into the white gradient (lg+) ──────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto hidden h-[64%] w-full max-w-[480px] [mask-image:linear-gradient(to_bottom,black_46%,black_62%,transparent_94%)] lg:block"
        >
          <Image
            src={profile.portrait.src}
            alt=""
            fill
            priority
            sizes="480px"
            className="object-contain object-bottom grayscale"
          />
        </div>

        {/* ── Bottom row ────────────────────────────────────────────────── */}
        <div className="relative z-30 flex flex-col items-center gap-8 pb-14 md:flex-row md:items-end md:justify-between md:gap-6">
          {/* Left — availability + trusted */}
          <div className="order-2 flex flex-col items-center gap-8 md:order-1 md:items-start">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-surface py-2 pl-3 pr-4 text-sm font-medium text-foreground">
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-5 w-5 rounded-full border border-border bg-accent" />
              </span>
              Available for new opportunities
            </span>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {socials.slice(0, 3).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <SocialIcon
                      name={social.icon}
                      className="h-4 w-4"
                    />
                  </a>
                ))}
              </div>
              <p className="max-w-[230px] text-xs leading-relaxed text-foreground/70">
                Trusted by over{" "}
                <span className="font-semibold text-foreground">
                  20+ happy clients
                </span>{" "}
                across startups and commercial projects.
              </p>
            </div>
          </div>

          {/* Right — bio + CTA */}
          <div className="order-1 flex flex-col items-center gap-6 md:order-2 md:items-end">
            <p className="max-w-xs text-center text-sm leading-relaxed text-foreground/80 md:max-w-sm md:text-right md:text-[15px]">
              I care about the whole path — sketching the flow, building it
              out, and shipping something people actually enjoy using.
            </p>

            <Link href="/contact" className="btn-pill group">
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
