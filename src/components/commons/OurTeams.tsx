"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Bibek Koirala",
    role: "Wellness Coach",
    image: "/person.png",
  },
  {
    name: "Sarah Johnson",
    role: "Yoga Instructor",
    image: "/person.png",
  },
  {
    name: "Michael Chen",
    role: "Mindfulness Expert",
    image: "/person.png",
  },
];

const OurTeams = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4 text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {member.role}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OurTeams;
