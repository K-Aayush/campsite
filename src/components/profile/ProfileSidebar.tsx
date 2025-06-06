"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  Home,
  Settings,
  User,
  Briefcase,
  FileText,
  CreditCard,
  BarChart3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

// Define TypeScript interface for route item
interface RouteItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const navigationRoutes: RouteItem[] = [
  { name: "Home", path: "/profile", icon: <Home size={20} /> },
  { name: "Settings", path: "/profile/settings", icon: <Settings size={20} /> },
  {
    name: "My Bookings",
    path: "/profile/bookings",
    icon: <FileText size={20} />,
  },
  {
    name: "My Services",
    path: "/profile/services",
    icon: <Briefcase size={20} />,
  },
  { name: "Account", path: "/profile/account", icon: <User size={20} /> },
  { name: "Blogs", path: "/profile/blogs", icon: <Briefcase size={20} /> },
  {
    name: "Billing",
    path: "/profile/billings",
    icon: <CreditCard size={20} />,
  },
  { name: "Orders", path: "/profile/orders", icon: <BarChart3 size={20} /> },
];

const adminRoutes: RouteItem[] = [
  { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
  { name: "Services", path: "/admin/service", icon: <Briefcase size={20} /> },
  { name: "Bookings", path: "/admin/bookings", icon: <FileText size={20} /> },
  { name: "Users", path: "/admin/users", icon: <User size={20} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
];

const BottomNavigation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const [showIndicators, setShowIndicators] = useState({
    left: false,
    right: false,
  });
  const [shouldExpand, setShouldExpand] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const routes = isAdmin ? adminRoutes : navigationRoutes;

  // Check if content fits within the container and update indicators
  const updateScrollState = () => {
    if (!navRef.current) return;

    const container = navRef.current;
    const isScrollable = container.scrollWidth > container.clientWidth;

    // Update whether items should expand (only when not scrollable)
    setShouldExpand(!isScrollable);

    if (!isScrollable) {
      setShowIndicators({ left: false, right: false });
      return;
    }

    const isAtStart = container.scrollLeft < 10;
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10;

    setShowIndicators({
      left: !isAtStart,
      right: !isAtEnd,
    });
  };

  // Set up scroll event listeners
  useEffect(() => {
    // Initial check
    updateScrollState();

    const container = navRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      window.addEventListener("resize", updateScrollState);

      // Additional check after a short delay to ensure accurate measurements
      setTimeout(updateScrollState, 100);

      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, []);

  // Handle scroll buttons
  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -120, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 border-2 rounded border-primary-color bg-white z-20 left-0 right-0 w-full shadow-lg border-t">
      <div className="relative flex items-center w-full">
        {/* Left scroll indicator */}
        {showIndicators.left && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 h-full flex items-center justify-center px-1 bg-gradient-to-r from-white to-transparent"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-black" />
          </button>
        )}

        {/* Navigation items */}
        <div
          ref={navRef}
          className="flex w-full overflow-x-auto py-2 px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              onClick={() => setActiveIndex(index)}
              className={`
                flex flex-col items-center justify-center py-2 px-3
                transition-all whitespace-nowrap
                ${shouldExpand ? "flex-1" : "min-w-16"}
                ${activeIndex === index ? "text-primary-color" : "text-black"}
              `}
            >
              <div className="mb-1">{route.icon}</div>
              <span className="text-xs font-medium">{route.name}</span>
              {activeIndex === index && (
                <div className="mt-2 w-10 h-1 rounded-t-full bg-primary-color" />
              )}
            </Link>
          ))}
        </div>

        {/* Right scroll indicator */}
        {showIndicators.right && (
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 h-full flex items-center justify-center px-1 bg-gradient-to-l from-white to-transparent"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

const SidebarNavigation: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const routes = isAdmin ? adminRoutes : navigationRoutes;

  return (
    <div className="py-4 bg-white w-full">
      <nav className="space-y-1.5">
        {routes.map((route, index) => {
          const isActive = pathname === route.path;

          return (
            <Link
              key={index}
              href={route.path}
              className="group block relative"
            >
              <div
                className={cn(
                  "flex items-center gap-3 p-3 px-4 rounded-lg transition-all duration-200 group-hover:translate-x-1",
                  isActive
                    ? "bg-primary-color text-white shadow-md"
                    : "text-gray-700 hover:bg-primary-tint/30"
                )}
              >
                {/* Left Border Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 w-1 h-4/5 bg-white rounded-r-full transform -translate-y-1/2"
                    initial={{ opacity: 0, height: "0%" }}
                    animate={{ opacity: 1, height: "70%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "flex items-center justify-center",
                    isActive
                      ? "text-white"
                      : "text-primary-color/70 group-hover:text-primary-color"
                  )}
                >
                  {route.icon}
                </div>

                {/* Text */}
                <span
                  className={cn(
                    "font-medium text-sm flex-grow",
                    !isActive && "group-hover:text-primary-color"
                  )}
                >
                  {route.name}
                </span>

                {/* Badge */}
                {route.badge && (
                  <span
                    className={cn(
                      "rounded-full text-xs py-0.5 px-2 font-medium",
                      isActive
                        ? "bg-white text-primary-color"
                        : "bg-primary-tint text-primary-color"
                    )}
                  >
                    {route.badge}
                  </span>
                )}

                {/* Arrow indicator */}
                {isActive && (
                  <ChevronRight size={16} className="text-white opacity-70" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export const ProfileSidebar = () => {
  return (
    <div>
      <div className="lg:hidden bg-white">
        <BottomNavigation />
      </div>
      <div className="hidden lg:block">
        <SidebarNavigation />
      </div>
    </div>
  );
};
