import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Mayur Wellness",
  description: "Learn more about Mayur Wellness and our mission.",
};

import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import AboutUs from "@/components/about-us/AboutUs";

const page = async () => {
  return (
    <MainLayoutWrapper>
      <AboutUs />
    </MainLayoutWrapper>
  );
};

export default page;

{
  /* Our Story Section */
}
{
  /* <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">
              Our Story
            </h1>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-10"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6">
                A Haven for Mindful Living
              </h2>
              <p className="text-gray-600 mb-4">
                Mayur Wellness Camp was born from a simple yet profound vision:
                to create a sanctuary where people can disconnect from the noise
                of modern life and reconnect with themselves, others, and
                nature.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2015, our campsite sits on 25 acres of pristine
                woodland that has been carefully preserved and enhanced to
                support both wellness and environmental sustainability.
              </p>
              <p className="text-gray-600">
                Our mission is to provide transformative experiences that
                nurture mind, body, and soul through a harmonious blend of
                nature immersion, mindfulness practices, and community
                connection.
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
        </div> */
}

{
  /* <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-6">
              Our Location
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-10"></div>
            <p className="text-gray-600">
              Situated in the heart of nature yet easily accessible, our
              wellness sanctuary provides the perfect escape from urban life.
            </p>
          </div>

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
                        Take the Valley Line train to Greenwood Station, then
                        our complimentary shuttle service (runs every hour from
                        9am-6pm).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div> */
}
{
  /* <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-6">
              Our Facilities
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-10"></div>
            <p className="text-gray-600">
              We have thoughtfully designed our campsite to provide comfort
              while maintaining harmony with nature.
            </p>
          </div>

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
        </div> */
}
{
  /* <div>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-6">Our Team</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-10"></div>
            <p className="text-gray-600">
              Meet the passionate individuals who create transformative
              experiences at Mayur Wellness Camp.
            </p>
          </div> */
}

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-lg"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-green-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {member.expertise}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */
}
{
  /* <OurTeams />
        </div> */
}
