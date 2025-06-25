import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/commons/AuthProvider";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { organizationStructuredData, websiteStructuredData } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://campsitenepal.com"
  ),
  title: {
    default: "Campsite Nepal - Best Camping & Wellness Retreat Center in Nepal",
    template: "%s | Campsite Nepal",
  },
  description:
    "Experience Nepal's premier campsite and wellness retreat center. Offering camping, meditation, yoga, nature therapy, and adventure activities in the heart of Nepal. Book your transformative outdoor experience today.",
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
  authors: [{ name: "Campsite Nepal Team" }],
  creator: "Campsite Nepal",
  publisher: "Campsite Nepal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Campsite Nepal",
    title: "Campsite Nepal - Best Camping & Wellness Retreat Center in Nepal",
    description:
      "Discover Nepal's premier campsite offering camping, wellness retreats, meditation, yoga, and adventure activities. Experience the best outdoor camping in Nepal.",
    images: [
      {
        url: "/wellbeing-landing-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Campsite Nepal - Premier Camping and Wellness Retreat Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@campsitenepal",
    creator: "@campsitenepal",
    title: "Campsite Nepal - Best Camping & Wellness Retreat",
    description:
      "Experience Nepal's premier campsite with camping, wellness retreats, and adventure activities in the heart of Nepal.",
    images: ["/wellbeing-landing-image.jpeg"],
  },
  icons: {
    icon: [
      { url: "/last-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/last-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/last-logo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Travel & Tourism",
  other: {
    "geo.region": "NP",
    "geo.placename": "Nepal",
    "geo.position": "27.6772;85.3155",
    ICBM: "27.6772, 85.3155",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Nepal" />
        <meta name="geo.position" content="27.6772;85.3155" />
        <meta name="ICBM" content="27.6772, 85.3155" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta
          name="classification"
          content="Travel, Tourism, Camping, Wellness"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthProvider>
            <header>
              <Toaster />
              <Navbar />
            </header>
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
