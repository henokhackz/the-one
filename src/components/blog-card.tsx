import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={post.title}
    >
      {/* Framed image */}
      <div className="rounded-2xl bg-[#ececea] p-3 transition-all duration-300 group-hover:-translate-y-1.5 group-focus-visible:ring-2 group-focus-visible:ring-accent sm:p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-background">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 440px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Meta + title */}
      <div className="mt-4 flex flex-col gap-2 px-1">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="rounded-full bg-accent/60 px-2.5 py-0.5 font-medium text-accent-foreground">
            {post.category}
          </span>
          <span>{post.readingTime}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-muted">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default BlogCard;
