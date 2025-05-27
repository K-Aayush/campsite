"use client";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import React, { useState } from "react";
import BookingHeader from "@/components/booking/BookingHeader";
import BookingDropdown from "@/components/booking/BookingDropdown";
import BookingSection from "@/components/booking/BookingSection";

type ExperienceKey = "education" | "camping" | "wellness";

interface Experience {
  title: string;
  description: string;
  image: string;
  packages: { name: string; price: number }[];
  durations: { days: number }[];
  privileges: string[][];
}

interface ExperienceData {
  education: Experience;
  camping: Experience;
  wellness: Experience;
}

const experienceData: ExperienceData = {
  education: {
    title: "Educational Adventures",
    description:
      "Nurture young minds with our engaging educational programs that combine learning with fun in a natural environment.",
    image: "/children-education-two.avif",
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
  },
  camping: {
    title: "Camping Experiences",
    description:
      "Immerse yourself in nature with our thoughtfully designed camping programs for all skill levels and preferences.",
    image: "/campingthree.avif",
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
  },
  wellness: {
    title: "Senior Wellness Retreat",
    description:
      "Rejuvenate mind, body, and spirit in our peaceful sanctuary designed specifically for senior wellness and community.",
    image: "/wellbeing-image.jpeg",
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
  },
};

const Page = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceKey>("education");

  return (
    <div className="pt-16">
      <MainLayoutWrapper>
        <div className="py-12 relative bg-gradient-to-br from-gray-100 to-teal-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
          <BookingHeader
            title="Book Your Experience"
            description="Choose from our carefully curated experiences designed to nurture your well-being, connection with nature, and personal growth."
          />
          <BookingDropdown
            selectedExperience={selectedExperience}
            onSelect={setSelectedExperience}
          />
          <BookingSection {...experienceData[selectedExperience]} />
        </div>
      </MainLayoutWrapper>
    </div>
  );
};

export default Page;
