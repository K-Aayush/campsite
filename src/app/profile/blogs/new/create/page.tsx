"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/utils/firebase";
import { showToast } from "@/utils/Toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Upload, X } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Correct the function to use setImageFile, not setImage
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      showToast("error", { title: "Image is required" });
      return;
    }

    try {
      setIsSubmitting(true);
      const storageRef = ref(storage, `mayur/blogs/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const image = await getDownloadURL(storageRef);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      if (image) {
        console.log("image", image);
        formData.append("image", image);
      }
      const res = await fetch("/api/blogs/create", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        showToast("success", { title: "Blogs Added Successfully" });
        setTitle("");
        setContent("");
        setDescription("");
        setImageFile(null);
        setPreview(null);
      }

      console.log("res and data", res, data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form>
      <Card className=" mx-auto p-6 space-y-6">
        <CardHeader className="p-0">
          <h1 className="text-center font-medium text-2xl">Create a Blog</h1>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <div className="space-y-2">
            <Label>Title: </Label>
            <Input
              required
              placeholder="Enter your title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Description: </Label>
            <Input
              required
              placeholder="Enter your description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Content: </Label>
            <Textarea
              className=" min-h-32"
              required
              placeholder="Enter your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Cover Image:</Label>
            {!preview ? (
              <div
                className="border-2 h-48 flex gap-3 items-center justify-center border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className=" h-6 w-6 text-gray-500 mb-2" />
                <p className="text-gray-500 text-sm">
                  Click to upload an image
                </p>
              </div>
            ) : (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  onClick={removeImage}
                  type="button"
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:shadow-md"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>
            )}
            <input
              required
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <div className="flex justify-end w-full">
            <Button
              type="submit"
              className="px-9 cursor-pointer"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                title.length < 5 ||
                description.length < 10 ||
                content.length < 10
              }
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Page;
