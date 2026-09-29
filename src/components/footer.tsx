import Link from "next/link";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Bottom nav row */}
        <div className="flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-foreground transition-colors hover:text-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}{" "}
            — All rights reserved
          </p>
        </div>

        {/* Giant serif name */}
        <div
          aria-hidden="true"
          className="select-none pb-6 pt-2 text-center"
        >
          <span className="font-serif-accent block whitespace-nowrap text-[clamp(3.5rem,12.5vw,11.5rem)] leading-[0.95] tracking-[-0.02em] text-foreground">
            {profile.firstName} {profile.lastName}
          </span>
        </div>

        {/* Closing line */}
        <div className="flex flex-col items-center gap-2 pb-14 text-center">
          <p className="text-lg font-bold text-foreground">
            Open and excited for new projects
          </p>
          <p className="text-muted">
            <Link
              href="/contact"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Get in touch
            </Link>{" "}
            with me — send a message anytime, I read every one.
          </p>
        </div>
      </div>

      {/* Soft lime glow rising from the very bottom */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-40",
          "bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(201,241,88,0.35),transparent_70%)]",
        )}
      />
    </footer>
  );
}
