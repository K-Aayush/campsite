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
  title:
    "Mayur Wellness - Premium Wellness Retreat & Mindfulness Center in Nepal",
  description:
    "Transform your life at Mayur Wellness - Nepal's premier wellness retreat center. Experience guided meditation, yoga, nature therapy, and mindfulness programs. Book your transformative wellness journey today.",
  keywords: [
    "wellness retreat Nepal",
    "meditation center Nepal",
    "yoga retreat Nepal",
    "mindfulness programs",
    "nature therapy Nepal",
    "wellness camp Nepal",
    "spiritual retreat Nepal",
    "mental health wellness",
    "holistic healing Nepal",
    "stress relief programs",
    "wellness tourism Nepal",
    "meditation classes Nepal",
    "yoga classes Nepal",
    "wellness packages Nepal",
    "health retreat Nepal",
  ],
  openGraph: {
    title:
      "Mayur Wellness - Premium Wellness Retreat & Mindfulness Center in Nepal",
    description:
      "Transform your life at Nepal's premier wellness retreat center. Experience guided meditation, yoga, nature therapy, and mindfulness programs.",
    images: [
      {
        url: "/wellbeing-landing-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Mayur Wellness - Premium Wellness Retreat Center in Nepal",
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

const homePageStructuredData = generateStructuredData("LocalBusiness", {
  name: "Mayur Wellness",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/wellbeing-landing-image.jpeg`,
  telephone: "(123) 456-7890",
  email: "contact@mayurwellness.com",
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
  servesCuisine: "Wellness Programs",
  hasMenu: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
  acceptsReservations: true,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
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
        "Transformative experience at Mayur Wellness. The meditation programs and nature therapy sessions helped me find inner peace.",
    },
  ],
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
          description="Find answers to common questions about our wellness programs"
        >
          <FaqQuestionAnswer />
        </HomeContentCard>
        <OurExperts />
        <StayConnected />
      </MainLayoutWrapper>
    </>
  );
}
