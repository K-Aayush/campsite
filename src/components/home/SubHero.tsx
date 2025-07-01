"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SubHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-tint/30 to-white dark:from-gray-900 dark:to-gray-800 mt-12">
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/1.png"
              alt="Best camping sites in Nepal - Campsite Nepal adventure camping"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-5"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500"
              style={{ lineHeight: "1.2" }}
            >
              Nepal`s Premier Campsite &
              <br />
              Adventure Camping Ground
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover the best camping sites near Kathmandu. Experience jungle
              camping, wild camping, and adventure activities at Nepal`s
              top-rated campsite and camping ground.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/services"
                className="bg-primary-color hover:bg-primary-color/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Book Camping Now
              </Link>
              <Link
                href="/blogs"
                className="bg-white dark:bg-primary-tint text-primary-color border-2 border-primary-color dark:border-green-600 px-8 py-3 rounded-full font-medium hover:bg-primary-tint dark:hover:bg-primary-tint/90 transition-colors"
              >
                Explore Camping Activities
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/5 h-1/5 bg-primary-tint/10 rounded-full blur-4xl transform -translate-x-2/3 -translate-y-2/3" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-primary-tint/5 rounded-full blur-4xl transform translate-x-2/3 translate-y-2/3" />
      </div>
    </div>
  );
};

export default SubHero;
