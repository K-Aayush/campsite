import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../utils/db";

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string | null;

    console.log("blogs create", title, description, content, image);

    if (!title || !description || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and content are required.",
        },
        { status: 400 }
      );
    }

    const baseSlug = slugify(title);

    let slug = baseSlug;
    let suffix = 1;

    while (await db.blog.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const blog = await db.blog.create({
      data: {
        title,
        slug,
        description,
        content,
        coverImage: image ? image : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      slug: blog.slug,
    });
  } catch (error) {
    console.error("Error submitting blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "There was an error submitting the blog.",
      },
      { status: 500 }
    );
  }
}
