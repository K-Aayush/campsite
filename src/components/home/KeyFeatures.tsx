import React from "react";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import HomeContentCard from "./HomeContentCard";

import Link from "next/link";

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
    <div
      className={`h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 ${
        highlight
          ? "ring-2 ring-green-300 shadow-lg"
          : "border border-green-100"
      }`}
    >
      <div className="relative h-72 w-full bg-green-50">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 bg-white flex-grow">
        <h3 className="text-xl font-medium text-primary-color mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary-color">
            You will experience:
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-primary-color mr-2 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3 justify-between items-center">
            <Link
              href={"/booknow"}
              className="
              bg-primary-color
              hover:bg-primary-color
              cursor-pointer
              text-white p-2
              rounded 
              text-nowrap
              px-8"
            >
              Book Now
            </Link>
            {/* <Button className="bg-primary-color hover:bg-primary-color cursor-pointer px-6">
              Book Now
            </Button> */}
            <p className="text-primary-color italic text-sm">
              Starting from NPR {startingFrom}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WellnessJourney = () => {
  const options = [
    {
      title: "Nature Education",
      image: "/children-education-two.avif",
      startingFrom: 3500,
      description: "Learn through immersive outdoor experiences",
      features: [
        "Guided ecological walks",
        "Wildlife spotting techniques",
        "Sustainable camping practices",
        "Nature journaling sessions",
      ],
    },
    {
      title: "Camping Together",
      image: "/campingthree.avif",
      startingFrom: 5000,
      description: "Reconnect with others around the campfire",
      features: [
        "Group camping adventures",
        "Team-building activities",
        "Shared meal preparation",
        "Evening storytelling circles",
      ],
      highlight: true,
    },
    {
      title: "Social Wellbeing",
      image: "/wellbeing-image.jpeg",
      startingFrom: 4500,
      description: "Build meaningful connections in nature",
      features: [
        "Mindfulness exercises",
        "Community sharing circles",
        "Collaborative outdoor tasks",
        "Reflective group discussions",
      ],
    },
  ];

  return (
    <HomeContentCard
      header="Our Features"
      description="Pathways to personal growth through various program"
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
