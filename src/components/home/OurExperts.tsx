"use client";

import React from "react";
import OurTeams from "../commons/OurTeams";
import HomeContentCard from "./HomeContentCard";

const OurExperts = () => {
  return (
    <HomeContentCard
      header="Our Expert Team"
      description="Meet our dedicated professionals passionate about your wellbeing"
      className="py-16"
    >
      <OurTeams />
    </HomeContentCard>
  );
};

export default OurExperts;
