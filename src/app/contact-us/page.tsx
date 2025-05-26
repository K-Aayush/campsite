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
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="pt-16">
      <MainLayoutWrapper
        header="Get in Touch"
        description="Have questions or want to learn more? Reach out using the form below or our contact details."
      >
        <div className="relative py-16 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-green-200/15 dark:bg-green-500/20 rounded-full blur-4xl transform -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-200/8 dark:bg-green-800/10 rounded-full blur-4xl transform translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar: Contact Info and Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1 lg:sticky lg:top-4 flex flex-col gap-6"
              >
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-full mr-4">
                          <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                            Phone
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            (123) 456-7890
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-full mr-4">
                          <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                            Email
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            contact@mayurwellness.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-full mr-4">
                          <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                            Address
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            123 Forest Path
                            <br />
                            Tranquil Valley, TV 45678
                            <br />
                            United States
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-6">
                      Connect With Us
                    </h2>
                    <div className="flex gap-3">
                      {[
                        { icon: Facebook, href: "#", label: "Facebook" },
                        { icon: Instagram, href: "#", label: "Instagram" },
                        { icon: Twitter, href: "#", label: "Twitter" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                      ].map(({ icon: Icon, href, label }, index) => (
                        <a
                          key={index}
                          href={href}
                          className="bg-green-50 dark:bg-gray-800 p-3 rounded-full text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                          aria-label={label}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                    <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                      Follow us for wellness tips, events, and promotions.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold font-['Roboto'] text-gray-800 dark:text-gray-100 mb-6">
                      Send Us a Message
                    </h2>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-800 dark:text-gray-100"
                          >
                            Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                            aria-required="true"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-800 dark:text-gray-100"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium text-gray-800 dark:text-gray-100"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="What’s this about?"
                          className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-800 dark:text-gray-100"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Your message..."
                          className="min-h-[150px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                          aria-required="true"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-green-600 dark:bg-green-800 text-white hover:bg-green-700 dark:hover:bg-green-700 font-medium rounded-lg py-3 px-8 flex items-center gap-2 transition-all duration-300"
                      >
                        Send Message
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </MainLayoutWrapper>
    </div>
  );
};

export default ContactPage;
