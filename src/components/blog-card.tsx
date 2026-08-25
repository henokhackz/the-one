"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const BlogCard = ({ blog }: { blog: any }) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const accent = "#10b981";

  return (
    <div
      onClick={() => router.push(`/blogs/${blog.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col h-full bg-surface transition-all duration-500 cursor-pointer overflow-hidden"
      style={{
        border: `1px solid ${hovered ? accent + "40" : "#ffffff10"}`,
        boxShadow: hovered ? `0 10px 40px -10px ${accent}20` : "none",
      }}
    >
      {/* Corner cut-out / accent effect */}
      <div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accent}20 100%)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />
      <div
        className="absolute top-0 right-0 w-px h-16 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, ${accent}60, transparent)`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-16 h-px pointer-events-none z-10"
        style={{
          background: `linear-gradient(to left, ${accent}60, transparent)`,
        }}
      />

      {/* Image */}
      {blog.images?.[0]?.image && (
        <div className="relative h-56 w-full overflow-hidden border-b border-border">
          <Image
            src={blog.images[0].image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] filter grayscale-[40%] group-hover:grayscale-0"
          />
          {/* Noise/gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4 z-10 hidden md:flex items-center gap-2 px-2.5 py-1 text-[8px] font-mono uppercase tracking-widest backdrop-blur-md  border border-border">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accent }}
            />
            <span className="text-muted">{blog.type}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-7 flex flex-col justify-between flex-grow relative bg-gradient-to-b from-transparent to-white/[0.01]">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-mono">
            <span style={{ color: accent }}>{blog.category}</span>
            <span className="text-muted">{blog.readingTime}</span>
          </div>

          <h3 className="text-xl font-bold text-foreground tracking-wide leading-snug group-hover:text-gray-200 transition-colors">
            {blog.title}
          </h3>

          <p className="text-[0.85rem] text-muted leading-[1.7] line-clamp-3">
            {blog.content}
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[9px] uppercase font-mono tracking-[0.2em] border border-border text-muted px-2 py-1 transition-colors duration-300"
                style={{
                  color: hovered ? accent : "",
                  borderColor: hovered ? `${accent}30` : "",
                  background: hovered ? `${accent}05` : "transparent",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-border flex justify-between items-center text-[9px] uppercase font-mono tracking-widest text-muted">
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold border border-border text-foreground bg-foreground">
              {blog.author.charAt(0)}
            </div>
            {blog.author}
          </span>
          <span className="group-hover:text-muted transition-colors">
            {new Date(blog.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Animated bottom line */}
        <div
          className="absolute bottom-0 left-0 h-px bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: hovered ? "100%" : "0%", opacity: hovered ? 0.7 : 0 }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
