"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/utils/Toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ServiceFormValues, serviceSchema } from "../../../../schemas";
import FileUpload from "@/components/admin/FileUpload";
import { Plus, Trash2 } from "lucide-react";

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

interface Package {
  name: string;
  price: number;
  features: string[];
}

interface Duration {
  days: number;
  label: string;
}

export default function AdminServicesPage() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
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
    },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to fetch services" });
    }
  };

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
    setLoading(true);

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          depositPercentage: parseFloat(data.depositPercentage),
          image: imageUrl || data.image,
          packages: JSON.stringify(packages),
          durations: JSON.stringify(durations),
        }),
      });

      if (!response.ok) throw new Error("Failed to add service");

      showToast("success", { title: "Service added successfully" });
      form.reset();
      setImageUrl("");
      setPackages([{ name: "Basic", price: 0, features: [""] }]);
      setDurations([{ days: 1, label: "1 Day" }]);
      fetchServices();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to add service" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete service");

      showToast("success", { title: "Service deleted successfully" });
      fetchServices();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to delete service" });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Services</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Service name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Category Selection */}
              <div>
                <FormLabel>Category</FormLabel>
                <Select defaultValue="general">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">
                      Educational Adventures
                    </SelectItem>
                    <SelectItem value="camping">Camping Experiences</SelectItem>
                    <SelectItem value="wellness">Wellness Retreat</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
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

              <Button type="submit" disabled={loading} className="min-w-32">
                {loading ? "Adding..." : "Add Service"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              {service.image && (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {service.description}
              </p>
              <p className="font-bold mb-2">
                Base Price: NPR {service.price.toLocaleString()}
              </p>

              {service.packages && (
                <div className="mb-2">
                  <p className="text-sm font-medium">Packages:</p>
                  {JSON.parse(service.packages).map(
                    (pkg: any, index: number) => (
                      <p key={index} className="text-xs text-gray-500">
                        {pkg.name}: NPR {pkg.price}
                      </p>
                    )
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  {!service.isBookable && (
                    <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                      Not Available
                    </span>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
