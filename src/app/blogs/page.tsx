"use server";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { db } from "../../../utils/db";
import { motion } from "framer-motion";

const Page = async () => {
  const blogs = await db.blog.findMany({});
  console.log("here", blogs);
  return (
    <MainLayoutWrapper
      header="Latest Articles"
      description="Explore insights, tips, and stories from our wellness experts to inspire your mindful journey."
    >
      <div className="relative py-16 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/20 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-800/10 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap gap-4"
          >
            <button className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300">
              All
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300">
              Mindfulness
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300">
              Wellness
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300">
              Nature
            </button>
          </motion.div>
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any, index: number) => (
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
                      blog?.coverImage?.startsWith("http") ||
                      blog?.coverImage?.startsWith("/")
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
                      {new Date(blog.dateCreated).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>By {blog.author}</span>
                  </div>
                  <h2 className="text-xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {blog.summary}
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
        </div>
      </div>
    </MainLayoutWrapper>
  );
};

export default Page;
