"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  imageRounded: string;
  className?: string;
  height?: string;
  parentDivImageRounded?: string;
}

const ImageWithFallback = ({
  src,
  alt = "Image",
  imageRounded,
  className = "",
  height,
  parentDivImageRounded,
}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`${height} ${parentDivImageRounded}`}>
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-fill ${className} ${imageRounded}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-full p-7 text-center h-full flex items-center justify-center bg-gray-300 ${imageRounded}`}
        >
          <div
            className={`flex flex-col ${imageRounded} items-center text-gray-500`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 mb-2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
              <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
            <span className="text-sm font-medium">No Image Available</span>
            <span className="text-sm font-medium">
              {"Image should be related to " + alt}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
