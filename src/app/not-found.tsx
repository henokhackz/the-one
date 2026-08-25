import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center  text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-center px-6 text-center md:px-12 xl:px-16">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#f59e0b]/80" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase font-medium">
            Error / 404
          </span>
        </div>

        <h1 className="font-heading text-[clamp(6rem,18vw,16rem)] leading-[0.85] tracking-[-0.03em] font-bold uppercase select-none">
          404
        </h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70 font-light md:text-xl">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 border border-white/30 px-6 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black md:px-8 md:py-4"
        >
          Back to Home
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </main>
  );
}
