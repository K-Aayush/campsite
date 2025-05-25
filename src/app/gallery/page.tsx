// "use client";
// import React, { useState } from "react";

// const sampleMedia = [
//   {
//     id: 1,
//     type: "image",
//     src: "/gallery-one.jpeg",
//     alt: "Sample image",
//     span: "col-span-1 row-span-1",
//   },
//   {
//     id: 2,
//     type: "video",
//     src: "/gallery-video-one.mp4",
//     poster: "/api/placeholder/500/300",
//     span: "col-span-2 row-span-1",
//   },
// ];

// export default function MediaGallery() {
//   const [selectedMedia, setSelectedMedia] = useState(null);

//   const openLightbox = (media: an) => {
//     setSelectedMedia(media);
//   };

//   // Close the lightbox
//   const closeLightbox = () => {
//     setSelectedMedia(null);
//   };

//   return (
//     <div className="mx-auto max-w-6xl px-4">
//       {/* Grid layout for the gallery */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
//         {sampleMedia.map((media) => (
//           <div
//             key={media.id}
//             className={`${media.span} cursor-pointer overflow-hidden rounded-lg`}
//             onClick={() => openLightbox(media)}
//           >
//             {media.type === "image" ? (
//               <img
//                 src={media.src}
//                 alt={media.alt}
//                 className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//                 loading="lazy" // Lazy loading for better performance
//               />
//             ) : (
//               <div className="relative h-full w-full">
//                 <img
//                   src={media.poster}
//                   alt="Video thumbnail"
//                   className="h-full w-full object-cover"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="rounded-full bg-black bg-opacity-50 p-3">
//                     <svg
//                       className="h-8 w-8 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Lightbox for viewing media in full size */}
//       {selectedMedia && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
//           onClick={closeLightbox}
//         >
//           <div
//             className="relative max-h-full max-w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-black"
//               onClick={closeLightbox}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {selectedMedia.type === "image" ? (
//               <img
//                 src={selectedMedia.src}
//                 alt={selectedMedia.alt}
//                 className="max-h-[80vh] max-w-full object-contain"
//               />
//             ) : (
//               <video
//                 src={selectedMedia.src}
//                 poster={selectedMedia.poster}
//                 controls
//                 className="max-h-[80vh] max-w-full"
//                 autoPlay
//               >
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
// // import React from "react";

// // const page = () => {
// //   return <MainLayoutWrapper>page</MainLayoutWrapper>;
// // };

// // export default page;

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
