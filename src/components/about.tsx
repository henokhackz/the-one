import Image from "next/image";
import { experience, profile, socials } from "@/lib/data";
import { SocialIcon } from "./social-icon";
import { ArrowRight } from "lucide-react";

/**
 * Who Am I — tilted grayscale portrait with socials, bio text and an
 * experience table (role → company → years), per the reference design.
 */
export function About() {
  return (
    <section className="py-24 md:py-36" id="about">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center">
          <p className="section-slash">/ Who Am I</p>
          <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            Pushing Boundaries{" "}
            <span className="text-muted/70">Since 2020</span>
          </h2>
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 items-start gap-14 md:mt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Left — tilted grayscale portrait */}
          <div>
            <div className="relative inline-block w-full max-w-[440px]">
              {/* Tilted frame */}
              <div className="relative -rotate-2 rounded-2xl border border-border bg-surface p-3 transition-transform duration-300 hover:rotate-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-foreground">
                  <Image
                    src={profile.portrait.src}
                    alt={profile.portrait.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover object-top grayscale"
                  />
                </div>
              </div>

              {/* Socials + name row under the frame */}
              <div className="mt-5 flex items-end justify-between">
                <ul className="flex items-center gap-4">
                  {socials.slice(0, 3).map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="block text-foreground transition-colors hover:text-muted"
                      >
                        <SocialIcon
                          name={social.icon}
                          className="h-[18px] w-[18px]"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-xs text-muted">{profile.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — bio + experience table */}
          <div className="flex flex-col gap-12 lg:pt-2">
            <p className="max-w-xl text-[15px] leading-relaxed text-muted">
              I&apos;m a fullstack developer who likes building things that
              hold up. Over the years I&apos;ve worked with startups and
              businesses to ship web apps where the interface is simple and the
              engineering underneath is solid — usually that means fewer
              shortcuts and more time on the parts users never see.
            </p>

            {/* Experience table */}
            <ul className="flex flex-col">
              {experience.map((item, i) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between gap-4 py-4 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="whitespace-nowrap text-sm font-semibold text-foreground">
                      {item.role}
                    </span>
                    <span className="truncate text-xs text-muted/80">
                      {item.company}
                    </span>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2 text-sm text-foreground">
                    <span>{item.start}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-muted"
                      aria-hidden="true"
                    />
                    <span>{item.end}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
