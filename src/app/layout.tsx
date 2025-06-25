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
    process.env.NEXT_PUBLIC_APP_URL || "https://mayurwellness.com"
  ),
  title: {
    default: "Mayur Wellness - Premium Wellness Retreat & Mindfulness Center",
    template: "%s | Mayur Wellness",
  },
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
    "Nepal wellness",
    "mindfulness retreat",
    "wellness center",
  ],
  authors: [{ name: "Mayur Wellness Team" }],
  creator: "Mayur Wellness",
  publisher: "Mayur Wellness",
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
    siteName: "Mayur Wellness",
    title: "Mayur Wellness - Premium Wellness Retreat & Mindfulness Center",
    description:
      "Transform your life with our premium wellness retreats, meditation programs, and nature therapy sessions. Expert-led mindfulness experiences in Nepal.",
    images: [
      {
        url: "/wellbeing-landing-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Mayur Wellness - Premium Wellness Retreat Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mayurwellness",
    creator: "@mayurwellness",
    title: "Mayur Wellness - Premium Wellness Retreat",
    description:
      "Transform your life with our premium wellness retreats and mindfulness programs in Nepal.",
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
  category: "Health & Wellness",
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
