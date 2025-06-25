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
    default:
      "Campsite Nepal - Best Camping Sites & Ground in Nepal | Camp Nepal",
    template: "%s | Campsite Nepal",
  },
  description:
    "Discover Nepal's premier campsite and camping ground. Experience the best camping sites near Kathmandu, jungle camping, wild camping, and adventure camping in Nepal. Book your camping experience today!",
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
    title: "Campsite Nepal - Best Camping Sites & Ground in Nepal | Camp Nepal",
    description:
      "Discover Nepal's premier campsite and camping ground. Experience the best camping sites near Kathmandu, jungle camping, wild camping, and adventure camping in Nepal.",
    images: [
      {
        url: "/wellbeing-landing-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Campsite Nepal - Premier Camping Sites and Ground in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@campsitenepal",
    creator: "@campsitenepal",
    title: "Campsite Nepal - Best Camping Sites & Ground in Nepal",
    description:
      "Experience Nepal's premier campsite with the best camping sites near Kathmandu, jungle camping, and adventure activities in Nepal.",
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
    "camping-sites": "nepal",
    "camping-ground": "kathmandu",
    "camp-nepal": "adventure",
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
          content="Travel, Tourism, Camping, Campsite, Nepal"
        />
        <meta
          name="camping-sites-nepal"
          content="best campsite near kathmandu"
        />
        <meta
          name="nepal-camping"
          content="jungle camping, wild camping, adventure camping"
        />
        <meta
          name="camp-nepal"
          content="camping ground, camping places, outdoor activities"
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
