"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DurationOptionProps {
  days: number;
  isSelected: boolean;
  onClick: () => void;
}

const DurationOption: React.FC<DurationOptionProps> = ({
  days,
  isSelected,
  onClick,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        onClick={onClick}
        className={`py-2 px-5 rounded-full font-medium transition-all duration-300 ${
          isSelected
            ? "bg-gradient-to-r from-blue-600 to-teal-400 text-white"
            : "bg-gray-100 dark:bg-gray-700 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-600"
        }`}
      >
        {days} {days === 1 ? "Day" : "Days"}
      </Button>
    </motion.div>
  );
};

export default DurationOption;
