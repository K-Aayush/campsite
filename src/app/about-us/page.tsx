import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Mayur Wellness",
  description: "Learn more about Mayur Wellness and our mission.",
};

import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import AboutUs from "@/components/about-us/AboutUs";

const page = async () => {
  return (
    <MainLayoutWrapper>
      <AboutUs />
    </MainLayoutWrapper>
  );
};

export default page;

