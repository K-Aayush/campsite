"use server";

import React from "react";
import { notFound } from "next/navigation";
import { db } from "../../../../utils/db";
import BlogContent from "@/components/blogs/BlogContents";
import { Metadata } from "next";
import { generateStructuredData } from "@/lib/seo";

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
      where: { slug, published: true },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getRelatedBlogs(currentSlug: string): Promise<Blog[]> {
  try {
    return await db.blog.findMany({
      where: {
        slug: { not: currentSlug },
        published: true,
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Mayur Wellness",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | Mayur Wellness Blog`,
    description: blog.description,
    keywords: [
      "wellness blog",
      "meditation article",
      "yoga tips",
      "mindfulness guide",
      "holistic health",
      "wellness insights",
      "spiritual wellness",
      "mental health",
      "wellness practices",
      "meditation techniques",
    ],
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: ["Mayur Wellness"],
      images: [
        {
          url: blog.coverImage || "/image.avif",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.coverImage || "/image.avif"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blogs/${blog.slug}`,
    },
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!blog) notFound();

  const blogPostStructuredData = generateStructuredData("BlogPosting", {
    headline: blog.title,
    description: blog.description,
    image: blog.coverImage || `${process.env.NEXT_PUBLIC_APP_URL}/image.avif`,
    author: {
      "@type": "Organization",
      name: "Mayur Wellness",
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Mayur Wellness",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/last-logo.png`,
      },
    },
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_APP_URL}/blogs/${blog.slug}`,
    },
    articleSection: "Wellness",
    keywords: [
      "wellness",
      "meditation",
      "yoga",
      "mindfulness",
      "holistic health",
      "spiritual wellness",
    ],
    wordCount: blog.content.length,
    articleBody: blog.content,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: blogPostStructuredData,
        }}
      />
      <div className="relative py-16 pt-32 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/20 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-800/10 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <BlogContent blog={blog} relatedBlogs={relatedBlogs} />
        </div>
      </div>
    </>
  );
};

export default Page;
