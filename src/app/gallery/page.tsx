"use client";
import React, { useState, useEffect } from "react";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { showToast } from "@/utils/Toast";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  type: "image" | "video";
  url: string;
  createdAt: string;
}

export default function Page() {
  const [media, setMedia] = useState<GalleryItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery items");
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      showToast("error", { title: "Failed to load gallery items" });
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (mediaItem: GalleryItem) => {
    setSelectedMedia(mediaItem);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  if (loading) {
    return (
      <div className="pt-16">
        <MainLayoutWrapper
          header="Our Gallery"
          description="Explore moments and memories from our campsite"
        >
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </MainLayoutWrapper>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <MainLayoutWrapper
        header="Our Gallery"
        description="Explore moments and memories from our campsite"
      >
        <div className="mx-auto max-w-7xl px-4 py-16">
          {media.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No gallery items available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {media.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative h-64 w-full">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <video
                          src={item.url}
                          className="h-full w-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <div className="rounded-full bg-white/80 p-4 group-hover:bg-white transition-colors">
                            <Play className="h-8 w-8 text-black" />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-white/80 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <AnimatePresence>
            {selectedMedia && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={closeLightbox}
              >
                <button
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                </button>
                <div
                  className="relative max-h-[90vh] max-w-[90vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedMedia.type === "image" ? (
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.title}
                      className="max-h-[90vh] max-w-full object-contain"
                    />
                  ) : (
                    <video
                      src={selectedMedia.url}
                      controls
                      className="max-h-[90vh] max-w-full"
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-white font-semibold text-xl mb-2">
                      {selectedMedia.title}
                    </h3>
                    {selectedMedia.description && (
                      <p className="text-white/80">
                        {selectedMedia.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MainLayoutWrapper>
    </div>
  );
}
