"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/utils/Toast";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  depositPercentage: number;
  packages: string | null;
  durations: string | null;
}

export default function BookServicePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Form state
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<Duration | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date>();
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  useEffect(() => {
    if (!session) {
      showToast("error", {
        title: "Please login first",
        description: "You need to be logged in to book a service",
      });
      router.push("/auth/login?callbackUrl=" + window.location.pathname);
      return;
    }

    fetchService();
  }, [params.id, session]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${params.id}`);
      if (!response.ok) throw new Error("Service not found");
      const data = await response.json();
      setService(data);

      // Set default selections
      const packages = parsePackages(data.packages);
      const durations = parseDurations(data.durations);

      if (packages.length > 0) setSelectedPackage(packages[0]);
      if (durations.length > 0) setSelectedDuration(durations[0]);
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to load service" });
      router.push("/services");
    } finally {
      setLoading(false);
    }
  };

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

  const calculateTotal = () => {
    if (!selectedPackage || !selectedDuration) return 0;
    return selectedPackage.price * selectedDuration.days;
  };

  const calculateDeposit = () => {
    if (!service) return 0;
    return (calculateTotal() * service.depositPercentage) / 100;
  };

  const calculateEndDate = () => {
    if (!startDate || !selectedDuration) return null;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + selectedDuration.days - 1);
    return endDate;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleBooking = async () => {
    if (!selectedPackage || !selectedDuration || !startDate || !paymentProof) {
      showToast("error", {
        title: "Missing information",
        description: "Please fill all required fields and upload payment proof",
      });
      return;
    }

    setBooking(true);
    try {
      // Create booking
      const bookingResponse = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service!.id,
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.price,
          startDate: startDate,
          endDate: calculateEndDate(),
          duration: selectedDuration.days,
          totalAmount: calculateTotal(),
          depositAmount: calculateDeposit(),
        }),
      });

      if (!bookingResponse.ok) {
        const error = await bookingResponse.json();
        throw new Error(error.error || "Failed to create booking");
      }

      const bookingData = await bookingResponse.json();

      // Upload payment proof
      const formData = new FormData();
      formData.append("paymentProof", paymentProof);
      formData.append("bookingId", bookingData.booking.id);

      const uploadResponse = await fetch("/api/bookings/payment-proof", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload payment proof");
      }

      showToast("success", {
        title: "Booking created successfully",
        description: "Your booking is pending admin approval",
      });

      router.push("/my-bookings");
    } catch (error: any) {
      console.error(error);
      showToast("error", {
        title: "Booking failed",
        description: error.message || "Failed to create booking",
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-20">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto p-6 mt-20">
        <p>Service not found</p>
      </div>
    );
  }

  const packages = parsePackages(service.packages);
  const durations = parseDurations(service.durations);

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
            <p className="text-gray-600 mb-6">{service.description}</p>

            {service.image && (
              <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Package Selection */}
          {packages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-colors",
                      selectedPackage?.name === pkg.name
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <span className="font-bold text-green-600">
                        NPR {pkg.price.toLocaleString()}/day
                      </span>
                    </div>
                    <div className="space-y-1">
                      {pkg.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Book This Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Duration Selection */}
            {durations.length > 0 && (
              <div>
                <Label>Duration</Label>
                <Select
                  value={selectedDuration?.days.toString()}
                  onValueChange={(value) => {
                    const duration = durations.find(
                      (d) => d.days.toString() === value
                    );
                    setSelectedDuration(duration || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration, index) => (
                      <SelectItem key={index} value={duration.days.toString()}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Selection */}
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date Display */}
            {startDate && selectedDuration && (
              <div>
                <Label>End Date</Label>
                <div className="p-2 bg-gray-50 rounded border">
                  {format(calculateEndDate()!, "PPP")}
                </div>
              </div>
            )}

            {/* Payment Proof Upload */}
            <div>
              <Label>Payment Proof *</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a screenshot or photo of your payment confirmation
                </p>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Package:</span>
                <span>{selectedPackage?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{selectedDuration?.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">
                  NPR {calculateTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Required Deposit ({service.depositPercentage}%):</span>
                <span>NPR {calculateDeposit().toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handleBooking}
              disabled={
                booking ||
                !selectedPackage ||
                !selectedDuration ||
                !startDate ||
                !paymentProof
              }
              className="w-full"
            >
              {booking ? "Processing..." : "Book Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
