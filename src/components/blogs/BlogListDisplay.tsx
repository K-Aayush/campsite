"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";
import ImageWithFallback from "../commons/ImageWithFallback";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { showToast } from "@/utils/Toast";

interface Blog {
  id: string;
  slug?: string | null;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogListDisplay = ({ blogs }: { blogs: Blog[] }) => {
  console.log("blogs", blogs);

  const [clientBlogs, setClientBlogs] = useState<Blog[]>(blogs);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog");

      if (response.ok) {
        showToast("success", { title: "Blog successfully deleted!!" });
        setClientBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.id !== id)
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast("error", { title: "Failed to delete blog" });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clientBlogs.map((blog: Blog) => (
        <div
          key={blog.id}
          className="flex flex-col shadow-lg bg-white hover:shadow-2xl rounded-2xl transition-shadow duration-300 overflow-hidden"
        >
          {blog.coverImage && (
            <ImageWithFallback
              height="h-[300px]"
              src={blog.coverImage}
              alt={blog.title}
              imageRounded="rounded-t-2xl"
              parentDivImageRounded="rounded-2xl"
            />
          )}

          {/* This part grows to fill vertical space */}
          <div className="flex flex-col items-stretch  flex-1 p-4">
            <div className="pb-2">
              <Link href={`/profile/blogs/${blog.id}`}>
                <h3 className="font-medium text-xl line-clamp-2 hover:text-primary cursor-pointer">
                  {blog.title}
                </h3>
              </Link>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>

                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100">
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>

            <div className="pb-4">
              <p className="text-gray-600 line-clamp-3">{blog.description}</p>
            </div>

            {/* This is pinned to the bottom using mt-auto */}
            <div className="mt-auto  flex gap-2">
              <Link
                href={`/blogs/${blog.slug}`}
                className="w-full cursor-pointer"
              >
                <Button variant="outline" className="w-full cursor-pointer">
                  Read More
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="cursor-pointer">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-balance">
                      This action cannot be undone. This will permanently delete
                      your blog post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 cursor-pointer hover:bg-red-700"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Yes, delete it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogListDisplay;
