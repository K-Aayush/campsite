import React from "react";
import type { Metadata } from "next";
import MainLayoutWrapper from "@/components/commons/MainLayoutWrapper";
import AboutUs from "@/components/about-us/AboutUs";
import { generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Mayur Wellness - Our Story, Mission & Expert Team",
  description:
    "Learn about Mayur Wellness - Nepal's premier wellness retreat center. Discover our story, mission, expert team, and commitment to transformative wellness experiences since 1995.",
  keywords: [
    "about Mayur Wellness",
    "wellness retreat Nepal history",
    "meditation center Nepal",
    "wellness experts Nepal",
    "holistic healing center",
    "mindfulness retreat center",
    "wellness team Nepal",
    "spiritual retreat center",
    "nature therapy experts",
    "wellness mission Nepal",
  ],
  openGraph: {
    title: "About Mayur Wellness - Our Story, Mission & Expert Team",
    description:
      "Discover the story behind Nepal's premier wellness retreat center. Learn about our expert team and commitment to transformative wellness experiences.",
    images: [
      {
        url: "/campsite.jpg",
        width: 1200,
        height: 630,
        alt: "Mayur Wellness - About Our Wellness Retreat Center",
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/about-us`,
  },
};

const aboutPageStructuredData = generateStructuredData("AboutPage", {
  name: "About Mayur Wellness",
  description:
    "Learn about Mayur Wellness - Nepal's premier wellness retreat center established in 1995",
  mainEntity: {
    "@type": "Organization",
    name: "Mayur Wellness",
    foundingDate: "1995",
    description:
      "Premier wellness retreat center offering meditation, yoga, and nature therapy programs",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Forest Path",
      addressLocality: "Tranquil Valley",
      postalCode: "45678",
      addressCountry: "NP",
    },
    employee: [
      {
        "@type": "Person",
        name: "Bibek Koirala",
        jobTitle: "Wellness Coach",
      },
      {
        "@type": "Person",
        name: "Sarah Johnson",
        jobTitle: "Yoga Instructor",
      },
      {
        "@type": "Person",
        name: "Michael Chen",
        jobTitle: "Mindfulness Expert",
      },
    ],
  },
});

const page = async () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: aboutPageStructuredData,
        }}
      />
      <div className="pt-16">
        <MainLayoutWrapper>
          <AboutUs />
        </MainLayoutWrapper>
      </div>
    </>
  );
};

export default page;
