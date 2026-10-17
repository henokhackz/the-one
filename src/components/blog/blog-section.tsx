"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Rss, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { getBlogPosts } from "@/sanity/lib/api";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";
import { Reveal } from "@/components/ui/reveal";
import { RuledFrame } from "@/components/ui/ruled-frame";

export function BlogSection({ initialPosts }: { initialPosts?: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || BLOG_POSTS);
  const { locale } = useLocale();

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    } else {
      getBlogPosts().then((data) => {
        if (data && data.length > 0) setPosts(data);
      });
    }
  }, [initialPosts]);

  return (
    <section
      id="writing"
      className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 bg-background"
      aria-label="Technical Essays and Publications"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-border/80">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TibebCornerStamp geezNumeral="፬" />
            <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-medium">
              {locale === "am" ? "የቴክኒክ ማስታወሻዎች" : "Technical Writing & Architecture"}
            </span>
          </div>
          <Reveal variant="ink" duration={900}>
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground ${
                locale === "am" ? "font-ethiopic" : "font-heading"
              }`}
            >
              {locale === "am" ? "ጽሁፎች እና ጥናቶች" : "Engineering Journal"}
            </h2>
          </Reveal>
        </div>

        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink inline-flex items-center gap-2 px-4 py-2 font-mono text-xs text-muted hover:text-accent uppercase tracking-wider transition-colors"
        >
          <Rss className="w-3.5 h-3.5 text-accent" />
          <span>RSS Feed</span>
        </a>
      </div>

      {/* 3 Articles Grid with RuledFrame borders */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post, idx) => (
          <RuledFrame
            key={post.id}
            as="article"
            delay={idx * 100}
            className="group relative p-6 sm:p-8 rounded-[1px] border border-border/80 card-ink flex flex-col justify-between hover:border-border-strong transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                <span className="px-2 py-0.5 rounded-none bg-transparent border border-border text-[10px] text-accent uppercase tracking-wider font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Clock className="w-3 h-3 text-accent" />
                  <span>{post.readingTime}</span>
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                <Link href={`/blogs/${post.slug}`} className="ink-link">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-muted font-light leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between">
              <span className="font-mono text-xs text-muted flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-accent" />
                <span>{post.date}</span>
              </span>

              <Link
                href={`/blogs/${post.slug}`}
                className="ink-link font-mono text-xs text-accent font-semibold uppercase tracking-wider inline-flex items-center gap-1"
              >
                <span>Read Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </RuledFrame>
        ))}
      </div>
    </section>
  );
}
