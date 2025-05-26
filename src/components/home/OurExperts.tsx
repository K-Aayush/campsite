import React from "react";

import OurTeams from "../commons/OurTeams";
import HomeContentCard from "./HomeContentCard";

const OurExperts = () => {
  return (
    <HomeContentCard
      header="Our Expert Team"
      description="Meet our highly qualified professionals dedicated to your wellbeing"
      className="py-12 dark:bg-gray-900"
    >
      <OurTeams />
    </HomeContentCard>
  );
};

export default OurExperts;
