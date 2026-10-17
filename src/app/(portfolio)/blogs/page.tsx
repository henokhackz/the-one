"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { getBlogPosts } from "@/sanity/lib/api";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";
import { Reveal } from "@/components/ui/reveal";

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const { locale, t } = useLocale();

  useEffect(() => {
    getBlogPosts().then((data) => {
      if (data && data.length > 0) setPosts(data);
    });
  }, []);

  return (
    <div className="w-full min-h-screen pt-28 pb-24 text-foreground">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral="፬" />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.blogPage.tag}
            </span>
          </div>

          <Reveal variant="ink" duration={900}>
            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
              {t.blogPage.title}
            </h1>
          </Reveal>

          <p className="max-w-2xl text-base sm:text-lg text-muted font-light mt-6 leading-relaxed">
            {t.blogPage.description}
          </p>
        </div>

        {/* Post List */}
        <div className="divide-y divide-border/60 pt-6">
          {posts.map((post, idx) => (
            <article
              key={post.id}
              className="group py-10 transition-colors flex flex-col justify-between"
            >
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-muted mb-3">
                  <div className="flex items-center gap-3">
                    <span className={locale === "am" ? "font-ethiopic text-accent font-bold" : "font-mono text-accent font-bold"}>
                      {locale === "am" ? post.geezNumeral : `0${idx + 1}`}
                    </span>
                    <span className="text-accent uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="mt-3 text-base text-muted font-light leading-relaxed max-w-3xl">
                  {post.summary}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest group-hover:underline">
                  <span>{t.blogPage.readArticle}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        <TibebDivider className="mt-16" />
      </div>
    </div>
  );
}