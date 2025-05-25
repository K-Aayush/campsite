"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";

const ContactPage = () => {
  return (
    <MainLayoutWrapper
      header="Get in Touch"
      description="Have questions or want to learn more about our services? Reach out to us using the form below or through our contact information"
    >
      <div className="  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-tint p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-primary-color" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-500">(123) 456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-tint p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-primary-color" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-500">
                        contact@mayur-wellness.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-tint p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-primary-color" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-gray-500">
                        123 Wellness Street
                        <br />
                        Mindful City, MC 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif mb-6">Connect With Us</h2>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-primary-tint hover:bg-green-100 p-3 rounded-full transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-primary-color" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary-tint hover:bg-green-100 p-3 rounded-full transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-primary-color" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary-tint hover:bg-green-100 p-3 rounded-full transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-primary-color" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary-tint hover:bg-green-100 p-3 rounded-full transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-primary-color" />
                  </a>
                </div>

                <div className="mt-6">
                  <p className="text-gray-500 text-sm">
                    Follow us on social media for wellness tips, upcoming
                    events, and special promotions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>

                <form className="space-y-6 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <div className="space-y-2 ">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name.."
                        className="border-gray-200 focus:border-primary-color focus:ring-primary-color"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-gray-200 focus:border-primary-color focus:ring-primary-color"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      className="border-gray-200 focus:border-primary-color focus:ring-primary-color"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="min-h-[150px] border-gray-200 focus:border-primary-color focus:ring-primary-color-"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary-color hover:brightness-120 hover:bg-primary-color text-white font-medium rounded-full cursor-pointer py-3 !px-8  gap-1"
                  >
                    Send Message
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayoutWrapper>
  );
};

export default ContactPage;

// import React from "react";

// const page = () => {
//   return <div>page</div>;
// };

// export default page;
