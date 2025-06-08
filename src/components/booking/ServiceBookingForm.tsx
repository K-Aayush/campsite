"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { showToast } from "@/utils/Toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";

interface ServiceBookingFormProps {
  service: {
    id: string;
    name: string;
    price: number;
    depositPercentage: number;
  };
}

export default function ServiceBookingForm({
  service,
}: ServiceBookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  const onSubmit = async (data: any) => {
    if (!session) {
      showToast("error", {
        title: "Please login first",
        description: "You need to be logged in to make a booking",
      });
      router.push("/auth/login?callbackUrl=/booknow");
      return;
    }

    if (!paymentProof) {
      showToast("error", {
        title: "Payment proof required",
        description: "Please upload your payment proof",
      });
      return;
    }

    setLoading(true);
    try {
      // First create the booking
      const bookingResponse = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          startDate: data.startDate,
          endDate: data.endDate,
          totalAmount: service.price,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      const bookingData = await bookingResponse.json();

      // Then upload the payment proof
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
      router.push(`/dashboard/bookings/${bookingData.booking.id}`);
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to create booking" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < form.getValues("startDate") ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Total Amount: NPR {service.price}
          </p>
          <p className="text-sm text-gray-500">
            Required Deposit ({service.depositPercentage}%): NPR{" "}
            {(service.price * service.depositPercentage) / 100}
          </p>
        </div>

        <div className="space-y-2">
          <FormLabel>Payment Proof</FormLabel>
          <Input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-xs text-gray-500">
            Please upload a screenshot or photo of your payment confirmation
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Processing..." : "Book Now"}
        </Button>
      </form>
    </Form>
  );
}
