"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import { motion } from "framer-motion";
import { showToast } from "@/utils/Toast";

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
}

interface ContactSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: SocialMedia;
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactSettings>({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  });

  useEffect(() => {
    // Fetch contact settings for display
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (response.ok) {
          const data = await response.json();
          setContactInfo(data);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
        // Keep default values if fetch fails
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      showToast("error", { title: "Please fill in all required fields" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", {
          title: "Message sent successfully!",
          description: "We'll get back to you within 24-48 hours.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        showToast("error", {
          title: data.error || "Failed to send message",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showToast("error", {
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <MainLayoutWrapper
        header="Get in Touch"
        description={contactInfo.siteDescription}
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
                            {contactInfo.contactPhone}
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
                            {contactInfo.contactEmail}
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
                            {contactInfo.address}
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
                        {
                          icon: Facebook,
                          href: contactInfo.socialMedia.facebook,
                          label: "Facebook",
                        },
                        {
                          icon: Instagram,
                          href: contactInfo.socialMedia.instagram,
                          label: "Instagram",
                        },
                        {
                          icon: Twitter,
                          href: contactInfo.socialMedia.twitter,
                          label: "Twitter",
                        },
                      ].map(
                        ({ icon: Icon, href, label }, index) =>
                          href && (
                            <a
                              key={index}
                              href={href}
                              className="bg-green-50 dark:bg-gray-800 p-3 rounded-full text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                              aria-label={label}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Icon className="h-5 w-5" />
                            </a>
                          )
                      )}
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-800 dark:text-gray-100"
                          >
                            Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                            aria-required="true"
                            disabled={loading}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-800 dark:text-gray-100"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                            aria-required="true"
                            disabled={loading}
                            required
                          />
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
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What's this about?"
                            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-800 dark:text-gray-100"
                        >
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message..."
                          className="min-h-[150px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400 rounded-lg"
                          aria-required="true"
                          disabled={loading}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 dark:bg-green-800 text-white hover:bg-green-700 dark:hover:bg-green-700 font-medium rounded-lg py-3 px-8 flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending..." : "Send Message"}
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
