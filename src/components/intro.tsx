const TECH_CHIPS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "REST APIs",
  "Figma",
  "Git",
];

function ChipRow({ chips }: { chips: string[] }) {
  return (
    <div className="marquee-track flex w-max animate-[marquee-scroll_40s_linear_infinite] gap-4 pr-4 motion-reduce:animate-none">
      {[...chips, ...chips].map((chip, i) => (
        <span
          key={`${chip}-${i}`}
          className="whitespace-nowrap rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-muted"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

/**
 * Intro — a single centered marquee of tech chips above a giant first-person
 * statement with inline lime highlights.
 */
export function Intro() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Tech chips — one row, centered on the viewport */}
      <div
        className="flex flex-col items-center opacity-80 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      >
        <ChipRow chips={TECH_CHIPS} />
      </div>

      {/* Statement */}
      <div className="mx-auto mt-16 max-w-[1200px] px-6 text-center md:mt-24 md:px-10">
        <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.18] tracking-[-0.02em] text-foreground">
          You bring the idea,
          <br className="hidden sm:block" /> I&apos;ll bring the code.
          <br />
          I design, build and ship{" "}
          <span className="relative inline-block">
            <span className="relative z-10">web apps</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-[-0.2em] bottom-[0.06em] z-0 h-[0.5em] rounded-md bg-accent"
            />
          </span>{" "}
          that load fast, work for everyone and hold up in production —{" "}
          <span className="text-muted">
            written, tested and maintained by me,
          </span>{" "}
          <span className="relative inline-block">
            <span className="relative z-10">not a template.</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-[-0.2em] bottom-[0.06em] z-0 h-[0.5em] rounded-md bg-accent"
            />
          </span>
        </h2>
      </div>
    </section>
  );
}
