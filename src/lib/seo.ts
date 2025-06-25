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
    type: "website",
    title: "Campsite Nepal - Best Camping & Wellness Retreat Center in Nepal",
    description:
      "Discover Nepal's premier campsite offering camping, wellness retreats, meditation, yoga, and adventure activities in the heart of Nepal.",
    image: "/wellbeing-landing-image.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campsite Nepal - Best Camping & Wellness Retreat",
    description:
      "Experience Nepal's premier campsite with camping, wellness retreats, and adventure activities in the heart of Nepal.",
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
  name: "Campsite Nepal",
  alternateName: ["Nepal Campsite", "Camping Nepal", "Best Campsite Nepal"],
  url: process.env.NEXT_PUBLIC_APP_URL || "https://campsitenepal.com",
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/last-logo.png`,
  description:
    "Nepal's premier campsite and wellness retreat center offering camping, meditation, yoga, nature therapy, and adventure activities for transformative outdoor experiences.",
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
    email: "contact@campsitenepal.com",
    availableLanguage: ["English", "Nepali"],
  },
  sameAs: [
    "https://facebook.com/campsitenepal",
    "https://instagram.com/campsitenepal",
    "https://twitter.com/campsitenepal",
  ],
  serviceArea: {
    "@type": "Country",
    name: "Nepal",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Camping & Wellness Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Camping Experience",
          description:
            "Premium camping facilities and outdoor adventures in Nepal",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wellness Retreat",
          description: "Meditation, yoga, and nature therapy programs",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adventure Activities",
          description: "Outdoor adventures and nature-based activities",
        },
      },
    ],
  },
  keywords:
    "campsite nepal, camping nepal, nepal campsite, best campsite nepal, camping in nepal, wellness retreat nepal, adventure camping nepal",
  foundingDate: "1995",
  areaServed: {
    "@type": "Country",
    name: "Nepal",
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Camping Services",
      description: "Premium camping experiences in Nepal",
    },
    {
      "@type": "Offer",
      name: "Wellness Programs",
      description: "Meditation, yoga, and wellness retreats",
    },
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Campsite Nepal",
  alternateName: ["Nepal Campsite", "Camping Nepal"],
  url: process.env.NEXT_PUBLIC_APP_URL || "https://campsitenepal.com",
  description:
    "Nepal's premier campsite and wellness retreat center offering camping, meditation, yoga, and adventure activities",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  keywords:
    "campsite nepal, camping nepal, nepal campsite, best campsite nepal, camping in nepal",
  inLanguage: "en-US",
  copyrightYear: "2025",
  copyrightHolder: {
    "@type": "Organization",
    name: "Campsite Nepal",
  },
};
