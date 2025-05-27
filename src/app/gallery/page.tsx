"use client";
import React, { useState } from "react";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const sampleMedia = [
  {
    id: 1,
    type: "image",
    src: "/gallery-one.jpeg",
    alt: "Camping Experience",
  },
  {
    id: 2,
    type: "image",
    src: "/gallery-two.jpeg",
    alt: "Nature Activities",
  },
  {
    id: 3,
    type: "image",
    src: "/gallery-three.jpeg",
    alt: "Community Events",
  },
  {
    id: 4,
    type: "video",
    src: "/gallery-video-one.mp4",
    poster: "/gallery-one.jpeg",
    alt: "Campsite Tour",
  },
];

export default function Page() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const openLightbox = (media: any) => {
    setSelectedMedia(media);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="pt-16">
      <MainLayoutWrapper
        header="Our Gallery"
        description="Explore moments and memories from our campsite"
      >
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMedia.map((media) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(media)}
              >
                {media.type === "image" ? (
                  <div className="relative h-64 w-full">
                    <img
                      src={media.src}
                      alt={media.alt}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative h-64 w-full">
                    <img
                      src={media.poster}
                      alt={media.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="rounded-full bg-white/80 p-4">
                        <svg
                          className="h-8 w-8 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

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
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
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
                      src={selectedMedia.src}
                      alt={selectedMedia.alt}
                      className="max-h-[90vh] max-w-full object-contain"
                    />
                  ) : (
                    <video
                      src={selectedMedia.src}
                      poster={selectedMedia.poster}
                      controls
                      className="max-h-[90vh] max-w-full"
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MainLayoutWrapper>
    </div>
  );
}
