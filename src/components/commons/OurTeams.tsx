import Image from "next/image";
import React from "react";

const teamMembers = [
  {
    name: "Bibek Koirala",
    role: "Product Designer",
    image: "/personafter.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "/personafter.jpg",
  },
  { name: "Michael Chen", role: "UX Researcher", image: "/personafter.jpg" },
];

const OurTeams = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member, index) => (
        <div key={index} className="overflow-hidden rounded-lg space-y-3">
          <div className="relative h-[300px] w-full aspect-square overflow-hidden">
            <Image
              //   src={member.image}
              src={"/person.png"}
              alt={member.name}
              fill
              className="object-cover object-top bg-gray-200 rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-center space-y-1.5">
            <h3 className="text-base font-medium">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurTeams;
