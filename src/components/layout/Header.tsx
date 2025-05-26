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
