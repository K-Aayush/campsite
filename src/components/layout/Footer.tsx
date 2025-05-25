"use client";
export type SubmenuItem = {
  label: string;
  href: string;
};

export type HeaderItem = {
  label: string;
  href: string;
  submenu?: SubmenuItem[];
};

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blogs", href: "/blogs" },
];

import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center text-black dark:text-white font-semibold gap-4"
    >
      <Image
        src="/last-logo.png"
        alt="logo"
        width={50}
        height={50}
        // style={{ width: "auto", height: "auto" }}
        quality={100}
      />
      <p className="text-sm md:text-2xl "> Mayur Wellbeing</p>
    </Link>
  );
};

import React, { FC } from "react";

import { Facebook, Instagram, Twitter } from "lucide-react";

import { usePathname } from "next/navigation";

const Footer: FC = () => {
  const pathName = usePathname();
  if (
    pathName.toString().includes("auth") ||
    pathName.toString().includes("profile")
  )
    return null;

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  // Footer navigation sections data
  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Mobile", href: "#" },
        { label: "Blog", href: "#" },
        { label: "How we work?", href: "#" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Help/FAQ", href: "#" },
        { label: "Press", href: "#" },
        { label: "Affiliates", href: "#" },
        { label: "Hotel owners", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
    {
      title: "More",
      links: headerData.map((item) => ({ label: item.label, href: item.href })),
    },
  ];

  const bottomLinks = [
    { label: "Privacy policy", href: "#" },
    { label: "Terms & conditions", href: "#" },
  ];

  return (
    <footer className="pt-16  bg-gray-100 ">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:gap-20 md:gap-6 sm:gap-12 gap-6 pb-16">
          {/* Logo and social media section */}
          <div className="col-span-2">
            <Logo />
            <p className="text-base font-medium text-grey dark:text-white/50 mt-5 mb-16 max-w-70%">
              Open an account in minutes, get full financial control for much
              longer.
            </p>
            <div className="flex gap-6 items-center">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="group bg-primary-tint  hover:bg-primary-color rounded-full shadow-xl p-3"
                >
                  <Icon
                    size={16}
                    className="group-hover:text-white text-black"
                  />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-black dark:text-white mb-9 font-semibold text-xl">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="pb-5">
                    <Link
                      href={link.href}
                      className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-grey/15 dark:border-white/15 py-10 flex justify-between items-center">
          <p className="text-sm text-black/70 dark:text-white/70">
            @2025 - Mayur Wellbeing. All Rights Reserved by{" "}
            <Link href="https://nepatronix.org" className="hover:text-primary">
              Nepatronix.org
            </Link>
          </p>

          <div className="">
            {bottomLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-sm text-black/70 dark:text-white/70 px-5 hover:text-primary dark:hover:text-primary ${
                  index === 0
                    ? "border-r border-grey/15 dark:border-white/15"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
