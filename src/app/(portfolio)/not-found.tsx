import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative w-full min-h-[calc(100svh-6rem)] flex items-center justify-center py-24  text-white overflow-hidden">
      {/* ── dot environment (same as hero/about) ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#080808] to-[#050505]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#f59e0b]/[0.05] blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-[#f59e0b]/80" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase font-medium">
            Error / 404
          </span>
        </div>

        <h1 className="font-heading text-[clamp(6rem,18vw,16rem)] leading-[0.85] tracking-[-0.03em] font-bold uppercase select-none">
          <span className="text-white">404</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/70 font-light max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-3 border border-white/30 hover:border-white px-6 md:px-8 py-3.5 md:py-4 mt-10 text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Back to Home
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
