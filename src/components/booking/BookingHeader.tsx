"use client";
import { motion } from "framer-motion";
import React from "react";

interface BookingHeaderProps {
  title: string;
  description?: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto text-center mb-12 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-600 to-teal-400 mb-6"></div>
      {description && (
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default BookingHeader;
