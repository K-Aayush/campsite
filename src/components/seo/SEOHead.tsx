import Head from "next/head";
import { SEOConfig } from "@/lib/seo";

interface SEOHeadProps {
  config: SEOConfig;
}

export default function SEOHead({ config }: SEOHeadProps) {
  const {
    title,
    description,
    keywords = [],
    canonical,
    openGraph,
    twitter,
    structuredData,
  } = config;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Meta Tags */}
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type || "website"} />
          <meta property="og:title" content={openGraph.title || title} />
          <meta
            property="og:description"
            content={openGraph.description || description}
          />
          {openGraph.image && (
            <meta property="og:image" content={openGraph.image} />
          )}
          <meta property="og:url" content={canonical || ""} />
          <meta property="og:site_name" content="Mayur Wellness" />
          <meta property="og:locale" content="en_US" />
        </>
      )}

      {/* Twitter Card Meta Tags */}
      {twitter && (
        <>
          <meta
            name="twitter:card"
            content={twitter.card || "summary_large_image"}
          />
          <meta name="twitter:title" content={twitter.title || title} />
          <meta
            name="twitter:description"
            content={twitter.description || description}
          />
          {twitter.image && (
            <meta name="twitter:image" content={twitter.image} />
          )}
          <meta name="twitter:site" content="@mayurwellness" />
          <meta name="twitter:creator" content="@mayurwellness" />
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content="Mayur Wellness" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
    </Head>
  );
}
