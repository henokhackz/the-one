import { blogPosts } from "@/lib/data";
import { BlogCard } from "./blog-card";

export function Blogs() {
  return (
    <section className="py-24 md:py-36" id="blogs">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center">
          <p className="section-slash">/ Blog</p>
          <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            Latest Writing
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-muted">
            Notes on modern web architecture, 3D on the web, and shipping AI
            features to production.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blogs;
