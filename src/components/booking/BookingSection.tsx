"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import PackageOption from "./PackageOption";
import DurationOption from "./DurationOption";
import SummaryPanel from "./SummaryPanel";

interface Package {
  name: string;
  price: number;
}

interface Duration {
  days: number;
}

interface BookingSectionProps {
  title: string;
  description: string;
  image: string;
  packages: Package[];
  durations: Duration[];
  privileges: string[][];
}

const BookingSection: React.FC<BookingSectionProps> = ({
  title,
  description,
  image,
  packages,
  durations,
  privileges,
}) => {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);

  return (
    <motion.div
      className="mb-24 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 h-80 md:h-96 relative rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {title}
              </h2>
              <div className="w-16 h-1 bg-white/80 mt-2"></div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
            {description}
          </p>

          {/* Package Selection */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
              Select Your Package
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {packages.map((pkg, index) => (
                <PackageOption
                  key={index}
                  name={pkg.name}
                  price={pkg.price}
                  isSelected={selectedPackage === index}
                  onClick={() => setSelectedPackage(index)}
                />
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
              Select Duration
            </h3>
            <div className="flex flex-wrap gap-3">
              {durations.map((duration, index) => (
                <DurationOption
                  key={index}
                  days={duration.days}
                  isSelected={selectedDuration === index}
                  onClick={() => setSelectedDuration(index)}
                />
              ))}
            </div>
          </div>

          {/* Privileges Section */}
          <motion.div
            className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h3
              className="text-lg md:text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {packages[selectedPackage].name} Package Privileges
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {privileges[selectedPackage].map((item, index) => (
                <motion.div
                  key={`${selectedPackage}-${index}`}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-1 text-blue-500 dark:text-blue-400" />
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-200">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky Summary Panel */}
      <SummaryPanel
        selectedPackage={packages[selectedPackage]}
        selectedDuration={durations[selectedDuration].days}
      />
    </motion.div>
  );
};

export default BookingSection;
