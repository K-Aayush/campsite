import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "../../../../utils/db";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface Blog {
  id: string;
  slug: string | null;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    return await db.blog.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getRelatedBlogs(currentSlug: string): Promise<Blog[]> {
  try {
    return await db.blog.findMany({
      where: { slug: { not: currentSlug } },
      take: 3,
    });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}

// ✅ Async function component for dynamic routes in App Router
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!blog) notFound();

  return (
    <div className="relative py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/20 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-800/10 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
                {blog.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-6">
                {blog.description}
              </p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <time>{formatDate(blog.createdAt)}</time>
                <span>•</span>
                <span>By {blog.published}</span>
              </div>
            </header>
            {blog.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full h-80 md:h-96 mb-12 overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  aria-label={`Cover image for ${blog.title}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            )}
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-100 leading-relaxed space-y-6">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
            {/* Social Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                Share:
              </span>
              {[
                { icon: Facebook, href: "#", label: "Share on Facebook" },
                { icon: Twitter, href: "#", label: "Share on Twitter" },
                { icon: Linkedin, href: "#", label: "Share on LinkedIn" },
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 bg-green-50 dark:bg-gray-800 text-green-600 dark:text-green-400 rounded-full hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Last updated: {formatDate(blog.updatedAt)}
                </span>
                <Link
                  href="/blogs"
                  className="px-5 py-2 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300"
                  aria-label="Return to blogs list"
                >
                  Back to Blogs
                </Link>
              </div>
            </footer>
          </motion.div>
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 lg:sticky lg:top-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
              <h2 className="text-xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-4">
                Related Posts
              </h2>
              <div className="space-y-4">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog.id}
                      href={`/blogs/${relatedBlog.slug}`}
                      className="flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-300"
                      aria-label={`Read ${relatedBlog.title}`}
                    >
                      {relatedBlog.coverImage && (
                        <div className="relative w-16 h-16 rounded overflow-hidden">
                          <Image
                            src={
                              relatedBlog.coverImage.startsWith("http") ||
                              relatedBlog.coverImage.startsWith("/")
                                ? relatedBlog.coverImage
                                : "/image.avif"
                            }
                            alt={relatedBlog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {formatDate(relatedBlog.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No related posts available.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
};

export default Page;
