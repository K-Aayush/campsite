"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface BlogGridProps {
  blogs: {
    id: string;
    title: string;
    slug: string | null;
    description: string;
    content: string;
    coverImage: string | null;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const BlogGrid = ({ blogs }: BlogGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={
                blog.coverImage?.startsWith("http") ||
                blog.coverImage?.startsWith("/")
                  ? blog.coverImage
                  : "/image.avif"
              }
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              aria-label={`Cover image for ${blog.title}`}
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-3 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {blog.description}
            </p>
            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
              aria-label={`Read more about ${blog.title}`}
            >
              Read More →
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogGrid;
