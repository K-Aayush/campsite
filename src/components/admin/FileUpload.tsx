"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, Video } from "lucide-react";
import { showToast } from "@/utils/Toast";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  uploadPath?: string;
  label?: string;
  currentFile?: string;
}

export default function FileUpload({
  onUploadComplete,
  acceptedTypes = "image/*,video/*",
  maxSize = 10,
  uploadPath = "uploads",
  label = "Upload File",
  currentFile,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      showToast("error", {
        title: `File size must be less than ${maxSize}MB`,
      });
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const filename = `${uploadPath}/${Date.now()}-${selectedFile.name}`;
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      onUploadComplete(downloadURL);
      showToast("success", { title: "File uploaded successfully" });
    } catch (error) {
      console.error("Upload error:", error);
      showToast("error", { title: "Failed to upload file" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isVideo = (file: string) => {
    return (
      file.includes("video") || file.endsWith(".mp4") || file.endsWith(".webm")
    );
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {preview ? (
        <div className="relative">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            {isVideo(preview) ? (
              <video
                src={preview}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            {acceptedTypes.includes("video") ? (
              <Video className="h-12 w-12 text-gray-400" />
            ) : (
              <ImageIcon className="h-12 w-12 text-gray-400" />
            )}
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">Max size: {maxSize}MB</p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />

      {selectedFile && (
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={handleRemove}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
