import { services } from "@/lib/data";
import { Squiggle } from "./squiggle";
import { cn } from "@/lib/utils";

/**
 * Lime zigzag wire with small open circle endpoints. Drawn at the vertical
 * centre of a process card and reaching across the gap to the next card,
 * so the cards read as one visually connected sequence.
 */
function Connector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 32"
      fill="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 hidden text-accent md:block",
        className,
      )}
    >
      <path
        d="M6 16 L 22 6 L 38 22 L 54 6 L 74 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="16" r="4.5" fill="#ffffff" stroke="currentColor" strokeWidth="3" />
      <circle cx="74" cy="16" r="4.5" fill="#ffffff" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

/**
 * Process — "How I Work": three numbered service cards, each slightly
 * rotated and vertically offset over a wide lime radial glow, linked by
 * hand-drawn connector lines.
 */
export function Process() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Wide lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[1300px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,241,88,0.45),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center">
          <p className="section-slash">/ How I Work</p>
          <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            From Idea To Impact
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">
            A focused process that takes your product from a rough concept to a
            polished, production-ready release.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-3 md:gap-6 lg:gap-8">
          {services.map((service, i) => {
            const rotations = ["md:-rotate-3", "md:rotate-2", "md:-rotate-2"];
            const offsets = ["md:translate-y-10", "md:-translate-y-2", "md:translate-y-14"];
            const zIndices = ["md:z-20", "md:z-10", "md:z-0"];
            return (
              <article
                key={service.id}
                className={cn(
                  "group relative rounded-2xl border border-border bg-surface p-8",
                  "transition-transform duration-300 ease-out hover:rotate-0 hover:-translate-y-1",
                  rotations[i % 3],
                  offsets[i % 3],
                  zIndices[i % 3],
                )}
              >
                {/* Wire to the next card */}
                {(i === 0 || i === 1) && (
                  <Connector className="right-[-40px] top-1/2 h-10 w-24 -translate-y-1/2" />
                )}

                {/* Number */}
                <span className="block text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.04em] text-foreground">
                  {service.number}
                </span>

                {/* Squiggle */}
                <Squiggle
                  variant={service.squiggle}
                  className="mt-5 h-9 w-20 text-foreground/70 transition-colors duration-300 group-hover:text-foreground"
                />

                {/* Title */}
                <h3 className="mt-5 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
