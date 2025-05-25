"use server";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { db } from "../../../utils/db";

const Page = async () => {
  const blogs = await db.blog.findMany({});
  console.log("here", blogs);
  return (
    <MainLayoutWrapper
      header="Latest Articles"
      description="Insights and tutorials from our team of experts lorem 50fkjflksfja;lfsafjsdklfjsdkfjs"
    >
      <div className="  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-72 w-full relative overflow-hidden">
                <Image
                  src={
                    blog?.coverImage?.startsWith("http") ||
                    blog?.coverImage?.startsWith("/")
                      ? blog.coverImage
                      : "/image.avif" // fallback image you provide
                  }
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {blog.dateCreated}
                  </span>
                  <span className="text-sm text-gray-500">
                    By {blog.author}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.summary}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center text-primary-color font-medium transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayoutWrapper>
  );
};

export default Page;
