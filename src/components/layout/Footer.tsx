"use client";

import React, { FC, useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { headerData } from "./Header";
import Logo from "./Logo";

interface ContactSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const Footer: FC = () => {
  const pathName = usePathname();
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

  if (
    pathName.toString().includes("auth") ||
    pathName.toString().includes("profile")
  ) {
    return null;
  }

  const socialLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      href: contactInfo.socialMedia.facebook,
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: contactInfo.socialMedia.instagram,
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: contactInfo.socialMedia.twitter,
    },
  ].filter((link) => link.href); // Only include links with valid URLs

  const footerSections = [
    // {
    //   title: "Information",
    //   links: [
    //     { label: "Help/FAQ", href: "#" },
    //     { label: "Press", href: "#" },
    //     { label: "Partners", href: "#" },
    //   ],
    // },
    {
      title: "Explore",
      links: headerData.map((item) => ({
        label: item.label,
        href: item.href,
      })),
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 pb-10 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-1/5 h-1/5 bg-green-200/10 dark:bg-green-500/10 rounded-full blur-4xl transform -translate-x-2/3 -translate-y-2/3" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-green-200/5 dark:bg-green-500/5 rounded-full blur-4xl transform translate-x-2/3 translate-y-2/3" />
      </div>
      <div className="container mx-auto px-4 lg:max-w-screen-xl relative z-10">
        <div className="flex flex-col sm:flex-row  justify-between gap-8 lg:gap-16 pb-12">
          {/* Left Column: Mayur Wellness Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <Logo />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 mb-4 max-w-md">
              {contactInfo.siteDescription}
            </p>

            {/* Contact Information */}
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> {contactInfo.contactEmail}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Phone:</strong> {contactInfo.contactPhone}
              </p>
              {contactInfo.address && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Address:</strong> {contactInfo.address}
                </p>
              )}
            </div>

            <div className="flex gap-3 items-center">
              {socialLinks.map(({ label, icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="p-2 rounded-full bg-green-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Information and Explore */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex  sm:flex-row sm:gap-12 lg:gap-16"
          >
            {footerSections.map((section, index) => (
              <div key={index} className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 py-6 flex justify-center text-center items-center gap-4">
          <p className="text-sm flex gap-1 text-center text-gray-600 dark:text-gray-400">
            © 2025 {contactInfo.siteName}. All Rights Reserved by
            <Link
              href="https://nepatronix.org"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Nepatronix.org
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
