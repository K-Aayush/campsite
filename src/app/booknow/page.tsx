"use client";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import Image from "next/image";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

interface BookingHeaderProps {
  title: string;
  description?: string;
}

interface PackageOptionProps {
  name: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}

interface DurationOptionProps {
  days: number;
  isSelected: boolean;
  onClick: () => void;
}

const BookingHeader = ({ title, description }: BookingHeaderProps) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto text-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h1>
      <div className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-500 to-teal-400 mb-8"></div>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </motion.div>
  );
};

const PackageOption = ({
  name,
  price,
  isSelected,
  onClick,
}: PackageOptionProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center rounded-lg p-6 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border ${
        isSelected
          ? "border-blue-500 shadow-lg"
          : "border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:shadow-md"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`text-xl font-semibold mb-2 ${
          isSelected ? "text-blue-500" : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {name}
      </span>
      <span
        className={`font-semibold ${
          isSelected ? "text-blue-500" : "text-gray-600 dark:text-gray-300"
        }`}
      >
        NPR {price}/day
      </span>
      {isSelected && (
        <div className="mt-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          Selected
        </div>
      )}
    </motion.button>
  );
};

const DurationOption = ({ days, isSelected, onClick }: DurationOptionProps) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        onClick={onClick}
        className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 ${
          isSelected
            ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
            : "bg-gray-100 dark:bg-gray-700 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-600"
        }`}
      >
        {days} {days === 1 ? "Day" : "Days"}
      </Button>
    </motion.div>
  );
};

const BookingSection = ({
  title,
  description,
  image,
  packages,
  durations,
  privileges,
}: BookingSectionProps) => {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);

  const basePrice = packages[selectedPackage].price;
  const days = durations[selectedDuration].days;
  const totalPrice = basePrice * days;

  return (
    <motion.div
      className="mb-24 relative"
      id={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 h-96 relative rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <div className="w-16 h-1 bg-white/80 mt-2"></div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.h2
            className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{description}</p>

          {/* Package Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
              Select Your Package
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">
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
            className="mb-8 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h3
              className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {packages[selectedPackage].name} Package Privileges
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {privileges[selectedPackage].map((item, index) => (
                <motion.div
                  key={`${selectedPackage}-${index}`}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 text-blue-500 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-200">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Total Price */}
          <motion.div
            className="p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 dark:text-gray-200">
                Package Price:
              </span>
              <span className="text-gray-700 dark:text-gray-200">
                NPR {basePrice} × {days} days
              </span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-600 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Total Price:
              </span>
              <span className="text-xl font-bold text-blue-500 dark:text-blue-400">
                NPR {totalPrice}
              </span>
            </div>
          </motion.div>

          {/* Book Now Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="mt-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 px-8 rounded-full font-semibold hover:shadow-xl transition-all duration-300">
              Book Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const page = () => {
  const educationData = {
    title: "Educational Adventures",
    description:
      "Nurture young minds with our engaging educational programs that combine learning with fun in a natural environment.",
    image: "/news.jpg",
    packages: [
      { name: "Basic", price: 3500 },
      { name: "Standard", price: 5000 },
      { name: "Premium", price: 7000 },
    ],
    durations: [{ days: 1 }, { days: 3 }, { days: 7 }],
    privileges: [
      [
        "Certified instructors",
        "Small group activities",
        "Basic learning materials",
        "Daily snacks provided",
        "End-of-program certificate",
        "Access to nature trails",
      ],
      [
        "Everything in Basic package",
        "Advanced learning materials",
        "Specialized workshops",
        "Lunch provided daily",
        "Personalized progress report",
        "Take-home project materials",
        "Field trips to nearby natural sites",
        "Guest expert sessions",
      ],
      [
        "Everything in Standard package",
        "Premium learning kit to keep",
        "One-on-one mentoring sessions",
        "All meals provided",
        "Extended program hours",
        "Family participation session",
        "Digital portfolio of achievements",
        "Priority booking for future programs",
        "Exclusive access to evening activities",
      ],
    ],
  };

  const campingData = {
    title: "Camping Experiences",
    description:
      "Immerse yourself in nature with our thoughtfully designed camping programs for all skill levels and preferences.",
    image: "/news.jpg",
    packages: [
      { name: "Explorer", price: 5000 },
      { name: "Adventurer", price: 8000 },
      { name: "Wilderness", price: 10000 },
    ],
    durations: [{ days: 2 }, { days: 4 }, { days: 7 }],
    privileges: [
      [
        "Tent space allocation",
        "Access to communal fire pits",
        "Basic camping guidance",
        "Shared bathroom facilities",
        "Morning guided hike",
        "Evening community activities",
      ],
      [
        "Private tent site with shade",
        "Personal fire pit",
        "Camping gear provided",
        "Improved bathroom access",
        "Daily guided adventures",
        "Meal preparation assistance",
        "Stargazing sessions",
        "Wilderness skills workshop",
      ],
      [
        "Premium campsite location",
        "Full camping equipment kit",
        "Private bathroom facilities",
        "Professional guide availability",
        "Customized adventure itinerary",
        "All meals prepared by chef",
        "Exclusive night trails access",
        "Professional photography session",
        "Wilderness survival training",
      ],
    ],
  };

  const wellnessData = {
    title: "Senior Wellness Retreat",
    description:
      "Rejuvenate mind, body, and spirit in our peaceful sanctuary designed specifically for senior wellness and community.",
    image: "/news.jpg",
    packages: [
      { name: "Serenity", price: 4500 },
      { name: "Harmony", price: 8000 },
      { name: "Tranquility", price: 10000 },
    ],
    durations: [{ days: 3 }, { days: 5 }, { days: 10 }],
    privileges: [
      [
        "Morning yoga sessions",
        "Guided meditation groups",
        "Access to wellness garden",
        "Healthy snacks provided",
        "Community social hours",
        "Evening relaxation programs",
      ],
      [
        "All Serenity privileges",
        "Private wellness consultation",
        "Specialized fitness classes",
        "Nutrition workshops",
        "Therapeutic massage session",
        "Healthy cooking demonstrations",
        "Priority scheduling for activities",
        "Natural medicine information session",
      ],
      [
        "All Harmony privileges",
        "Comprehensive wellness plan",
        "Daily therapeutic treatments",
        "Private meditation instructor",
        "Custom meal plan preparation",
        "Premium accommodation options",
        "Exclusive evening concerts",
        "Take-home wellness kit",
        "Follow-up virtual consultation",
      ],
    ],
  };

  return (
    <MainLayoutWrapper>
      <div className="py-16 relative bg-gradient-to-br from-gray-100 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <BookingHeader
          title="Book Your Experience"
          description="Choose from our carefully curated experiences designed to nurture your well-being, connection with nature, and personal growth."
        />
        <BookingSection {...educationData} />
        <BookingSection {...campingData} />
        <BookingSection {...wellnessData} />
      </div>
    </MainLayoutWrapper>
  );
};

export default page;
