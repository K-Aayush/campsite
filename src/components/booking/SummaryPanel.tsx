"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SummaryPanelProps {
  selectedPackage: { name: string; price: number };
  selectedDuration: number;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  selectedPackage,
  selectedDuration,
}) => {
  const totalPrice = selectedPackage.price * selectedDuration;

  return (
    <motion.div
      className="fixed bottom-4 right-4 lg:sticky lg:top-20 lg:right-8 w-full max-w-xs p-6 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-4">
        Your Selection
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-200">Package:</span>
          <span className="text-gray-700 dark:text-gray-200">
            {selectedPackage.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-200">Price:</span>
          <span className="text-gray-700 dark:text-gray-200">
            NPR {selectedPackage.price}/day
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-200">Duration:</span>
          <span className="text-gray-700 dark:text-gray-200">
            {selectedDuration} {selectedDuration === 1 ? "Day" : "Days"}
          </span>
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-600 my-3"></div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Total:
          </span>
          <span className="text-lg font-bold text-blue-500 dark:text-blue-400">
            NPR {totalPrice}
          </span>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4"
      >
        <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-400 text-white py-2 rounded-full font-semibold hover:shadow-xl">
          Book Now
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SummaryPanel;
