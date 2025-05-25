import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className=" min-h-[80vh] grid md:grid-cols-2 ">
      <div className="flex  flex-col gap-4 justify-center px-3 py-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-black"
          style={{ lineHeight: "1.2" }}
        >
          Where Little Feet
          <br />
          Meet Big Adventures
        </h1>
        <p className="text-gray-500 text-sm base:text-base md:text-lg max-w-lg">
          Explore a world of laughter, learning, and play among green fields and
          fresh air. Book unforgettable experiences where children grow,
          connect, and thrive naturally.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={"/booknow"}
            className="px-8 py-2 cursor-pointer font-medium bg-primary-color text-white rounded-full transition-colors flex items-center"
          >
            Get Started
            <svg
              className="ml-2 w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33337 8H12.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 3.33325L12.6667 7.99992L8 12.6666"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className=" flex  items-center justify-center">
        <div className="relative  min-w-[250px]  min-h-[250px] w-full h-full">
          <Image
            src={"/scout-hero-removebg.png"}
            className="object-contain  object-center "
            alt="Meditation pose"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
