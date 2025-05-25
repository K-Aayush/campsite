import React from "react";

import OurTeams from "../commons/OurTeams";
import HomeContentCard from "./HomeContentCard";

const OurExperts = () => {
  return (
    <HomeContentCard
      header="Our Expert Team"
      description="Meet our highly qualified professionals dedicated to your wellbeing"
      className="py-12 dark:bg-gray-900"
    >
      <OurTeams />
    </HomeContentCard>
  );
};

export default OurExperts;

// import React from "react";
// import EachComponentWrapper from "../commons/EachComponentWrapper";
// import { Facebook, Instagram, Twitter } from "lucide-react";
// import Image from "next/image";

// const experts = [
//   {
//     name: "Bibek Koirala",
//     role: "Product Designer",
//     image: "/experts/expert1.jpg", // Replace with your actual image paths
//   },
//   {
//     name: "Anjana Sharma",
//     role: "Frontend Developer",
//     image: "/experts/expert2.jpg",
//   },
//   {
//     name: "Rajan Poudel",
//     role: "Backend Engineer",
//     image: "/experts/expert3.jpg",
//   },
//   {
//     name: "Sarita Thapa",
//     role: "UX Researcher",
//     image: "/experts/expert4.jpg",
//   },
//   {
//     name: "Kiran Adhikari",
//     role: "Project Manager",
//     image: "/experts/expert5.jpg",
//   },
//   {
//     name: "Priya Karki",
//     role: "Content Strategist",
//     image: "/experts/expert6.jpg",
//   },
// ];

// const OurExperts = () => {
//   return (
//     <EachComponentWrapper
//       header="Our Experts"
//       description="Meet our team of dedicated professionals who are passionate about creating exceptional experiences"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {experts.map((expert, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
//           >
//             <div className="relative h-64 w-full">
//               <Image
//                 // src={expert.image}
//                 src={"/news.jpg"}
//                 alt={expert.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className="transition-transform hover:scale-110"
//               />
//             </div>
//             <div className="p-6">
//               <h3 className="text-xl font-bold text-gray-800">{expert.name}</h3>
//               <p className="text-gray-600 mb-4">{expert.role}</p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-blue-500 hover:text-blue-700">
//                   <Facebook size={20} />
//                 </a>
//                 <a href="#" className="text-pink-500 hover:text-pink-700">
//                   <Instagram size={20} />
//                 </a>
//                 <a href="#" className="text-blue-400 hover:text-blue-600">
//                   <Twitter size={20} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </EachComponentWrapper>
//   );
// };

// export default OurExperts;
