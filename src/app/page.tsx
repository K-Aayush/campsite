import React from "react";

import Hero from "@/components/home/Hero";

// import BottomCallToAction from "@/components/home/BottomCallToAction";
import KeyFeatures from "@/components/home/KeyFeatures";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import OurVideos from "@/components/home/OurVideos";
import SubHero from "@/components/home/SubHero";
// import OurExperts from "@/components/home/OurExperts";

// import StayConnected from "@/components/home/StayConnected";

export default function Home() {
  return (
    <MainLayoutWrapper>
      <main className="">
        <div className=" ">
          <SubHero />
          <Hero></Hero>
          <KeyFeatures></KeyFeatures>
          <OurVideos></OurVideos>
        </div>
      </main>
    </MainLayoutWrapper>
  );
}
