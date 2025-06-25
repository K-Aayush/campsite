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
  title: "Campsite Nepal - Best Camping Sites & Ground in Nepal | Camp Nepal",
  description:
    "Discover Nepal's premier campsite and camping ground. Experience the best camping sites near Kathmandu, jungle camping in Nepal, wild camping, and adventure camping. Book your camping experience today!",
  keywords: [
    "campsite nepal",
    "camping site in nepal",
    "camp site meaning in nepali",
    "camping ground nepal",
    "abc campsite nepal",
    "camping sites near kathmandu",
    "camp nepal",
    "camping nepali",
    "nepal camping places",
    "campsite meaning in nepali",
    "camp meaning in nepali",
    "camping nepal",
    "camping in jungle in nepal",
    "camping near ktm",
    "livenepal camping",
    "camping meaning in nepali",
    "camping vlog nepal",
    "camping vlog nepali",
    "nepal camping",
    "camping site near by",
    "wild camping site near me",
    "camping sites in kathmandu",
    "camping in nepal",
    "camping places in nepal",
    "best campsite nepal",
    "nepal adventure camping",
    "outdoor camping nepal",
    "family camping nepal",
    "group camping nepal",
    "eco camping nepal",
    "mountain camping nepal",
    "forest camping nepal",
    "himalayan camping nepal",
    "camping holidays nepal",
    "camping vacation nepal",
    "wilderness camping nepal",
    "nature camping nepal",
    "camping experience nepal",
    "nepal outdoor activities",
    "trekking camp nepal",
  ],
  openGraph: {
    title: "Campsite Nepal - Best Camping Sites & Ground in Nepal | Camp Nepal",
    description:
      "Discover Nepal's premier campsite offering the best camping sites near Kathmandu, jungle camping, wild camping, and adventure activities in Nepal.",
    images: [
      {
        url: "/wellbeing-landing-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Campsite Nepal - Premier Camping Sites and Ground in Nepal with Adventure Activities",
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

const homePageStructuredData = generateStructuredData("LocalBusiness", {
  name: "Campsite Nepal",
  alternateName: [
    "Nepal Campsite",
    "Camping Nepal",
    "Best Campsite Nepal",
    "Camp Nepal",
    "Camping Ground Nepal",
    "Camping Sites Near Kathmandu",
    "Nepal Camping Places",
  ],
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
  servesCuisine: "Camping & Adventure Programs",
  hasMenu: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
  acceptsReservations: true,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "347",
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
        name: "Rajesh Sharma",
      },
      reviewBody:
        "Amazing camping experience at Campsite Nepal! The best campsite in Nepal with excellent facilities and beautiful natural surroundings. Perfect for jungle camping and adventure activities.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      author: {
        "@type": "Person",
        name: "Priya Thapa",
      },
      reviewBody:
        "Outstanding camping ground near Kathmandu. Perfect for families and groups looking for adventure camping in Nepal. The wild camping experience was unforgettable!",
    },
  ],
  keywords:
    "campsite nepal, camping site in nepal, camping ground nepal, camping sites near kathmandu, camp nepal, camping in jungle in nepal, nepal camping places, wild camping nepal",
  description:
    "Nepal's premier campsite and camping ground offering the best camping sites near Kathmandu, jungle camping, wild camping, adventure camping, and outdoor activities.",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 27.6772,
      longitude: 85.3155,
    },
    geoRadius: "100000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Camping Services Nepal",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jungle Camping in Nepal",
          description:
            "Experience wild camping and jungle camping adventures in Nepal's pristine forests",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adventure Camping Near Kathmandu",
          description:
            "Best camping sites near Kathmandu for outdoor adventures and group camping",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Family Camping Ground",
          description:
            "Safe and comfortable camping ground for families and groups in Nepal",
        },
      },
    ],
  },
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
          description="Find answers to common questions about our camping sites, jungle camping, and adventure programs in Nepal"
        >
          <FaqQuestionAnswer />
        </HomeContentCard>
        <OurExperts />
        <StayConnected />
      </MainLayoutWrapper>
    </>
  );
}
