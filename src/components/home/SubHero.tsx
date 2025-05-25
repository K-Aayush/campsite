import React from "react";
import Image from "next/image";
import Link from "next/link";

const SubHero = () => {
  return (
    <div className="  min-h-[80vh] grid md:grid-cols-2 ">
      <div className="flex order-1   flex-col gap-4 justify-center px-4 py-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-black"
          style={{ lineHeight: "1.2" }}
        >
          A Sanctuary for Your
          <br />
          Mind, Body & Spirit
        </h1>
        <p className="text-gray-500 text-sm base:text-base md:text-lg max-w-lg">
          Join thousands of people embracing mindfulness and relaxation.
          Discover guided meditation and yoga sessions designed for all levels.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={"/booknow"}
            className="px-8 py-2 cursor-pointer font-medium bg-primary-color text-white rounded-full  transition-colors flex items-center"
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
      {/* <div className=" flex order-0 items-center justify-center">
        <div className="relative h-full min-h-[250px] min-w-[250px] text-center w-full rounded-2xl">
          <Image
            src={"/wellbeing-landing-image-removebg-preview.png"}
            className="object-contain object-center bg-red-500  rounded-2xl"
            alt="Meditation pose"
            fill
            priority
            // sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div> */}
      <div className="flex order-0 rounded-xl  items-center justify-center w-full">
        <div className="relative min-h-[300px]  min-w-[300px] rounded-2xl w-full h-full">
          <Image
            // src={"/wellbeing-landing-image-removebg-preview.png"}
            src={"/image.avif"}
            className="object-contain  w-full rounded-2xl object-center"
            alt="Meditation pose"
            fill
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SubHero;
