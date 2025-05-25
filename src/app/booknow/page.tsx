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
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">
        {title}
      </h1>
      <div className="w-24 h-1 mx-auto bg-primary-color mb-10"></div>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

const PackageOption = ({
  name,
  price,
  isSelected,
  onClick,
}: PackageOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col cursor-pointer items-center border-2 rounded-lg p-6 transition-all ${
        isSelected
          ? "border-primary-color bg-[#d6ede2] shadow-md"
          : "border-gray-200 hover:border-primary-color hover:bg-[#d6ede2]/20"
      }`}
    >
      <span
        className={`text-xl font-medium mb-2 ${isSelected ? "text-primary-color" : "text-gray-700"}`}
      >
        {name}
      </span>
      <span
        className={`font-serif ${isSelected ? "text-primary-color" : "text-gray-600"}`}
      >
        NPR {price}/day
      </span>

      {isSelected && (
        <div className="mt-3 bg-primary-color text-white text-xs px-3 py-1 rounded-full">
          Selected
        </div>
      )}
    </button>
  );
};

// const PackageOption = ({
//   name,
//   price,
//   isSelected,
//   onClick,
// }: PackageOptionProps) => {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <button
//         onClick={onClick}
//         className={`relative flex flex-col items-center border-2 rounded-xl p-6 transition-all duration-300 ${
//           isSelected
//             ? "border-primary-color bg-gradient-to-b from-[#d6ede2] to-[#ebf7f2] shadow-lg"
//             : "border-gray-200 hover:border-primary-color/50 bg-white hover:bg-[#f5fbf8]"
//         } overflow-hidden`}
//       >
//         {/* Selected indicator ribbon */}
//         {isSelected && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="absolute top-0 right-0 bg-primary-color text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-8 -translate-y-1"
//           >
//             SELECTED
//           </motion.div>
//         )}

//         <motion.div
//           animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
//           transition={{ type: "spring", stiffness: 400 }}
//         >
//           <span
//             className={`text-xl font-medium mb-2 ${
//               isSelected ? "text-primary-color" : "text-gray-800"
//             }`}
//           >
//             {name}
//           </span>
//         </motion.div>

//         <div
//           className={`font-serif text-lg font-semibold ${
//             isSelected ? "text-primary-color" : "text-gray-600"
//           }`}
//         >
//           NPR {price}/day
//         </div>

//         {/* Subtle shine effect on selected */}
//         {isSelected && (
//           <motion.div
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 200, opacity: 0.4 }}
//             transition={{
//               delay: 0.3,
//               duration: 1.5,
//               repeat: Infinity,
//               repeatDelay: 3,
//             }}
//             className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12"
//           />
//         )}
//       </button>
//     </motion.div>
//   );
// };
const DurationOption = ({ days, isSelected, onClick }: DurationOptionProps) => {
  return (
    <Button
      onClick={onClick}
      className={`relative py-2 font-medium cursor-pointer px-6 rounded-md transition-all ${
        isSelected
          ? "bg-primary-color text-white"
          : "bg-[#d6ede2] text-primary-color hover:bg-primary-color/20"
      }`}
    >
      {days} {days === 1 ? "Day" : "Days"}
    </Button>
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

  // Calculate total price without discounts
  const basePrice = packages[selectedPackage].price;
  const days = durations[selectedDuration].days;
  const totalPrice = basePrice * days;

  return (
    <div className="mb-32" id={title}>
      <div className="flex flex-col md:flex-row w-full gap-12 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-96 relative rounded-xl overflow-hidden shadow-lg">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div className="p-6">
              <h2 className="text-3xl font-serif text-white mb-2">{title}</h2>
              <div className="w-16 h-1 bg-white/80 mb-2"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-3xl font-serif mb-4 text-primary-color">
            {title}
          </h2>
          <p className="text-gray-600 mb-8">{description}</p>

          {/* Package Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-primary-color">
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
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PackageOption
                    name={pkg.name}
                    price={pkg.price}
                    isSelected={selectedPackage === index}
                    onClick={() => setSelectedPackage(index)}
                  />
                </motion.div>
              ))}
            </div> */}
          </div>

          {/* Duration Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-primary-color">
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

          {/* <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-primary-color">
              {packages[selectedPackage].name} Package Privileges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {privileges[selectedPackage].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary-color" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Privileges Section - with subtle animation */}
          <motion.div
            layout
            className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h3
              layout
              className="text-xl font-serif mb-4 text-primary-color"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {packages[selectedPackage].name} Package Privileges
            </motion.h3>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {privileges[selectedPackage].map((item, index) => (
                <motion.div
                  key={`${selectedPackage}-${index}`}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: 0.3 + index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    },
                  }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: {
                        delay: 0.4 + index * 0.05,
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      },
                    }}
                  >
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary-color" />
                  </motion.div>
                  <motion.span
                    className="text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.5 + index * 0.05 },
                    }}
                  >
                    {item}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* <motion.div
            layout
            className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-serif mb-4 text-primary-color">
              {packages[selectedPackage].name} Package Privileges
            </h3>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
            >
              <AnimatePresence mode="wait">
                {privileges[selectedPackage].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary-color" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div> */}

          {/* Total Price */}
          <div className="mb-8 p-6 bg-[#d6ede2]/30 rounded-lg border border-[#d6ede2]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Package Price:</span>
              <span className="text-gray-700">
                NPR {basePrice} × {days} days
              </span>
            </div>
            <div className="h-px bg-gray-200 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">Total Price:</span>
              <span className="text-xl font-serif text-primary-color font-medium">
                NPR {totalPrice}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Button className="bg-primary-color cursor-pointer text-white py-3 px-8 rounded-md font-medium hover:opacity-90 transition-opacity shadow-sm">
            Book Now
          </Button>
        </div>
      </div>

      {/* Privileges Section */}
      {/* <div className="mt-12 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-serif mb-8 text-center text-primary-color">
          {packages[selectedPackage].name} Package Privileges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {privileges[selectedPackage].map((item, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary-color" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

const page = () => {
  // Data for each section
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
      <div className="py-16">
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
