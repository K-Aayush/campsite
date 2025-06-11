"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/utils/Toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/admin/FileUpload";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to fetch blogs" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast("error", { title: "Title is required" });
      return;
    }

    if (!description.trim()) {
      showToast("error", { title: "Description is required" });
      return;
    }

    if (!content.trim()) {
      showToast("error", { title: "Content is required" });
      return;
    }

    setLoading(true);

    try {
      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          image: coverImage,
        }),
      });

      if (!response.ok) throw new Error("Failed to save blog");

      showToast("success", {
        title: editingBlog
          ? "Blog updated successfully"
          : "Blog created successfully",
      });

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to save blog" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setCoverImage("");
    setEditingBlog(null);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setContent(blog.content);
    setCoverImage(blog.coverImage || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      showToast("success", { title: "Blog deleted successfully" });
      fetchBlogs();
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to delete blog" });
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update blog status");

      showToast("success", { title: "Blog status updated successfully" });
      fetchBlogs();
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to update blog status" });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {editingBlog ? "Edit Blog" : "Create New Blog"}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[100px]"
                placeholder="Enter a brief description of your blog post..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[300px]"
                placeholder="Write your blog content here..."
              />
            </div>

            <FileUpload
              label="Cover Image"
              acceptedTypes="image/*"
              maxSize={5}
              uploadPath="blogs"
              currentFile={coverImage}
              onUploadComplete={(url) => setCoverImage(url)}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="min-w-32">
                {loading
                  ? "Saving..."
                  : editingBlog
                    ? "Update Blog"
                    : "Create Blog"}
              </Button>
              {editingBlog && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{blog.description}</p>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={blog.published ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        handleTogglePublish(blog.id, blog.published)
                      }
                    >
                      {blog.published ? "Published" : "Draft"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
