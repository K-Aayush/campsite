"use client";
import React from "react";
import { motion } from "framer-motion";

interface PackageOptionProps {
  name: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}

const PackageOption: React.FC<PackageOptionProps> = ({
  name,
  price,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center rounded-lg p-5 cursor-pointer transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border ${
        isSelected
          ? "border-green-500 shadow-lg"
          : "border-gray-200 dark:border-gray-600 hover:border-green-400 hover:shadow-md"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`text-lg font-semibold mb-2 ${
          isSelected ? "text-green-500" : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {name}
      </span>
      <span
        className={`font-medium ${
          isSelected ? "text-green-500" : "text-gray-600 dark:text-gray-300"
        }`}
      >
        NPR {price}/day
      </span>
      {isSelected && (
        <div className="mt-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          Selected
        </div>
      )}
    </motion.button>
  );
};

export default PackageOption;
