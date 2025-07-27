'use client'

import { useState } from 'react'
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
    <section className="w-full  bg-gray-100 dark:bg-slate-900">
      <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
        Latest Blogs
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:opacity-90 shadow"
          >
            Load More Blogs
          </button>
        </div>
      )}
    </section>
  )
}

export default Blogs
