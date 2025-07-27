'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

const BlogCard = ({ blog }: { blog: any }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/blogs/${blog.slug}`)}
      className="group p-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-xl transition-transform hover:scale-[1.01] cursor-pointer"
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md h-full">
        {/* Image */}
        {blog.images?.[0]?.image && (
          <div className="relative h-48 w-full">
            <Image
              src={blog.images[0].image}
              alt={blog.title}
              fill
              className="object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-fuchsia-600 dark:text-cyan-400 uppercase font-semibold">
              {blog.type}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {blog.readingTime}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {blog.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {blog.content}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-white px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>By {blog.author}</span>
            <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
