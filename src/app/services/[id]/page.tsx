"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { showToast } from "@/utils/Toast";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isBookable: boolean;
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
      <div className="container mx-auto p-6">
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link href={`/services/${service.id}`} key={service.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              {service.image && (
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  {!service.isBookable && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Unavailable
                    </div>
                  )}
                </div>
              )}
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {service.description}
                </p>
                <p className="text-lg font-bold text-green-600">
                  NPR {service.price}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <button
                  className={`w-full py-2 px-4 rounded ${
                    service.isBookable
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!service.isBookable}
                >
                  {service.isBookable ? "Book Now" : "Currently Unavailable"}
                </button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
