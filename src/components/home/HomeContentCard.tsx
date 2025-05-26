"use client";

import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface ComponentWrapperProps {
  header?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const HomeContentCard: FC<ComponentWrapperProps> = ({
  header,
  description,
  className = "",
  children,
}) => {
  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}>
      {(header || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto mb-12 text-center"
        >
          {header && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {header}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>
      )}
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default HomeContentCard;
