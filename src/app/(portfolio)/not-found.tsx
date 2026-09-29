import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-6 py-32 text-center">
      <p className="section-slash">/ Error</p>
      <h1 className="mt-4 text-[clamp(5rem,16vw,12rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-foreground">
        4<span className="text-accent">0</span>4
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-pill group mt-10">
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Back to Home
      </Link>
    </section>
  );
}
