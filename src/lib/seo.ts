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
    type: "website",
    title: "Campsite Nepal - Best Camping Sites & Ground in Nepal | Camp Nepal",
    description:
      "Discover Nepal's premier campsite offering the best camping sites near Kathmandu, jungle camping, wild camping, and adventure activities in Nepal.",
    image: "/wellbeing-landing-image.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campsite Nepal - Best Camping Sites & Ground in Nepal",
    description:
      "Experience Nepal's premier campsite with the best camping sites near Kathmandu, jungle camping, and adventure activities in Nepal.",
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
  alternateName: [
    "Nepal Campsite",
    "Camping Nepal",
    "Best Campsite Nepal",
    "Camp Nepal",
    "Camping Ground Nepal",
    "Camping Sites Near Kathmandu",
    "Nepal Camping Places",
    "Camping in Jungle in Nepal",
    "Wild Camping Nepal",
  ],
  url: process.env.NEXT_PUBLIC_APP_URL || "https://campsitenepal.com",
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/last-logo.png`,
  description:
    "Nepal's premier campsite and camping ground offering the best camping sites near Kathmandu, jungle camping in Nepal, wild camping, adventure camping, and outdoor activities for transformative camping experiences.",
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
    name: "Camping & Adventure Services Nepal",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jungle Camping Experience",
          description:
            "Premium jungle camping and wild camping facilities in Nepal's pristine forests",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adventure Camping Near Kathmandu",
          description:
            "Best camping sites near Kathmandu for adventure and outdoor activities",
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
  keywords:
    "campsite nepal, camping site in nepal, camping ground nepal, camping sites near kathmandu, camp nepal, camping in jungle in nepal, nepal camping places, wild camping nepal, adventure camping nepal",
  foundingDate: "1995",
  areaServed: {
    "@type": "Country",
    name: "Nepal",
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Jungle Camping Services",
      description:
        "Premium jungle camping and wild camping experiences in Nepal",
    },
    {
      "@type": "Offer",
      name: "Adventure Camping Programs",
      description: "Adventure camping and outdoor activities near Kathmandu",
    },
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Campsite Nepal",
  alternateName: [
    "Nepal Campsite",
    "Camping Nepal",
    "Camp Nepal",
    "Camping Ground Nepal",
    "Camping Sites Near Kathmandu",
  ],
  url: process.env.NEXT_PUBLIC_APP_URL || "https://campsitenepal.com",
  description:
    "Nepal's premier campsite and camping ground offering the best camping sites near Kathmandu, jungle camping, wild camping, and adventure activities",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  keywords:
    "campsite nepal, camping site in nepal, camping ground nepal, camping sites near kathmandu, camp nepal, camping in jungle in nepal, nepal camping places, wild camping nepal",
  inLanguage: "en-US",
  copyrightYear: "2025",
  copyrightHolder: {
    "@type": "Organization",
    name: "Campsite Nepal",
  },
};
