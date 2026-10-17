import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/lib/api";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    id: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPostBySlug(id);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <article className="w-full min-h-screen pt-28 pb-24 text-foreground">
      <div className="max-w-[860px] mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Post Header */}
        <header className="pb-10 border-b border-border space-y-4">
          <div className="flex items-center gap-3">
            <TibebCornerStamp geezNumeral={post.geezNumeral} />
            <span className="font-mono text-xs tracking-widest text-accent uppercase font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted font-light leading-relaxed">
            {post.subtitle}
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-6 font-mono text-xs text-muted border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              {post.readingTime}
            </span>
            <span>•</span>
            <span>By Lantumo Birhanu</span>
          </div>
        </header>

        {/* Editorial Content */}
        <div className="py-12 space-y-8 text-base sm:text-lg text-muted font-light leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="first-letter:text-4xl first-letter:font-heading first-letter:font-bold first-letter:text-accent first-letter:mr-1 first-letter:float-left">
              {paragraph}
            </p>
          ))}
        </div>

        <TibebDivider className="my-12" />

        {/* Article Footer */}
        <div className="p-8 border border-border bg-surface/30 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
              Have thoughts or questions on this article?
            </h3>
            <p className="text-xs text-muted font-mono">
              Discuss performance architectures or 3D web systems with me directly.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all shrink-0"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}