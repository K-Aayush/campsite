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
import { Metadata } from "next";
import { generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Campsite Nepal - Best Camping & Wellness Retreat Center in Nepal",
  description:
    "Experience Nepal's premier campsite and wellness retreat center. Offering camping, meditation, yoga, nature therapy, and adventure activities. Book your transformative outdoor camping experience in Nepal today.",
  keywords: [
    "campsite nepal",
    "camping nepal",
    "nepal campsite",
    "best campsite nepal",
    "camping in nepal",
    "nepal camping sites",
    "outdoor camping nepal",
    "adventure camping nepal",
    "wellness retreat nepal",
    "meditation camp nepal",
    "yoga retreat nepal",
    "nature camping nepal",
    "himalayan camping",
    "nepal adventure camp",
    "eco camping nepal",
    "family camping nepal",
    "group camping nepal",
    "trekking camp nepal",
    "wilderness camping nepal",
    "mountain camping nepal",
    "forest camping nepal",
    "camping experience nepal",
    "nepal outdoor activities",
    "camping holidays nepal",
    "camping vacation nepal",
  ],
  openGraph: {
    title: "Campsite Nepal - Best Camping & Wellness Retreat Center in Nepal",
    description:
      "Discover Nepal's premier campsite offering camping, wellness retreats, meditation, yoga, and adventure activities in the heart of Nepal.",
    images: [
      {
        url: "/wellbeing-landing-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Campsite Nepal - Premier Camping and Wellness Retreat Center in Nepal",
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

const homePageStructuredData = generateStructuredData("LocalBusiness", {
  name: "Campsite Nepal",
  alternateName: ["Nepal Campsite", "Camping Nepal", "Best Campsite Nepal"],
  image: `${process.env.NEXT_PUBLIC_APP_URL}/wellbeing-landing-image.jpeg`,
  telephone: "(123) 456-7890",
  email: "contact@campsitenepal.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Forest Path",
    addressLocality: "Tranquil Valley",
    postalCode: "45678",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.6772,
    longitude: 85.3155,
  },
  url: process.env.NEXT_PUBLIC_APP_URL,
  priceRange: "$$",
  servesCuisine: "Camping & Wellness Programs",
  hasMenu: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
  acceptsReservations: true,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "247",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      author: {
        "@type": "Person",
        name: "Sarah Johnson",
      },
      reviewBody:
        "Amazing camping experience at Campsite Nepal! The best campsite in Nepal with excellent facilities and beautiful natural surroundings.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      author: {
        "@type": "Person",
        name: "Michael Chen",
      },
      reviewBody:
        "Outstanding camping and wellness retreat center. Perfect for families and groups looking for adventure camping in Nepal.",
    },
  ],
  keywords:
    "campsite nepal, camping nepal, nepal campsite, best campsite nepal, camping in nepal, wellness retreat nepal",
  description:
    "Nepal's premier campsite and wellness retreat center offering camping, meditation, yoga, nature therapy, and adventure activities.",
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: homePageStructuredData,
        }}
      />
      <MainLayoutWrapper>
        <SubHero />
        <Hero />
        <KeyFeatures />
        <OurVideos />
        <HomeContentCard
          header="Frequently Asked Questions"
          description="Find answers to common questions about our camping and wellness programs"
        >
          <FaqQuestionAnswer />
        </HomeContentCard>
        <OurExperts />
        <StayConnected />
      </MainLayoutWrapper>
    </>
  );
}
