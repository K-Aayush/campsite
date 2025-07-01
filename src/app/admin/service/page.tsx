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
import {
  ServiceFormValues,
  serviceSchema,
  scheduleSchema,
  ScheduleFormValues,
} from "../../../../schemas";
import FileUpload from "@/components/admin/FileUpload";
import { Plus, Trash2, Calendar, Users, Edit, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import ServiceEditModal from "@/components/admin/ServiceEditModal";

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
  currentBookings: number;
  status: string;
  startDate: string | null;
  endDate: string | null;
  availableDates: string | null;
  timeSlots: string | null;
}

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  maxCapacity: number;
}

export default function AdminServicesPage() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [packages, setPackages] = useState<Package[]>([
    { name: "Basic", price: 0, features: [""] },
  ]);
  const [durations, setDurations] = useState<Duration[]>([
    { days: 1, label: "1 Day" },
  ]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const scheduleForm = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      maxCapacity: "10",
    },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services based on search term
    if (searchTerm.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
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

  const addTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      { startTime: "", endTime: "", maxCapacity: 10 },
    ]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: any) => {
    const updated = [...timeSlots];
    updated[index] = { ...updated[index], [field]: value };
    setTimeSlots(updated);
  };

  const handleScheduleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const data = {
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      maxCapacity: formData.get("maxCapacity") as string,
    };

    if (!data.date || !data.startTime || !data.endTime) {
      showToast("error", { title: "Please fill all schedule fields" });
      return;
    }

    addSchedule(data, e);
  };

  const addSchedule = (
    data: ScheduleFormValues,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const newSchedule: Schedule = {
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      maxCapacity: parseInt(data.maxCapacity),
    };
    setSchedules([...schedules, newSchedule]);
    scheduleForm.reset();
    setIsScheduleModalOpen(false);
    showToast("success", { title: "Schedule added successfully" });
  };

  const addSelectedDate = (date: string) => {
    if (!selectedDates.includes(date)) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const removeSelectedDate = (date: string) => {
    setSelectedDates(selectedDates.filter((d) => d !== date));
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
          maxCapacity: parseInt(data.maxCapacity),
          image: imageUrl || data.image,
          packages: JSON.stringify(packages),
          durations: JSON.stringify(durations),
          schedules: JSON.stringify(schedules),
          timeSlots: JSON.stringify(timeSlots),
          availableDates: JSON.stringify(selectedDates),
        }),
      });

      if (!response.ok) throw new Error("Failed to add service");

      showToast("success", { title: "Service added successfully" });
      form.reset();
      setImageUrl("");
      setPackages([{ name: "Basic", price: 0, features: [""] }]);
      setDurations([{ days: 1, label: "1 Day" }]);
      setSchedules([]);
      setTimeSlots([]);
      setSelectedDates([]);
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

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500";
      case "INACTIVE":
        return "bg-gray-500";
      case "SCHEDULED":
        return "bg-blue-500";
      case "COMPLETED":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Services</h1>

        {/* Search Bar */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search services by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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

              {/* Available Dates */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Available Dates (Optional)</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      onChange={(e) => {
                        if (e.target.value) {
                          addSelectedDate(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="w-auto"
                    />
                  </div>
                </div>
                {selectedDates.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedDates.map((date, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-3 w-3" />
                        {new Date(date).toLocaleDateString()}
                        <button
                          type="button"
                          onClick={() => removeSelectedDate(date)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Time Slots (Optional)</FormLabel>
                  <Button type="button" onClick={addTimeSlot} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>

                {timeSlots.map((slot, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            updateTimeSlot(index, "startTime", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>End Time</FormLabel>
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            updateTimeSlot(index, "endTime", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>Max Capacity</FormLabel>
                        <Input
                          type="number"
                          min="1"
                          value={slot.maxCapacity}
                          onChange={(e) =>
                            updateTimeSlot(
                              index,
                              "maxCapacity",
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeTimeSlot(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
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

              <Button type="submit" disabled={loading} className="min-w-32">
                {loading ? "Adding..." : "Add Service"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add Schedule</h3>
            <form onSubmit={handleScheduleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Max Capacity
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  min="1"
                  defaultValue="10"
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Add Schedule
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsScheduleModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          All Services ({filteredServices.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
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

                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {service.currentBookings}/{service.maxCapacity}
                  </Badge>
                </div>

                {service.startDate && service.endDate && (
                  <div className="text-xs text-gray-500 mb-2">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {new Date(service.startDate).toLocaleDateString()} -{" "}
                    {new Date(service.endDate).toLocaleDateString()}
                  </div>
                )}

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

                <div className="flex items-center justify-between gap-2">
                  <div>
                    {!service.isBookable && (
                      <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        Not Available
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No services found matching {searchTerm}
            </p>
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      <ServiceEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingService(null);
        }}
        service={editingService}
        onServiceUpdated={fetchServices}
      />
    </div>
  );
}
