'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import BlogCard from './blog-card'
import blogs from '@/lib/dummy-data'

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(3)
  const visibleBlogs = blogs.slice(0, visibleCount)
  const hasMore = visibleCount < blogs.length

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden" id="blogs">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-emerald-500" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-[0.4em]">
                Latest Transmissions
              </span>
              <div className="h-px w-6 bg-emerald-500" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Insights on Future Tech
            </h2>
            <p className="mt-4 text-sm text-white/40 max-w-lg leading-relaxed">
              Deep dives into modern web architecture, High-Performance 3D rendering, and integrating LLMs into production applications.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
          {visibleBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div 
            className="mt-20 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMore}
              className="relative group px-8 py-3.5 border border-[#10b981]/30 bg-[#10b981]/[0.02] text-white tracking-[0.2em] uppercase text-[10px] font-bold overflow-hidden transition-all duration-500"
            >
              {/* Button focus background */}
              <div className="absolute inset-0 bg-[#10b981] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 20px 2px rgba(16,185,129,0.4) inset' }} />
              
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Access Memory Bank
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Blogs
