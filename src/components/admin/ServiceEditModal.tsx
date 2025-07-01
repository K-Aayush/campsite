"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/utils/Toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceFormValues, serviceSchema } from "../../../schemas";
import FileUpload from "@/components/admin/FileUpload";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  maxCapacity: number;
  startDate: string | null;
  endDate: string | null;
  availableDates: string | null;
  timeSlots: string | null;
}

interface ServiceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onServiceUpdated: () => void;
}

export default function ServiceEditModal({
  isOpen,
  onClose,
  service,
  onServiceUpdated,
}: ServiceEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [packages, setPackages] = useState<Package[]>([
    { name: "Basic", price: 0, features: [""] },
  ]);
  const [durations, setDurations] = useState<Duration[]>([
    { days: 1, label: "1 Day" },
  ]);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      isBookable: true,
      depositPercentage: "20",
      maxCapacity: "10",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (service && isOpen) {
      // Reset form with service data
      form.reset({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        image: service.image || "",
        isBookable: service.isBookable,
        depositPercentage: service.depositPercentage.toString(),
        category: service.category,
        maxCapacity: service.maxCapacity.toString(),
        startDate: service.startDate ? service.startDate.split("T")[0] : "",
        endDate: service.endDate ? service.endDate.split("T")[0] : "",
      });

      setImageUrl(service.image || "");

      // Parse packages
      if (service.packages) {
        try {
          const parsedPackages = JSON.parse(service.packages);
          if (Array.isArray(parsedPackages) && parsedPackages.length > 0) {
            setPackages(parsedPackages);
          }
        } catch (e) {
          console.error("Error parsing packages:", e);
        }
      }

      // Parse durations
      if (service.durations) {
        try {
          const parsedDurations = JSON.parse(service.durations);
          if (Array.isArray(parsedDurations) && parsedDurations.length > 0) {
            setDurations(parsedDurations);
          }
        } catch (e) {
          console.error("Error parsing durations:", e);
        }
      }
    }
  }, [service, isOpen, form]);

  const addPackage = () => {
    setPackages([...packages, { name: "", price: 0, features: [""] }]);
  };

  const removePackage = (index: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter((_, i) => i !== index));
    }
  };

  const updatePackage = (index: number, field: keyof Package, value: any) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackages(updated);
  };

  const addFeature = (packageIndex: number) => {
    const updated = [...packages];
    updated[packageIndex].features.push("");
    setPackages(updated);
  };

  const removeFeature = (packageIndex: number, featureIndex: number) => {
    const updated = [...packages];
    if (updated[packageIndex].features.length > 1) {
      updated[packageIndex].features.splice(featureIndex, 1);
      setPackages(updated);
    }
  };

  const updateFeature = (
    packageIndex: number,
    featureIndex: number,
    value: string
  ) => {
    const updated = [...packages];
    updated[packageIndex].features[featureIndex] = value;
    setPackages(updated);
  };

  const addDuration = () => {
    setDurations([...durations, { days: 1, label: "1 Day" }]);
  };

  const removeDuration = (index: number) => {
    if (durations.length > 1) {
      setDurations(durations.filter((_, i) => i !== index));
    }
  };

  const updateDuration = (index: number, days: number) => {
    const updated = [...durations];
    updated[index] = { days, label: `${days} ${days === 1 ? "Day" : "Days"}` };
    setDurations(updated);
  };

  const onSubmit = async (data: ServiceFormValues) => {
    if (!service) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          depositPercentage: parseFloat(data.depositPercentage),
          maxCapacity: parseInt(data.maxCapacity),
          image: imageUrl || data.image,
          packages: JSON.stringify(packages),
          durations: JSON.stringify(durations),
        }),
      });

      if (!response.ok) throw new Error("Failed to update service");

      showToast("success", { title: "Service updated successfully" });
      onServiceUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to update service" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setImageUrl("");
    setPackages([{ name: "Basic", price: 0, features: [""] }]);
    setDurations([{ days: 1, label: "1 Day" }]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Service name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="education">
                          Educational Adventures
                        </SelectItem>
                        <SelectItem value="camping">
                          Camping Experiences
                        </SelectItem>
                        <SelectItem value="wellness">
                          Wellness Retreat
                        </SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Service description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pricing and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price (NPR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="depositPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Percentage (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        {...field}
                        placeholder="20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        placeholder="10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Service Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Start Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Packages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Packages</FormLabel>
                <Button type="button" onClick={addPackage} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Package
                </Button>
              </div>

              {packages.map((pkg, packageIndex) => (
                <Card key={packageIndex} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Package name"
                        value={pkg.name}
                        onChange={(e) =>
                          updatePackage(packageIndex, "name", e.target.value)
                        }
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        value={pkg.price}
                        onChange={(e) =>
                          updatePackage(
                            packageIndex,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-32"
                      />
                      {packages.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removePackage(packageIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel>Features</FormLabel>
                        <Button
                          type="button"
                          onClick={() => addFeature(packageIndex)}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Feature
                        </Button>
                      </div>

                      {pkg.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <Input
                            placeholder="Feature description"
                            value={feature}
                            onChange={(e) =>
                              updateFeature(
                                packageIndex,
                                featureIndex,
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                          {pkg.features.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                removeFeature(packageIndex, featureIndex)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Durations Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Available Durations</FormLabel>
                <Button type="button" onClick={addDuration} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Duration
                </Button>
              </div>

              {durations.map((duration, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="Days"
                    value={duration.days}
                    onChange={(e) =>
                      updateDuration(index, parseInt(e.target.value) || 1)
                    }
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600">
                    {duration.days === 1 ? "Day" : "Days"}
                  </span>
                  {durations.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDuration(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <FileUpload
                label="Service Image"
                acceptedTypes="image/*"
                maxSize={5}
                uploadPath="services"
                currentFile={imageUrl}
                onUploadComplete={(url) => setImageUrl(url)}
              />
            </div>

            <FormField
              control={form.control}
              name="isBookable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Available for Booking</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="min-w-32">
                {loading ? "Updating..." : "Update Service"}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
