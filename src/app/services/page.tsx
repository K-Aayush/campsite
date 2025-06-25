"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/Toast";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { generateStructuredData } from "@/lib/seo";

interface Package {
  name: string;
  price: number;
  features: string[];
}

interface Duration {
  days: number;
  label: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  isBookable: boolean;
  depositPercentage: number;
  category: string;
  packages: string | null;
  durations: string | null;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Services" },
    { value: "education", label: "Educational Adventures" },
    { value: "camping", label: "Camping Experiences" },
    { value: "wellness", label: "Wellness Retreat" },
    { value: "general", label: "General" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        console.log("API response:", data);
        setServices(data);
      } catch (error) {
        console.error(error);
        showToast("error", { title: "Failed to fetch services" });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      selectedCategory === "all" || service.category === selectedCategory
  );

  const parsePackages = (packagesString: string | null): Package[] => {
    if (!packagesString) return [];
    try {
      let parsed = JSON.parse(packagesString);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!Array.isArray(parsed)) {
        console.error("Parsed packages is not an array:", parsed);
        return [];
      }
      // Filter out invalid packages (empty names, zero prices, etc.)
      return parsed.filter(
        (item): item is Package =>
          typeof item === "object" &&
          item !== null &&
          typeof item.name === "string" &&
          item.name.trim() !== "" &&
          typeof item.price === "number" &&
          item.price > 0 &&
          Array.isArray(item.features)
      );
    } catch {
      console.error("Failed to parse packages:", packagesString);
      return [];
    }
  };

  const parseDurations = (durationsString: string | null): Duration[] => {
    if (!durationsString) {
      console.warn("durationsString is null or empty");
      return [];
    }
    try {
      let parsed = JSON.parse(durationsString);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!Array.isArray(parsed)) {
        console.error("Parsed durations is not an array:", parsed);
        return [];
      }
      const validDurations = parsed.filter(
        (item): item is Duration =>
          typeof item === "object" &&
          item !== null &&
          typeof item.days === "number" &&
          typeof item.label === "string"
      );
      if (validDurations.length !== parsed.length) {
        console.warn("Some durations are invalid:", parsed);
      }
      return validDurations;
    } catch (error) {
      console.error("Failed to parse durations:", durationsString, error);
      return [];
    }
  };

  // Generate structured data for services
  const servicesStructuredData = generateStructuredData("ItemList", {
    name: "Wellness Services at Mayur Wellness",
    description:
      "Comprehensive wellness services including meditation retreats, yoga classes, nature therapy, and mindfulness programs",
    numberOfItems: filteredServices.length,
    itemListElement: filteredServices.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "Mayur Wellness",
      },
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "NPR",
        availability: service.isBookable ? "InStock" : "OutOfStock",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/services/${service.id}`,
      },
      image: service.image,
      category: service.category,
    })),
  });

  if (loading) {
    return (
      <>
        <Head>
          <title>
            Wellness Services - Meditation, Yoga & Nature Therapy | Mayur
            Wellness
          </title>
          <meta
            name="description"
            content="Explore our comprehensive wellness services including meditation retreats, yoga classes, nature therapy, and mindfulness programs at Mayur Wellness Nepal."
          />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-100 dark:from-gray-900 dark:to-gray-800 pt-24">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16">
              <div className="h-14 bg-cream-200 dark:bg-gray-700 rounded-lg w-1/3 mx-auto mb-6 animate-pulse"></div>
              <div className="h-8 bg-cream-200 dark:bg-gray-700 rounded-lg w-2/3 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-cream-200 dark:bg-gray-700 rounded-2xl mb-6"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-8 bg-cream-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
                    <div className="h-6 bg-cream-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
                    <div className="h-12 bg-cream-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          Wellness Services - Meditation, Yoga & Nature Therapy | Mayur Wellness
        </title>
        <meta
          name="description"
          content="Explore our comprehensive wellness services including meditation retreats, yoga classes, nature therapy, and mindfulness programs at Mayur Wellness Nepal. Book your transformative wellness experience today."
        />
        <meta
          name="keywords"
          content="wellness services, meditation retreats, yoga classes, nature therapy, mindfulness programs, wellness packages, health retreats, spiritual healing, holistic wellness, Nepal wellness services"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/services`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: servicesStructuredData,
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-100 dark:from-gray-900 dark:to-gray-800 pt-24">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-gray-300 mb-6 tracking-tight">
              Explore Our Wellness Experiences
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Embark on a journey of wellness, adventure, and discovery with our
              curated services designed to transform your mind, body, and
              spirit.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-16 justify-center"
          >
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={
                  selectedCategory === category.value ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-sm cursor-pointer",
                  selectedCategory === category.value
                    ? "bg-green-600 hover:bg-green-700 text-cream-50 shadow-lg"
                    : "bg-cream-50/80 dark:bg-gray-800/80 backdrop-blur-md border-cream-200 dark:border-gray-700 text-gray-900 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-gray-700"
                )}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => {
              const packages = parsePackages(service.packages);
              const durations = parseDurations(service.durations);

              // Show base price if no valid packages, otherwise show minimum package price
              const displayPrice =
                packages.length > 0
                  ? Math.min(...packages.map((p) => p.price))
                  : service.price;

              const maxDuration =
                durations.length > 0
                  ? Math.max(...durations.map((d) => d.days))
                  : 1;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Card className="h-full overflow-hidden border-0 bg-cream-50/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl group">
                    {/* Image Section */}
                    <div className="relative h-72 overflow-hidden">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={`${service.name} - Wellness service at Mayur Wellness`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-cream-200 to-green-200 dark:from-gray-700 dark:to-gray-600"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-3">
                        <Badge className="bg-green-600 text-cream-50 px-3 py-1 rounded-full text-sm font-medium">
                          {categories.find((c) => c.value === service.category)
                            ?.label || "General"}
                        </Badge>
                        {!service.isBookable && (
                          <Badge
                            variant="destructive"
                            className="bg-red-600 text-cream-50 px-3 py-1 rounded-full text-sm"
                          >
                            Unavailable
                          </Badge>
                        )}
                      </div>

                      {/* Quick Info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-cream-50 font-serif font-bold text-2xl mb-2 line-clamp-1">
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-4 text-cream-100 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Mayur Wellness</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Up to {maxDuration} days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex-grow">
                      <p className="text-gray-600 dark:text-cream-200 text-base line-clamp-2 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Package Preview - Only show if packages exist */}
                      {packages.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-medium text-green-600 dark:text-green-400 mb-3">
                            Available Packages:
                          </h4>
                          <div className="space-y-2">
                            {packages.slice(0, 2).map((pkg, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-sm bg-cream-100/50 dark:bg-gray-700/50 px-4 py-2 rounded-lg"
                              >
                                <span className="font-medium text-gray-900 dark:text-cream-50">
                                  {pkg.name}
                                </span>
                                <span className="text-green-600 dark:text-green-400 font-bold">
                                  NPR {pkg.price.toLocaleString()}
                                </span>
                              </div>
                            ))}
                            {packages.length > 2 && (
                              <p className="text-sm text-gray-500 dark:text-cream-300 text-center pt-2">
                                +{packages.length - 2} more packages
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Features Preview - Only show if packages exist and have features */}
                      {packages.length > 0 &&
                        packages[0].features.length > 0 &&
                        packages[0].features[0] !== "" && (
                          <div className="mb-6">
                            <h4 className="text-base font-medium mb-3 text-gray-700 dark:text-cream-100">
                              Package Features:
                            </h4>
                            <div className="space-y-2">
                              {packages[0].features
                                .slice(0, 3)
                                .map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-3 text-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-cream-200 line-clamp-1">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                              {packages[0].features.length > 3 && (
                                <p className="text-sm text-gray-500 dark:text-cream-300 ml-7">
                                  +{packages[0].features.length - 3} more
                                  features
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Pricing */}
                      <div className="border-t border-cream-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                            NPR {displayPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-cream-300">
                            per day
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-cream-300">
                          {packages.length > 0 ? "Starting from" : "Base price"}{" "}
                          • Deposit: {service.depositPercentage}% required
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      {service.isBookable ? (
                        <Link
                          href={`/services/${service.id}`}
                          className="w-full"
                        >
                          <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-cream-50 font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer">
                            Book Now
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          disabled
                          className="w-full py-3 rounded-xl bg-gray-400 text-cream-50 cursor-not-allowed"
                        >
                          Currently Unavailable
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-500 dark:text-cream-300">
                No services available in this category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
