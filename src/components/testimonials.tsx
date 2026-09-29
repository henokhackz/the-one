import { testimonials, type Testimonial } from "@/lib/data";

function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col gap-4">
      <blockquote className="text-[15px] leading-relaxed text-muted">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/60 text-sm font-semibold text-accent-foreground"
        >
          {testimonial.name.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </span>
          <span className="text-xs text-muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials — a big opening quote with two offset quote cards split by
 * a vertical hairline, exactly like the reference design.
 */
export function Testimonials() {
  const [first, ...rest] = testimonials;

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center">
          <p className="section-slash">/ Testimonials</p>
          <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            Kind Words From
            <br />
            Great People
          </h2>
        </div>

        {/* Quotes */}
        <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-12 md:mt-24 md:grid-cols-[1px_1fr_1fr] md:gap-0">
          {/* Divider */}
          <div aria-hidden="true" className="hidden bg-border md:block" />

          {/* Left column — featured quote, larger */}
          <div className="md:px-12">
            <span
              aria-hidden="true"
              className="font-serif-accent block text-7xl leading-[0.6] text-foreground"
            >
              &ldquo;
            </span>
            <div className="mt-6">
              <QuoteCard testimonial={first} />
            </div>
          </div>

          {/* Right column — remaining quotes, offset lower */}
          <div className="flex flex-col gap-12 md:px-12 md:pt-24">
            {rest.map((testimonial) => (
              <QuoteCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
