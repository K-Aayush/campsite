"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/Toast";
import PaymentOptions from "./PaymentOptions";

interface SummaryPanelProps {
  selectedPackage: { name: string; price: number };
  selectedDuration: number;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  selectedPackage,
  selectedDuration,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const totalPrice = selectedPackage.price * selectedDuration;

  const handleBooking = async () => {
    if (!session) {
      showToast("error", {
        title: "Please login first",
        description: "You need to be logged in to make a booking",
      });
      router.push("/auth/login?callbackUrl=/booknow");
      return;
    }

    setShowPaymentOptions(true);
  };

  const handlePayment = async (method: "esewa" | "khalti") => {
    try {
      // Create booking
      const bookingResponse = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageType: "Standard",
          packageName: selectedPackage.name,
          startDate: new Date(),
          endDate: new Date(
            Date.now() + selectedDuration * 24 * 60 * 60 * 1000
          ),
          numberOfDays: selectedDuration,
          totalAmount: totalPrice,
        }),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(bookingData.error || "Failed to create booking");
      }

      // Initialize payment based on selected method
      const paymentEndpoint = method === "esewa" ? "esewa" : "khalti";
      const paymentResponse = await fetch(`/api/payment/${paymentEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingData.booking.id,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || "Failed to initialize payment");
      }

      // Create form and submit to payment gateway
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute(
        "action",
        method === "esewa"
          ? "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          : paymentData.paymentUrl
      );

      for (const [key, value] of Object.entries(
        method === "esewa" ? paymentData.esewaData : paymentData.khaltiData
      )) {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", value as string);
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Booking error:", error);
      showToast("error", {
        title: "Booking failed",
        description: "There was an error processing your booking",
      });
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 lg:sticky lg:top-20 lg:right-8 w-full max-w-xs p-6 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-green-500 dark:text-green-400 mb-4">
          Your Selection
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-200">Package:</span>
            <span className="text-gray-700 dark:text-gray-200">
              {selectedPackage.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-200">Price:</span>
            <span className="text-gray-700 dark:text-gray-200">
              NPR {selectedPackage.price}/day
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-200">Duration:</span>
            <span className="text-gray-700 dark:text-gray-200">
              {selectedDuration} {selectedDuration === 1 ? "Day" : "Days"}
            </span>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-600 my-3"></div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Total:
            </span>
            <span className="text-lg font-bold text-green-500 dark:text-green-400">
              NPR {totalPrice}
            </span>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4"
        >
          <Button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-2 rounded-full font-semibold hover:shadow-xl"
          >
            {session ? "Book Now" : "Login to Book"}
          </Button>
        </motion.div>
      </motion.div>

      <PaymentOptions
        isOpen={showPaymentOptions}
        onClose={() => setShowPaymentOptions(false)}
        onSelectPayment={handlePayment}
        amount={totalPrice}
      />
    </>
  );
};

export default SummaryPanel;
