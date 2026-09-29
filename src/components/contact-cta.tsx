import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactCta } from "@/lib/data";

/**
 * Contact CTA — full-width lime band fading to white with a giant headline
 * and a dark pill button, per the reference design.
 */
export function ContactCta() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-36 lg:px-16">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl">
        {/* Lime gradient band */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(201,241,88,0.95),rgba(201,241,88,0.35)_55%,transparent)]"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center px-6 pb-14 pt-24 text-center md:pb-20 md:pt-32">
          <h2 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
            {contactCta.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/80">
            {contactCta.description}
          </p>
          <Link
            href="/contact"
            className="btn-pill group mt-10"
          >
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            {contactCta.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
