"use client";

import React from "react";
import AboutContentCard from "./AboutContentCard";
import Image from "next/image";
import { Wifi, Flame, Navigation, Leaf, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MapWrapper from "./MapWrapper";
import OurTeams from "../commons/OurTeams";
import FaqQuestionAnswer from "../faqs/FaqQuestionAnswers";
import { motion } from "framer-motion";

const facilities = [
  {
    name: "Modern Eco Amenities",
    icon: (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ),
  },
  {
    name: "Hot Showers with Natural Products",
    icon: (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ),
  },
  {
    name: "High-Speed Wi-Fi Throughout",
    icon: <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  {
    name: "Fire Pits with Seating Areas",
    icon: <Flame className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  {
    name: "Organic Gardens & Harvesting",
    icon: <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  {
    name: "Marked Hiking & Meditation Trails",
    icon: <Navigation className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  {
    name: "Yoga Pavilion",
    icon: (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ),
  },
  {
    name: "Community Kitchen",
    icon: (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ),
  },
  {
    name: "Meditation Spaces",
    icon: (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ),
  },
  {
    name: "On-site Natural Spring",
    icon: (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ),
  },
];

const AboutUs = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/15 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-500/8 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative z-10">
        <AboutContentCard header="Our Story">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <h2 className="text-3xl font-semibold font-['Roboto'] text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 mb-6">
                A Haven for Mindful Living
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">
                Mayur Wellness Camp was born from a vision to create a sanctuary
                where people can escape modern distractions and reconnect with
                nature, community, and mindfulness.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">
                Founded in 1995, our 25-acre campsite is a carefully curated
                space designed for wellness and rejuvenation.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Our mission is to foster transformative experiences that nurture
                mind, body, and soul through nature immersion and mindfulness
                practices.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden h-[400px] shadow-md">
              <Image
                src="/campsite.jpg"
                alt="Peaceful campsite setting"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                title="Mayur Wellness Camp"
              />
            </div>
          </motion.div>
        </AboutContentCard>

        <AboutContentCard
          header="Our Location"
          description="Nestled in nature yet easily accessible, our wellness sanctuary offers a serene escape."
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            <div className="lg:col-span-2 rounded-lg overflow-hidden h-[400px] relative shadow-md border border-gray-200 dark:border-gray-700">
              <MapWrapper />
            </div>
            <div>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold font-['Roboto'] text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 mb-6">
                    How to Reach Us
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                        Address
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Mayur Wellness Camp
                        <br />
                        123 Forest Path
                        <br />
                        Tranquil Valley, TV 45678
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                        By Car
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        2 hours from Downtown Metro Area.
                        <br />
                        Ample parking available.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                        Public Transport
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Take the Valley Line train to Valley Station, then our
                        free shuttle (9 AM–6 PM hourly).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AboutContentCard>

        <AboutContentCard
          header="Our Amenities"
          description="Crafted for comfort and sustainability, our amenities elevate your wellness journey."
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mr-4">{facility.icon}</div>
                <h3 className="font-medium text-gray-800 dark:text-gray-100 text-base">
                  {facility.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { src: "/eco-friendly.jpg", alt: "Eco-friendly facilities" },
              { src: "/garden.jpg", alt: "Organic garden" },
              { src: "/meditation.jpg", alt: "Meditation space" },
            ].map((image, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden h-[200px] shadow-md"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  title={image.alt}
                />
              </div>
            ))}
          </motion.div>
        </AboutContentCard>

        <AboutContentCard
          header="Our Team"
          description="Meet the dedicated individuals crafting transformative wellness experiences."
        >
          <OurTeams />
        </AboutContentCard>

        <AboutContentCard
          header="Frequently Asked Questions"
          description="Answers to your questions about our programs, amenities, and more."
        >
          <FaqQuestionAnswer />
        </AboutContentCard>
      </div>
    </div>
  );
};

export default AboutUs;
