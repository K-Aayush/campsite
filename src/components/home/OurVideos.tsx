// "use client";
// import React, { useState, useEffect, lazy, Suspense } from "react";
// import { Play, ChevronLeft, ChevronRight } from "lucide-react";
// import HomeContentCard from "./HomeContentCard";

// // Lazy loaded video player component
// const VideoPlayer = lazy(() =>
//   Promise.resolve({
//     default: ({ src }) => (
//       <div className="relative w-full h-full overflow-hidden rounded-lg bg-black">
//         <video
//           className="w-full h-full object-cover"
//           src={src}
//           controls
//           preload="metadata"
//         />
//       </div>
//     ),
//   })
// );

// const OurVideos = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Sample video data - replace with your actual data
//   const videos = [
//     {
//       id: 1,
//       title: "Our Mission",
//       duration: "2:34",
//       thumbnail: "/api/placeholder/640/360",
//       src: "gallery-video-one-mp4",
//     },
//     {
//       id: 2,
//       title: "Behind the Scenes",
//       duration: "3:15",
//       thumbnail: "/api/placeholder/640/360",
//       src: "gallery-video-one-mp4",
//     },
//     {
//       id: 3,
//       title: "Customer Stories",
//       duration: "4:42",
//       thumbnail: "/api/placeholder/640/360",
//       src: "gallery-video-one-mp4",
//     },
//   ];

//   const nextVideo = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
//     setIsPlaying(false);
//   };

//   const prevVideo = () => {
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
//     );
//     setIsPlaying(false);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <HomeContentCard
//       header="Our Videos"
//       description="Real stories, real impact"
//     >
//       <div className="w-full">
//         <div className="relative w-full aspect-video mb-6 bg-gray-900 rounded-lg overflow-hidden shadow-xl">
//           {isPlaying ? (
//             <Suspense
//               fallback={
//                 <div className="w-full h-full flex items-center justify-center bg-black">
//                   <div className="text-white">Loading video...</div>
//                 </div>
//               }
//             >
//               <VideoPlayer src={videos[activeIndex].src} />
//             </Suspense>
//           ) : (
//             <div className="relative w-full h-full">
//               <img
//                 src={videos[activeIndex].thumbnail}
//                 alt={videos[activeIndex].title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <button
//                   onClick={togglePlay}
//                   className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-2 border-white hover:bg-opacity-30 transition-all duration-300"
//                 >
//                   <Play size={32} color="white" fill="white" />
//                 </button>
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
//                 <h3 className="text-xl font-bold text-white">
//                   {videos[activeIndex].title}
//                 </h3>
//                 <p className="text-gray-300">{videos[activeIndex].duration}</p>
//               </div>
//             </div>
//           )}

//           <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
//             <button
//               onClick={prevVideo}
//               className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all duration-300"
//             >
//               <ChevronLeft size={24} color="white" />
//             </button>
//           </div>

//           <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
//             <button
//               onClick={nextVideo}
//               className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all duration-300"
//             >
//               <ChevronRight size={24} color="white" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           {videos.map((video, index) => (
//             <div
//               key={video.id}
//               onClick={() => {
//                 setActiveIndex(index);
//                 setIsPlaying(false);
//               }}
//               className={`cursor-pointer relative rounded-md overflow-hidden transition-all duration-300 ${
//                 activeIndex === index
//                   ? "ring-2 ring-offset-2"
//                   : "opacity-70 hover:opacity-100"
//               }`}
//               style={{
//                 ringColor: activeIndex === index ? "#0c422a" : "transparent",
//               }}
//             >
//               <div className="relative aspect-video">
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
//                   {activeIndex !== index && <Play size={24} color="white" />}
//                 </div>
//               </div>
//               <div className="p-2 bg-gray-900">
//                 <h4 className="text-sm font-medium text-white truncate">
//                   {video.title}
//                 </h4>
//                 <p className="text-xs text-gray-400">{video.duration}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </HomeContentCard>
//   );
// };

// export default OurVideos;

import React from "react";
import HomeContentCard from "./HomeContentCard";

const OurVideos = () => {
  return (
    <HomeContentCard
      header="Our Videos"
      description="Real stories, real impact"
    >
      {/* <div className="grid grid-cols-2">
        <div>
          <iframe />
        </div>
        <div>
          <h1>This is our videos</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
            molestiae blanditiis asperiores, voluptatibus facere illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, aliquid?
          </p>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" w-full min-h-[400px] ">
          <iframe
            className="w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            allowFullScreen
            style={{ filter: "grayscale(100%)" }}
          />
        </div>
        <div className="flex flex-col  justify-start gap-2">
          <h2 className="text-2xl font-bold text-primary-color mb-2">
            Our Story
          </h2>
          <p className="mb-2 text-gray-700">
            See how we are making a difference in communities worldwide. This
            video showcases our journey and the impact we have created together.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            adipisci necessitatibus deserunt quam laborum exercitationem magnam
            natus neque praesentium accusamus!
          </p>
          <p className="text-gray-700">
            Join us in our mission to transform lives and build a better future
            for all.
          </p>
        </div>
      </div>
    </HomeContentCard>
  );
};

export default OurVideos;
