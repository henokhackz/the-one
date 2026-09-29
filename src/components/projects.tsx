import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";

/**
 * Selected Works — 2-column grid of framed project screenshots.
 */
export function Projects({ limit }: { limit?: number }) {
  const visible = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="relative overflow-hidden py-24 md:py-36" id="work">
      {/* Soft lime glow — consistent with the other sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[1200px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,241,88,0.32),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center">
          <p className="section-slash">/ Best Works</p>
          <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            Selected Works
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
