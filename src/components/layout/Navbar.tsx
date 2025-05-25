"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, User, Bell, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";

const navItems = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About Us", href: "/about-us" },
  { id: 3, name: "Contact us", href: "/contact-us" },
  { id: 4, name: "Blogs", href: "/blogs" },
  { id: 5, name: "Book Now", href: "/booknow" },
];

export default function Navbar() {
  const pathName = usePathname();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";
  console.log("isAuthenticated", status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    const currentItem = navItems.find((item) => item.href === pathName);
    return currentItem ? currentItem.id : 1;
  });

  useEffect(() => {
    const currentItem = navItems.find((item) => item.href === pathName);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathName]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (
    pathName.toString().includes("auth") ||
    pathName.toString().includes("profile")
  ) {
    return null;
  }

  return (
    <nav
      className={`w-full  top-0 px-3 sm:px-5 md:px-7 lg:px-9 z-50 transition-all duration-300 py-5`}
    >
      <div className="  mx-auto flex items-center justify-between">
        <Link
          href={"/"}
          className="flex  items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <p className="w-10 relative h-10 rounded-lg flex items-center justify-center text-white">
            <Image src={"/last-logo.png"} alt="real" fill />
          </p>

          <div>
            <h1 className="text-xl  text-primary-color font-bold bg-clip-text">
              Mayur
            </h1>
            <p className="text-xs text-gray-500">Wellbeing & Mindfulness</p>
          </div>
        </Link>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center cursor-pointer justify-center p-2 rounded-lg bg-primary-tint text-primary-color shadow-md  hover:shadow-lg transition-all duration-300 focus:outline-none   focus:ring-opacity-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} strokeWidth={2.5} className="text-primary-color" />
            ) : (
              <Menu
                size={24}
                strokeWidth={2.5}
                className="text-primary-color"
              />
            )}
          </button>
        </div>

        <div className="hidden   lg:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3 py-2 font-medium transition-all duration-300 ease-in-out
                  ${
                    activeItem === item.id
                      ? "text-primary-color font-bold"
                      : "text-gray-600 hover:text-primary-color font-bold"
                  }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full transition-transform duration-300 ease-in-out
                    ${
                      activeItem === item.id
                        ? "scale-x-100 bg-primary-ctext-primary-color"
                        : "scale-x-0 origin-left hover:scale-x-100 bg-primary-ctext-primary-color"
                    }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="hidden lg:flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-primary-color px-4 py-3 rounded-lg hover:bg-green-100 cursor-pointer transition-all duration-200">
              <Bell size={18} />
            </button>
            {/* <div className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-primary-tint cursor-pointer"> */}
            <Link
              href={"/profile"}
              className=" bg-primary-ctext-primary-color  text-primary-color hover:bg-primary-tint px-4 py-3 rounded-lg flex items-center justify-center"
            >
              <User size={16} />
            </Link>
            {/* <span className="font-medium">{displayName}</span> */}
            {/* </div> */}
            <button
              onClick={handleSignOut}
              className="flex cursor-pointer items-center gap-2 bg-primary-color text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <LogOut size={16} />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={"/auth/login"}
              className="text-primary-color block bg-white border-primary-color border-2 py-1.5 px-7 rounded-full font-medium hover:text-green-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href={"/auth/register"}
              className="bg-primary-color font-medium py-2 px-7 rounded-full text-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`lg:hidden   overflow-hidden transition-all duration-300 mt-3 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-2 my-4  rounded-lg shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveItem(item.id);
                setIsMenuOpen(false);
              }}
              className={`relative transition-all duration-300 py-3
                ${
                  activeItem === item.id
                    ? "text-primary-color font-medium pl-5 border-l-2 border-primary-ctext-primary-color bg-green-50 rounded-r-lg"
                    : "text-gray-600 hover:text-primary-color pl-3 hover:pl-3 hover:bg-green-50 hover:rounded-lg"
                }`}
            >
              {item.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex flex-col space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-primary-tint px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 cursor-pointer">
                  <Link
                    href={"/profile"}
                    className="w-8 h-8 bg-primary-tint text-primary-color  rounded-full flex items-center justify-center"
                  >
                    <User size={16} />
                  </Link>
                </div>
                <button className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-primary-tint text-primary-color">
                  <Bell size={18} />
                </button>
              </div>
              <Button
                onClick={handleSignOut}
                className="flex cursor-pointer items-center justify-center gap-2 bg-primary-color text-white px-4 py-3 rounded-lg w-full transition-all duration-300 font-medium"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
              <Link
                href={"/auth/login"}
                className="text-primary-color font-bold text-center py-3 hover:bg-primary-tint rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href={"/auth/register"}
                className="bg-primary-color font-medium py-3 rounded-lg text-white text-center shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
