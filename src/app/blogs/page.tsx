"use server";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";

import React from "react";
import { db } from "../../../utils/db";
import BlogGrid from "@/components/blogs/BlogGrid";

const Page = async () => {
  const blogs = await db.blog.findMany({});
  console.log("here", blogs);
  return (
    <div className="pt-16">
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
            {/* Blog Grid */}
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
  );
};

export default Page;
