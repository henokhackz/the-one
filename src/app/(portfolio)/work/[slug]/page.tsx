import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-32 md:px-10 md:pt-40 lg:px-16">
      {/* Back */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to all works
      </Link>

      {/* Header */}
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
            <span className="tag-pill">{project.status}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-light"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              Live Site
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Framed screenshot */}
      <div className="mt-12 rounded-2xl bg-[#ececea] p-3 sm:p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-background">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            priority
            sizes="(max-width: 1400px) 92vw, 1320px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Description + case study */}
      <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            About the project
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {project.description}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Role — {project.caseStudy.role}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Problem</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {project.caseStudy.problem}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">Solution</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {project.caseStudy.solution}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Key features
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {project.caseStudy.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Lessons learned
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {project.caseStudy.lessons.map((lesson) => (
                <li
                  key={lesson}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                  />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
