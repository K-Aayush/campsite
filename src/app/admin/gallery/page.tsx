"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/utils/Toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/admin/FileUpload";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"image" | "video">("image");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/admin/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to fetch gallery items" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      showToast("error", { title: "Please upload a file first" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          type,
          url,
        }),
      });

      if (!response.ok) throw new Error("Failed to add gallery item");

      showToast("success", { title: "Gallery item added successfully" });
      resetForm();
      fetchGalleryItems();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to add gallery item" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setType("image");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete gallery item");

      showToast("success", { title: "Gallery item deleted successfully" });
      fetchGalleryItems();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to delete gallery item" });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Gallery</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select
                value={type}
                onValueChange={(value: "image" | "video") => setType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FileUpload
              label={`Upload ${type}`}
              acceptedTypes={type === "image" ? "image/*" : "video/*"}
              maxSize={type === "image" ? 5 : 50}
              uploadPath="gallery"
              currentFile={url}
              onUploadComplete={(uploadedUrl) => setUrl(uploadedUrl)}
            />

            <Button
              type="submit"
              disabled={loading || !url}
              className="min-w-32"
            >
              {loading ? "Adding..." : "Add Gallery Item"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
