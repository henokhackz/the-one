import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[900px] px-6 pb-32 pt-32 md:pt-40">
      {/* Back */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to all posts
      </Link>

      {/* Header */}
      <div className="mt-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted">
          <span className="rounded-full bg-accent/60 px-3 py-1 font-medium text-accent-foreground">
            {post.category}
          </span>
          <span>{post.readingTime}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h1 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
          {post.title}
        </h1>
      </div>

      {/* Framed hero image */}
      <div className="mt-12 rounded-2xl bg-[#ececea] p-3 sm:p-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-background">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 900px) 92vw, 860px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-12 flex flex-col gap-6">
        <p className="text-lg leading-relaxed text-foreground">{post.excerpt}</p>
        <p className="text-[15px] leading-relaxed text-muted">
          The full article is being written and will be published soon. In the
          meantime, feel free to reach out if you have questions about{" "}
          {post.tags.map((tag) => tag).join(", ")} — I&apos;m always happy to
          talk shop.
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
