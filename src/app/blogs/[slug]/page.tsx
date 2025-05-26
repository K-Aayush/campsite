"use server";

import React from "react";
import { notFound } from "next/navigation";
import { db } from "../../../../utils/db";
import BlogContent from "@/components/blogs/BlogContents";

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

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!blog) notFound();

  return (
    <div className="relative py-16 pt-32 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/20 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-800/10 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="container mx-auto px-8 relative z-10">
        <BlogContent blog={blog} relatedBlogs={relatedBlogs} />
      </div>
    </div>
  );
};

export default Page;
