import { generateStructuredData } from "@/lib/seo";

export default function LocalBusinessSchema() {
  const localBusinessData = generateStructuredData("LocalBusiness", {
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "20:00",
      },
    ],
    acceptsReservations: true,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Sarah Johnson",
        },
        reviewBody:
          "Transformative experience at Mayur Wellness. The meditation programs and nature therapy sessions helped me find inner peace and clarity.",
        datePublished: "2024-01-15",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Michael Chen",
        },
        reviewBody:
          "Outstanding wellness retreat center. The yoga classes and mindfulness programs exceeded my expectations. Highly recommended!",
        datePublished: "2024-02-20",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wellness Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Meditation Retreat",
            description:
              "Guided meditation sessions in natural settings for inner peace and mindfulness",
          },
          price: "3500",
          priceCurrency: "NPR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Yoga Classes",
            description:
              "Professional yoga instruction for all levels in serene natural environment",
          },
          price: "4500",
          priceCurrency: "NPR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Nature Therapy",
            description:
              "Healing through connection with nature and outdoor mindfulness activities",
          },
          price: "5000",
          priceCurrency: "NPR",
        },
      ],
    },
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: localBusinessData,
      }}
    />
  );
}
