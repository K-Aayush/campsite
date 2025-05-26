"use client";

import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
        <Image
          src="/last-logo.png"
          alt="Mayur Wellbeing Logo"
          fill
          className="object-cover"
          quality={100}
          onError={() => console.error("Failed to load logo image")}
        />
      </div>
      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
        Mayur Wellbeing
      </p>
    </Link>
  );
};

export default Logo;
