"use client";

import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface AboutContentCardProps {
  children: ReactNode;
  header?: string;
  description?: string;
}

const AboutContentCard: FC<AboutContentCardProps> = ({
  children,
  header,
  description,
}) => {
  return (
    <section className="py-16 mb-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-1/5 h-1/5 bg-green-200/10 dark:bg-green-500/10 rounded-full blur-4xl transform -translate-x-2/3 -translate-y-2/3" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-green-200/5 dark:bg-green-500/5 rounded-full blur-4xl transform translate-x-2/3 translate-y-2/3" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-12 relative z-10"
      >
        {header && (
          <h1 className="text-4xl md:text-5xl font-['Roboto'] font-semibold text-gray-800 dark:text-gray-100 mb-6">
            {header}
          </h1>
        )}
        <div className="w-24 h-1 mx-auto bg-green-600 dark:bg-green-400 mb-10" />
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
};

export default AboutContentCard;
