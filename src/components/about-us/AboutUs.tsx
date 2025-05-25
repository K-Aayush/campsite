import React from "react";
import AboutContentCard from "./AboutContentCard";
import Image from "next/image";

import {
  Wifi,
  // Shower,
  Flame,
  Navigation,
  Leaf,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MapWrapper from "./MapWrapper";
import OurTeams from "../commons/OurTeams";
import FaqQuestionAnswer from "../faqs/FaqQuestionAnswers";

const facilities = [
  {
    name: "Modern Eco-Friendly Restrooms",
    icon: <CheckCircle className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Hot Showers with Natural Products",
    icon: <CheckCircle className="h-5 w-5 text-primary-color" />,
    // icon: <Shower className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "High-Speed Wi-Fi Throughout",
    icon: <Wifi className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Fire Pits with Seating Areas",
    icon: <Flame className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Organic Gardens & Harvesting",
    icon: <Leaf className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Marked Hiking & Meditation Trails",
    icon: <Navigation className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Yoga Pavilion",
    icon: <CheckCircle className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Community Kitchen",
    icon: <CheckCircle className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "Meditation Spaces",
    icon: <CheckCircle className="h-5 w-5 text-primary-color" />,
  },
  {
    name: "On-site Natural Spring",
    icon: <CheckCircle className="h-5 w-5 text-primary-color" />,
  },
];

const AboutUs = () => {
  return (
    <div className="  mx-auto py-16">
      <AboutContentCard header="Our Story">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-serif mb-6">
              A Haven for Mindful Living
            </h2>
            <p className="text-gray-600 mb-4">
              Mayur Wellness Camp was born from a simple yet profound vision: to
              create a sanctuary where people can disconnect from the noise of
              modern life and reconnect with themselves, others, and nature.
            </p>
            <p className="text-gray-600 mb-4">
              Founded in 2015, our campsite sits on 25 acres of pristine
              woodland that has been carefully preserved and enhanced to support
              both wellness and environmental sustainability.
            </p>
            <p className="text-gray-600">
              Our mission is to provide transformative experiences that nurture
              mind, body, and soul through a harmonious blend of nature
              immersion, mindfulness practices, and community connection.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-[400px]">
            <Image
              src="/news.jpg"
              alt="Peaceful campsite setting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </AboutContentCard>

      <AboutContentCard
        header="Our Location"
        description="Situated in the heart of nature yet easily accessible, our
        wellness sanctuary provides the perfect escape from urban life."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-gray-200 rounded-xl overflow-hidden h-[400px] relative">
            <MapWrapper />
          </div>
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-serif mb-6">How to Find Us</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Address</h4>
                    <p className="text-gray-600">
                      Mayur Wellness Camp
                      <br />
                      123 Forest Path Road
                      <br />
                      Tranquil Valley, TV 12345
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">By Car</h4>
                    <p className="text-gray-600">
                      2 hours from Downtown Metropolitan Area.
                      <br />
                      Ample parking available on-site.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Public Transport</h4>
                    <p className="text-gray-600">
                      Take the Valley Line train to Greenwood Station, then our
                      complimentary shuttle service (runs every hour from
                      9am-6pm).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AboutContentCard>

      <AboutContentCard
        header="Our Facilities"
        description="We have thoughtfully designed our campsite to provide comfort
        while maintaining harmony with nature."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {facilities.map((facility, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 mt-1">{facility.icon}</div>
              <div>
                <h3 className="font-medium">{facility.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-xl overflow-hidden h-52">
            <Image
              src="/news.jpg"
              alt="Eco-friendly facilities"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden h-52">
            <Image
              src="/news.jpg"
              alt="Organic garden"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden h-52">
            <Image
              src="/news.jpg"
              alt="Meditation space"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </AboutContentCard>

      <AboutContentCard
        header="Our Team"
        description="Meet the passionate individuals who create transformative
        experiences at Mayur Wellness Camp."
      >
        <OurTeams />
      </AboutContentCard>

      <AboutContentCard
        header="Frequently Asked Questions"
        description="Meet the passionate individuals who create transformative
        experiences at Mayur Wellness Camp."
      >
        <FaqQuestionAnswer />
      </AboutContentCard>
    </div>
  );
};

export default AboutUs;
