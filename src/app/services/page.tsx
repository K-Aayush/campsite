"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/Toast";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users } from "lucide-react";

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
      return JSON.parse(packagesString);
    } catch {
      return [];
    }
  };

  const parseDurations = (durationsString: string | null): Duration[] => {
    if (!durationsString) return [];
    try {
      return JSON.parse(durationsString);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our range of wellness and adventure services designed to
          rejuvenate your mind, body, and spirit.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={
              selectedCategory === category.value ? "default" : "outline"
            }
            onClick={() => setSelectedCategory(category.value)}
            className="mb-2"
          >
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const packages = parsePackages(service.packages);
          const durations = parseDurations(service.durations);
          const minPackagePrice =
            packages.length > 0
              ? Math.min(...packages.map((p) => p.price))
              : service.price;
          const maxDuration =
            durations.length > 0
              ? Math.max(...durations.map((d) => d.days))
              : 1;

          return (
            <Card
              key={service.id}
              className="h-full hover:shadow-lg transition-shadow overflow-hidden"
            >
              {service.image && (
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  {!service.isBookable && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive">Unavailable</Badge>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-600 text-white">
                      {categories.find((c) => c.value === service.category)
                        ?.label || "General"}
                    </Badge>
                  </div>
                </div>
              )}

              <CardContent className="p-4 flex-grow">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {service.description}
                </p>

                {/* Package Information */}
                {packages.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-green-600 mb-2">
                      Available Packages:
                    </h3>
                    <div className="space-y-2">
                      {packages.slice(0, 2).map((pkg, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="font-medium">{pkg.name}</span>
                          <span className="text-green-600">
                            NPR {pkg.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      {packages.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{packages.length - 2} more packages
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Duration and Features */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Up to {maxDuration} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>All levels</span>
                  </div>
                </div>

                {/* Sample Features */}
                {packages.length > 0 && packages[0].features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Includes:</h4>
                    <div className="space-y-1">
                      {packages[0].features
                        .slice(0, 3)
                        .map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      {packages[0].features.length > 3 && (
                        <p className="text-xs text-gray-500 ml-5">
                          +{packages[0].features.length - 3} more features
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      From NPR {minPackagePrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">per day</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Deposit: {service.depositPercentage}% required
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                {service.isBookable ? (
                  <Link href={`/services/${service.id}`} className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Book Now
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Currently Unavailable
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No services available in this category.
          </p>
        </div>
      )}
    </div>
  );
}
