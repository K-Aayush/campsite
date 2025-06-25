export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  structuredData?: any;
}

export const defaultSEO: SEOConfig = {
  title: "Mayur Wellness - Premium Wellness Retreat & Mindfulness Center",
  description:
    "Experience transformative wellness at Mayur Wellness. Premium meditation retreats, yoga sessions, nature therapy, and mindfulness programs. Book your wellness journey today.",
  keywords: [
    "wellness retreat",
    "meditation center",
    "yoga retreat",
    "mindfulness programs",
    "nature therapy",
    "wellness camp",
    "spiritual retreat",
    "mental health wellness",
    "holistic healing",
    "stress relief programs",
    "wellness tourism",
    "meditation classes",
    "yoga classes",
    "wellness packages",
    "health retreat",
  ],
  openGraph: {
    type: "website",
    title: "Mayur Wellness - Premium Wellness Retreat & Mindfulness Center",
    description:
      "Transform your life with our premium wellness retreats, meditation programs, and nature therapy sessions. Expert-led mindfulness experiences.",
    image: "/wellbeing-landing-image.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayur Wellness - Premium Wellness Retreat",
    description:
      "Transform your life with our premium wellness retreats and mindfulness programs.",
    image: "/wellbeing-landing-image.jpeg",
  },
};

export const generateStructuredData = (type: string, data: any) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return JSON.stringify(baseData);
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mayur Wellness",
  alternateName: "Mayur Wellbeing",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://mayurwellness.com",
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/last-logo.png`,
  description:
    "Premium wellness retreat center offering meditation, yoga, nature therapy, and mindfulness programs for holistic healing and personal transformation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Forest Path",
    addressLocality: "Tranquil Valley",
    postalCode: "45678",
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "(123) 456-7890",
    contactType: "customer service",
    email: "contact@mayurwellness.com",
  },
  sameAs: [
    "https://facebook.com/mayurwellness",
    "https://instagram.com/mayurwellness",
    "https://twitter.com/mayurwellness",
  ],
  serviceArea: {
    "@type": "Country",
    name: "Nepal",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wellness Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Meditation Retreat",
          description: "Guided meditation sessions in natural settings",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Yoga Classes",
          description: "Professional yoga instruction for all levels",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nature Therapy",
          description: "Healing through connection with nature",
        },
      },
    ],
  },
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mayur Wellness",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://mayurwellness.com",
  description:
    "Premium wellness retreat center offering meditation, yoga, and mindfulness programs",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
