import React from "react";

import Hero from "@/components/home/Hero";

// import BottomCallToAction from "@/components/home/BottomCallToAction";
import KeyFeatures from "@/components/home/KeyFeatures";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import OurVideos from "@/components/home/OurVideos";
import SubHero from "@/components/home/SubHero";
import FaqQuestionAnswer from "@/components/faqs/FaqQuestionAnswers";
import OurExperts from "@/components/home/OurExperts";
import StayConnected from "@/components/home/StayConnected";
// import OurExperts from "@/components/home/OurExperts";

// import StayConnected from "@/components/home/StayConnected";

export default function Home() {
  return (
    <MainLayoutWrapper>
      <main className="">
        <div className=" ">
          <SubHero />
          <Hero />
          <KeyFeatures />
          <OurVideos />
          <FaqQuestionAnswer />
          <OurExperts />
          <StayConnected />
        </div>
      </main>
    </MainLayoutWrapper>
  );
}
