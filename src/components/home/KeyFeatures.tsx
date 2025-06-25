"use client";

import React from "react";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import HomeContentCard from "./HomeContentCard";

import Link from "next/link";
import { motion } from "framer-motion";

interface WellnessOptionProps {
  title: string;
  image: string;
  startingFrom: number;
  description: string;
  features: string[];
  highlight?: boolean;
}

const WellnessOption: React.FC<WellnessOptionProps> = ({
  title,
  description,
  image,
  features,
  startingFrom,
  highlight = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 border dark:border-gray-700 transition-all duration-300 ${
        highlight
          ? "ring-2 ring-green-300 dark:ring-green-500 shadow-lg"
          : "border-gray-200"
      }`}
    >
      <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300"
          onError={() =>
            console.error(`Failed to load image for ${title}: ${image}`)
          }
        />
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {description}
        </p>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-green-600 dark:text-green-400">
            You will experience:
          </h4>
          {features.length > 0 ? (
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              No features available
            </p>
          )}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/services"
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-colors text-sm"
            >
              Book Camping Now
            </Link>
            <p className="text-green-600 dark:text-green-400 italic text-sm">
              Starting from NPR {startingFrom}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WellnessJourney = () => {
  const options = [
    {
      title: "Jungle Camping Adventure",
      image: "/children-education-two.avif",
      startingFrom: 3500,
      description:
        "Experience wild camping and jungle camping in Nepal's pristine forests",
      features: [
        "Guided jungle camping expeditions",
        "Wildlife spotting and nature walks",
        "Sustainable camping practices",
        "Adventure camping activities",
      ],
    },
    {
      title: "Adventure Camping Near Kathmandu",
      image: "/campingthree.avif",
      startingFrom: 5000,
      description: "Best camping sites near Kathmandu for outdoor adventures",
      features: [
        "Premium camping ground facilities",
        "Group camping and team activities",
        "Adventure sports and outdoor games",
        "Campfire nights and storytelling",
      ],
      highlight: true,
    },
    {
      title: "Wild Camping Experience",
      image: "/wellbeing-image.jpeg",
      startingFrom: 4500,
      description: "Authentic wild camping and nature immersion in Nepal",
      features: [
        "Remote camping locations",
        "Wilderness survival skills",
        "Nature photography sessions",
        "Eco-friendly camping practices",
      ],
    },
  ];

  return (
    <HomeContentCard
      header="Our Camping Experiences"
      description="Discover the best camping sites and adventure activities in Nepal"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {options.map((option, index) => (
          <WellnessOption key={index} {...option} />
        ))}
      </div>
    </HomeContentCard>
  );
};

export default WellnessJourney;
