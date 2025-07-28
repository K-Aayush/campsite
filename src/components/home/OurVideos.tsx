"use client";

import React from "react";
import HomeContentCard from "./HomeContentCard";
import { motion } from "framer-motion";

const OurVideos = () => {
  return (
    <HomeContentCard
      header="Our Videos"
      description="Discover real stories and the impact we’re making"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Oa_igMMATAs?si=Y6CKeeyDKswaYr1J"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center gap-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-3">
            Our Story
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            See how we are making a difference in communities worldwide. This
            video showcases our journey and the impact we have created together,
            from empowering individuals to fostering sustainable practices.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            Join us in our mission to transform lives and build a better future
            for all.
          </p>
        </motion.div>
      </div>
    </HomeContentCard>
  );
};

export default OurVideos;
