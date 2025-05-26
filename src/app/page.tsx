import React from "react";
import Hero from "@/components/home/Hero";
import KeyFeatures from "@/components/home/KeyFeatures";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import OurVideos from "@/components/home/OurVideos";
import SubHero from "@/components/home/SubHero";
import FaqQuestionAnswer from "@/components/faqs/FaqQuestionAnswers";
import OurExperts from "@/components/home/OurExperts";
import StayConnected from "@/components/home/StayConnected";
import HomeContentCard from "@/components/home/HomeContentCard";

export default function Home() {
  return (
    <MainLayoutWrapper>
      <SubHero />
      <Hero />
      <KeyFeatures />
      <OurVideos />
      <HomeContentCard
        header="Frequently Asked Questions"
        description="Find answers to common questions about our wellness programs"
      >
        <FaqQuestionAnswer />
      </HomeContentCard>
      <OurExperts />
      <StayConnected />
    </MainLayoutWrapper>
  );
}
