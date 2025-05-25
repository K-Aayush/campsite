// import React from "react";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { db } from "../../../../utils/db";

// interface Blog {
//   id: string;
//   slug?: string;
//   title: string;
//   description: string;
//   content: string;
//   coverImage: string | null;
//   published: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(new Date(date));
// };

// async function getBlogBySlug(slug: string): Promise<Blog | null> {
//   try {
//     return await db.blog.findUnique({
//       where: { slug },
//     });
//   } catch (error) {
//     console.error("Error fetching blog:", error);
//     return null;
//   }
// }

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

// const Page = async ({ params }: PageProps) => {
//   const { slug } = params;
//   const blog = await getBlogBySlug(slug);

//   console.log("slug", slug);
//   console.log("blog in slug", blog);

//   if (!blog) {
//     notFound();
//   }

//   return (
//     <article className="max-w-3xl mx-auto px-4 py-12">
//       <header className="mb-12 text-center">
//         <h1 className="text-4xl font-bold mb-4 tracking-tight">{blog.title}</h1>
//         <p className="text-gray-600 italic mb-6">{blog.description}</p>
//         <time className="text-sm text-gray-500">
//           {formatDate(blog.createdAt)}
//         </time>
//       </header>

//       {blog.coverImage && (
//         <div className="relative w-full h-96 mb-12 overflow-hidden rounded-lg">
//           <Image
//             src={blog.coverImage}
//             alt={blog.title}
//             fill
//             priority
//             className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
//           />
//         </div>
//       )}

//       <div className="prose prose-lg max-w-none">
//         <p
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//           className="leading-relaxed space-y-6"
//         />
//       </div>

//       <footer className="mt-16 pt-8 border-t border-gray-200">
//         <div className="flex justify-between items-center">
//           <pre className="text-sm text-gray-500">
//             Last updated: {formatDate(blog.updatedAt)}
//           </pre>
//           <Link
//             href="/blogs"
//             className="px-5 py-2 border rounded border-black text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
//           >
//             Back to Blogs
//           </Link>
//         </div>
//       </footer>
//     </article>
//   );
// };

// export default Page;

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "../../../../utils/db";

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

// ✅ Async function component for dynamic routes in App Router
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">{blog.title}</h1>
        <p className="text-gray-600 italic mb-6">{blog.description}</p>
        <time className="text-sm text-gray-500">
          {formatDate(blog.createdAt)}
        </time>
      </header>

      {blog.coverImage && (
        <div className="relative w-full h-96 mb-12 overflow-hidden rounded-lg">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="leading-relaxed space-y-6"
        />
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <pre className="text-sm text-gray-500">
            Last updated: {formatDate(blog.updatedAt)}
          </pre>
          <Link
            href="/blogs"
            className="px-5 py-2 border rounded border-black text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Back to Blogs
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default Page;
