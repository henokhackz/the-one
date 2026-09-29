import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

/**
 * ProjectCard — framed screenshot with a title + tag row underneath,
 * matching the reference: soft gray rounded frame around each screenshot.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`${project.title} — view project`}
    >
      {/* Framed screenshot */}
      <div className="rounded-2xl bg-[#ececea] p-3 transition-all duration-300 group-hover:-translate-y-1.5 group-focus-visible:ring-2 group-focus-visible:ring-accent sm:p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-background">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 620px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Title + tags row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-muted">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
