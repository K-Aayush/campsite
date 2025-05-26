"use client";
import { motion } from "framer-motion";
import React from "react";

interface BookingDropdownProps {
  selectedExperience: string;
  onSelect: (value: string) => void;
}

const experiences = [
  { value: "education", label: "Educational Adventures" },
  { value: "camping", label: "Camping Experiences" },
  { value: "wellness", label: "Senior Wellness Retreat" },
];

const BookingDropdown: React.FC<BookingDropdownProps> = ({
  selectedExperience,
  onSelect,
}) => {
  return (
    <motion.div
      className="relative max-w-sm mx-auto mb-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <select
        value={selectedExperience}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none w-full p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {experiences.map((exp) => (
          <option key={exp.value} value={exp.value}>
            {exp.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default BookingDropdown;
