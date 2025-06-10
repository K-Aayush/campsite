"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, User, Bell, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About Us", href: "/about-us" },
  { id: 3, name: "Services", href: "/services" },
  { id: 4, name: "Gallery", href: "/gallery" },
  { id: 5, name: "Contact Us", href: "/contact-us" },
  { id: 6, name: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const pathName = usePathname();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    const currentItem = navItems.find((item) => item.href === pathName);
    return currentItem ? currentItem.id : 1;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
    pathName.toString().includes("profile") ||
    pathName.toString().includes("admin")
  ) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full px-4 sm:px-6 md:px-8 lg:px-10 z-50 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src="/last-logo.png"
              alt="Mayur Logo"
              fill
              className="object-cover"
              onError={() => console.error("Failed to load logo image")}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Mayur
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Wellbeing & Mindfulness
            </p>
          </div>
        </Link>

        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-orange-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          {isAuthenticated && (
            <>
              <Button
                variant="ghost"
                className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-full"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </Button>
              <Link
                href="/my-bookings"
                className="p-2 rounded-full bg-green-50 dark:bg-gray-800 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="My bookings"
              >
                <User size={20} />
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="p-2 rounded-full bg-green-50 dark:bg-gray-800 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3 py-2 font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 ${
                  activeItem === item.id
                    ? "text-green-600 dark:text-green-400 font-bold"
                    : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full bg-green-600 dark:bg-green-400 transition-transform duration-300 ${
                    activeItem === item.id
                      ? "scale-x-100"
                      : "scale-x-0 hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-orange-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-full"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                </Button>
                <Link
                  href="/my-bookings"
                  className="p-2 rounded-full bg-green-50 dark:bg-gray-800 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 transition-all duration-300"
                  aria-label="My bookings"
                >
                  <User size={20} />
                </Link>
                <Button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300"
                >
                  <LogOut size={16} />
                  <span className="font-medium">Sign out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 rounded-full hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mt-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                    activeItem === item.id
                      ? "text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="flex flex-col gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="/my-bookings"
                    className="py-2 px-4 text-green-600 dark:text-green-400 text-center rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Sign out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="/auth/login"
                    className="py-2 px-4 text-green-600 dark:text-green-400 text-center rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="py-2 px-4 bg-green-600 dark:bg-green-500 text-white text-center rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
