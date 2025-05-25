import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { db } from "../../../../utils/db";
import BlogListDisplay from "@/components/blogs/BlogListDisplay";

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

const Page = async () => {
  const blogs: Blog[] = await db.blog.findMany({});
  // console.log("blogs", blogs);

  // Format date for display
  // const formatDate = (date: Date) => {
  //   return new Date(date).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  return (
    <div className="container mx-auto py-6">
      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Your Blogs
        </h1>
        <Link
          href="/profile/blogs/new/create"
          className="flex items-center bg-black font-medium text-white p-2 text-sm rounded px-6 gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Create New Blog
        </Link>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search blogs by title or description..."
            className="pl-10 bg-white"
          />
        </div>
      </div>
      <div>
        <BlogListDisplay blogs={blogs} />
      </div>
    </div>
  );
};

export default Page;
