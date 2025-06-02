"use client";

import { useState } from "react";
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

export default function AdminGalleryPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"image" | "video">("image");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setTitle("");
      setDescription("");
      setUrl("");
      fetchGalleryItems();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to add gallery item" });
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id: string) => {
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
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

            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`Enter ${type} URL`}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
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
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <Button
                variant="destructive"
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
