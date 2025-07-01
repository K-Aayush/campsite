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
import {
  CalendarIcon,
  CheckCircle,
  Star,
  Clock,
  Users,
  MapPin,
  Phone,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import QRPaymentModal from "@/components/booking/QRPaymentModel";

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
  category: string;
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "ESEWA" | "KHALTI" | "FONE_PAY" | null
  >(null);
  const [showQRModal, setShowQRModal] = useState(false);
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

      if (packages.length > 0 && packages[0].name && packages[0].price > 0) {
        setSelectedPackage(packages[0]);
      }

      if (durations.length > 0) {
        setSelectedDuration(durations[0]);
      } else {
        setSelectedDuration({ days: 1, label: "1 Day" });
      }
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
      let parsed = JSON.parse(packagesString);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!Array.isArray(parsed)) {
        console.error("Parsed packages is not an array:", parsed);
        return [];
      }
      const validPackages = parsed.filter(
        (item): item is Package =>
          typeof item === "object" &&
          item !== null &&
          typeof item.name === "string" &&
          item.name.trim() !== "" &&
          typeof item.price === "number" &&
          item.price > 0 &&
          Array.isArray(item.features)
      );
      return validPackages;
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

  const calculateTotal = () => {
    if (!service) return 0;
    const basePrice = selectedPackage ? selectedPackage.price : service.price;
    const duration = selectedDuration ? selectedDuration.days : 1;
    return basePrice * duration;
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

  const handlePaymentMethodSelect = (
    method: "ESEWA" | "KHALTI" | "FONE_PAY"
  ) => {
    setSelectedPaymentMethod(method);
    if (method === "ESEWA" || method === "KHALTI" || method === "FONE_PAY") {
      setShowQRModal(true);
    }
  };

  const handleQRPaymentComplete = (proof: File) => {
    setPaymentProof(proof);
    setShowQRModal(false);
    showToast("success", { title: "Payment proof uploaded successfully!" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleBooking = async () => {
    if (!selectedDuration || !startDate || !phoneNumber.trim()) {
      showToast("error", {
        title: "Missing information",
        description: "Please fill all required fields including phone number",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      showToast("error", {
        title: "Payment method required",
        description: "Please select a payment method",
      });
      return;
    }

    if (
      (selectedPaymentMethod === "ESEWA" ||
        selectedPaymentMethod === "KHALTI" ||
        selectedPaymentMethod === "FONE_PAY") &&
      !paymentProof
    ) {
      showToast("error", {
        title: "Payment proof required",
        description:
          "Please upload payment proof for the selected payment method",
      });
      return;
    }

    setBooking(true);
    try {
      const bookingResponse = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service!.id,
          packageName: selectedPackage ? selectedPackage.name : "Base Service",
          packagePrice: selectedPackage
            ? selectedPackage.price
            : service!.price,
          startDate: startDate,
          endDate: calculateEndDate(),
          duration: selectedDuration.days,
          totalAmount: calculateTotal(),
          depositAmount: calculateDeposit(),
          phoneNumber: phoneNumber,
          paymentMethod: selectedPaymentMethod,
        }),
      });

      if (!bookingResponse.ok) {
        const error = await bookingResponse.json();
        throw new Error(error.error || "Failed to create booking");
      }

      const bookingData = await bookingResponse.json();

      if (paymentProof) {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Service not found
          </p>
        </div>
      </div>
    );
  }

  const packages = parsePackages(service.packages);
  const durations = parseDurations(service.durations);
  const displayPackages = packages.length > 0 ? packages : [];
  const displayDurations =
    durations.length > 0 ? durations : [{ days: 1, label: "1 Day" }];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your Experience
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Reserve your spot for an unforgettable journey with us
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="relative h-64 md:h-80">
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>Mayur Wellness Camp</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>All levels welcome</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>

              {/* Package Selection */}
              {displayPackages.length > 0 && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                      Choose Your Package (Optional)
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You can book at base price or choose a package for
                      additional features
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div
                        onClick={() => setSelectedPackage(null)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPackage === null
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-600 hover:border-green-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Base Service
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Standard service features
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                              NPR {service.price.toLocaleString()}/day
                            </span>
                          </div>
                        </div>
                      </div>

                      {displayPackages.map((pkg, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPackage?.name === pkg.name
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-green-300"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {pkg.name}
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                NPR {pkg.price.toLocaleString()}/day
                              </span>
                            </div>
                          </div>
                          {pkg.features &&
                            pkg.features.length > 0 &&
                            pkg.features[0] !== "" && (
                              <div className="grid md:grid-cols-2 gap-2">
                                {pkg.features
                                  .slice(0, 4)
                                  .map((feature, featureIndex) => (
                                    <div
                                      key={featureIndex}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                                {pkg.features.length > 4 && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 col-span-2">
                                    +{pkg.features.length - 4} more features
                                  </p>
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Duration Selection */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                    Select Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {displayDurations.length > 0 ? (
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Duration
                      </Label>
                      <Select
                        value={selectedDuration?.days.toString() || ""}
                        onValueChange={(value) => {
                          const duration = displayDurations.find(
                            (d) => d.days.toString() === value
                          );
                          setSelectedDuration(duration || null);
                        }}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {displayDurations.map((duration, index) => (
                            <SelectItem
                              key={index}
                              value={duration.days.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {duration.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Duration
                      </Label>
                      <p className="text-sm text-gray-500">Default: 1 Day</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
                    Complete Your Booking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Start Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
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

                  {startDate && selectedDuration && (
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        End Date
                      </Label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {format(calculateEndDate()!, "PPP")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Payment Method <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={
                          selectedPaymentMethod === "ESEWA"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handlePaymentMethodSelect("ESEWA")}
                        className="h-12 flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        eSewa
                      </Button>
                      <Button
                        type="button"
                        variant={
                          selectedPaymentMethod === "KHALTI"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handlePaymentMethodSelect("KHALTI")}
                        className="h-12 flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        Khalti
                      </Button>

                      <Button
                        type="button"
                        variant={
                          selectedPaymentMethod === "FONE_PAY"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handlePaymentMethodSelect("FONE_PAY")}
                        className="h-12 flex items-center gap-2"
                      >
                        🏦 Fone Pay
                      </Button>
                    </div>
                  </div>

                  {selectedPaymentMethod === "FONE_PAY" && (
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Payment Proof <span className="text-red-500">*</span>
                      </Label>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="cursor-pointer h-12"
                        />
                        <p className="text-xs text-gray-500">
                          Upload bank transfer receipt or screenshot
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentProof && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        ✓ Payment proof uploaded: {paymentProof.name}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Service:
                      </span>
                      <span className="font-medium">
                        {selectedPackage
                          ? selectedPackage.name
                          : "Base Service"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Duration:
                      </span>
                      <span className="font-medium">
                        {selectedDuration?.label || "1 Day"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Price per day:
                      </span>
                      <span className="font-medium">
                        NPR{" "}
                        {(selectedPackage
                          ? selectedPackage.price
                          : service.price
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-green-600 dark:text-green-400">
                          NPR {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>
                          Required Deposit ({service.depositPercentage}%):
                        </span>
                        <span>NPR {calculateDeposit().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    disabled={
                      booking ||
                      !selectedDuration ||
                      !startDate ||
                      !phoneNumber.trim() ||
                      !selectedPaymentMethod ||
                      ((selectedPaymentMethod === "ESEWA" ||
                        selectedPaymentMethod === "KHALTI" ||
                        selectedPaymentMethod === "FONE_PAY") &&
                        !paymentProof)
                    }
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300"
                  >
                    {booking ? "Processing..." : "Confirm Booking"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <QRPaymentModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        paymentMethod={
          selectedPaymentMethod === "ESEWA" ||
          selectedPaymentMethod === "KHALTI" ||
          selectedPaymentMethod === "FONE_PAY"
            ? selectedPaymentMethod
            : null
        }
        amount={calculateDeposit()}
        onPaymentComplete={handleQRPaymentComplete}
      />
    </>
  );
}
