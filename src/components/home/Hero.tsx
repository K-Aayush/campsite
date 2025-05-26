"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-tint/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 pb-6">
              Where Adventure, Nature and Well-being Come Together
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Experience the perfect blend of outdoor adventure, natural beauty,
              and personal growth at Hash One Campsite.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/book-now"
                className="bg-primary-color hover:bg-primary-color/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Book Now
              </Link>
              <Link
                href="/activities"
                className="bg-white dark:bg-primary-tint text-primary-color border-2 border-primary-color dark:border-green-600 px-8 py-3 rounded-full font-medium hover:bg-primary-tint dark:hover:bg-primary-tint/90 transition-colors"
              >
                Explore Activities
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/campingone.jpg"
              alt="Camping Experience"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-primary-tint/15 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary-tint/8 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
      </div>
    </div>
  );
}
