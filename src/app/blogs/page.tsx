"use server";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import React from "react";
import { db } from "../../../utils/db";
import BlogGrid from "@/components/blogs/BlogGrid";
import { Metadata } from "next";
import { generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Wellness Blog - Meditation, Yoga & Mindfulness Articles | Mayur Wellness",
  description:
    "Explore our wellness blog featuring expert articles on meditation techniques, yoga practices, mindfulness tips, and holistic health insights from Mayur Wellness experts.",
  keywords: [
    "wellness blog",
    "meditation articles",
    "yoga blog",
    "mindfulness tips",
    "holistic health blog",
    "wellness insights",
    "meditation techniques",
    "yoga practices",
    "spiritual wellness blog",
    "mental health articles",
    "wellness tips Nepal",
    "meditation guides",
    "yoga tutorials",
    "mindfulness practices",
  ],
  openGraph: {
    title:
      "Wellness Blog - Meditation, Yoga & Mindfulness Articles | Mayur Wellness",
    description:
      "Explore expert wellness articles on meditation, yoga, mindfulness, and holistic health from Mayur Wellness experts.",
    images: [
      {
        url: "/meditation.jpg",
        width: 1200,
        height: 630,
        alt: "Mayur Wellness Blog - Meditation and Wellness Articles",
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blogs`,
  },
};

const Page = async () => {
  try {
    const blogs =
      (await db.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      })) || [];

    const blogStructuredData = generateStructuredData("Blog", {
      name: "Mayur Wellness Blog",
      description:
        "Expert wellness articles on meditation, yoga, mindfulness, and holistic health",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blogs`,
      publisher: {
        "@type": "Organization",
        name: "Mayur Wellness",
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_APP_URL}/last-logo.png`,
        },
      },
      blogPost: blogs.map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/blogs/${blog.slug}`,
        datePublished: blog.createdAt.toISOString(),
        dateModified: blog.updatedAt.toISOString(),
        author: {
          "@type": "Organization",
          name: "Mayur Wellness",
        },
        publisher: {
          "@type": "Organization",
          name: "Mayur Wellness",
          logo: {
            "@type": "ImageObject",
            url: `${process.env.NEXT_PUBLIC_APP_URL}/last-logo.png`,
          },
        },
        image:
          blog.coverImage || `${process.env.NEXT_PUBLIC_APP_URL}/image.avif`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${process.env.NEXT_PUBLIC_APP_URL}/blogs/${blog.slug}`,
        },
      })),
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: blogStructuredData,
          }}
        />
        <div className="pt-16">
          <MainLayoutWrapper
            header="Latest Wellness Articles"
            description="Explore insights, tips, and stories from our wellness experts to inspire your mindful journey."
          >
            <div className="relative py-16 bg-white dark:bg-gray-900 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/20 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-800/10 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
              </div>
              <div className="container mx-auto px-4 relative z-10">
                {blogs.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    No blogs found.
                  </p>
                ) : (
                  <BlogGrid blogs={blogs} />
                )}
              </div>
            </div>
          </MainLayoutWrapper>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="pt-16">
        <MainLayoutWrapper
          header="Latest Wellness Articles"
          description="An error occurred while fetching blogs."
        >
          <div className="container mx-auto px-4">
            <p className="text-red-600">
              Failed to load blogs. Please try again later.
            </p>
          </div>
        </MainLayoutWrapper>
      </div>
    );
  }
};

export default Page;
