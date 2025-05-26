"use client";

import React from "react";
import { motion } from "framer-motion";
import HomeContentCard from "./HomeContentCard";

const StayConnected = () => {
  return (
    <HomeContentCard
      header="Stay Inspired, Stay Mindful!"
      description="Get exclusive meditation guides, yoga tips, and wellness insights delivered to your inbox"
      className="py-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 max-w-lg mx-auto"
      >
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email..."
            className="flex-grow bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg border border-gray-200 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </HomeContentCard>
  );
};

export default StayConnected;
