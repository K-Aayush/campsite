"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/Toast";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  isBookable: boolean;
  depositPercentage: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="h-full hover:shadow-lg transition-shadow"
          >
            {service.image && (
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                {!service.isBookable && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive">Unavailable</Badge>
                  </div>
                )}
              </div>
            )}
            <CardContent className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {service.description}
              </p>
              <div className="space-y-1">
                <p className="text-lg font-bold text-green-600">
                  NPR {service.price.toLocaleString()}/day
                </p>
                <p className="text-xs text-gray-500">
                  Deposit: {service.depositPercentage}% required
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              {service.isBookable ? (
                <Link href={`/book-service/${service.id}`} className="w-full">
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
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No services available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
