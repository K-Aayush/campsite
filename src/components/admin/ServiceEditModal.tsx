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
import {
  ServiceFormValues,
  serviceSchema,
  scheduleSchema,
  ScheduleFormValues,
} from "../../../schemas";
import FileUpload from "@/components/admin/FileUpload";
import { Plus, Trash2, Calendar, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Package {
  name: string;
  price: number;
  features: string[];
}

interface Duration {
  days: number;
  label: string;
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
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

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
      return parsed.filter(
        (item): item is Package =>
          typeof item === "object" &&
          item !== null &&
          typeof item.name === "string" &&
          typeof item.price === "number" &&
          Array.isArray(item.features)
      );
    } catch (e) {
      console.error("Error parsing packages:", e);
      return [];
    }
  };

  const parseDurations = (durationsString: string | null): Duration[] => {
    if (!durationsString) return [];
    try {
      let parsed = JSON.parse(durationsString);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!Array.isArray(parsed)) {
        console.error("Parsed durations is not an array:", parsed);
        return [];
      }
      return parsed.filter(
        (item): item is Duration =>
          typeof item === "object" &&
          item !== null &&
          typeof item.days === "number" &&
          typeof item.label === "string"
      );
    } catch (e) {
      console.error("Error parsing durations:", e);
      return [];
    }
  };

  const parseTimeSlots = (timeSlotsString: string | null): TimeSlot[] => {
    if (!timeSlotsString) return [];
    try {
      let parsed = JSON.parse(timeSlotsString);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter(
        (item): item is TimeSlot =>
          typeof item === "object" &&
          item !== null &&
          typeof item.startTime === "string" &&
          typeof item.endTime === "string" &&
          typeof item.maxCapacity === "number"
      );
    } catch (e) {
      console.error("Error parsing time slots:", e);
      return [];
    }
  };

  const parseAvailableDates = (
    availableDatesString: string | null
  ): string[] => {
    if (!availableDatesString) return [];
    try {
      let parsed = JSON.parse(availableDatesString);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter((item): item is string => typeof item === "string");
    } catch (e) {
      console.error("Error parsing available dates:", e);
      return [];
    }
  };

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

      // Parse and set packages
      const parsedPackages = parsePackages(service.packages);
      if (parsedPackages.length > 0) {
        const validPackages = parsedPackages.map((pkg) => ({
          ...pkg,
          features:
            Array.isArray(pkg.features) && pkg.features.length > 0
              ? pkg.features
              : [""],
        }));
        setPackages(validPackages);
      } else {
        setPackages([{ name: "Basic", price: 0, features: [""] }]);
      }

      // Parse and set durations
      const parsedDurations = parseDurations(service.durations);
      if (parsedDurations.length > 0) {
        setDurations(parsedDurations);
      } else {
        setDurations([{ days: 1, label: "1 Day" }]);
      }

      // Parse and set time slots
      const parsedTimeSlots = parseTimeSlots(service.timeSlots);
      setTimeSlots(parsedTimeSlots);

      // Parse and set available dates
      const parsedAvailableDates = parseAvailableDates(service.availableDates);
      setSelectedDates(parsedAvailableDates);

      // Initialize empty schedules (these would need to be fetched from API)
      setSchedules([]);
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

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
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
    if (!service) return;

    setLoading(true);

    try {
      // Validate packages - remove empty packages
      const validPackages = packages
        .filter((pkg) => pkg.name.trim() !== "" && pkg.price >= 0)
        .map((pkg) => ({
          ...pkg,
          features: pkg.features.filter((feature) => feature.trim() !== ""),
        }));

      // Validate durations
      const validDurations = durations.filter(
        (duration) => duration.days > 0 && duration.label.trim() !== ""
      );

      const updateData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        depositPercentage: parseFloat(data.depositPercentage),
        maxCapacity: parseInt(data.maxCapacity),
        image: imageUrl || data.image,
        isBookable: data.isBookable,
        category: data.category || "general",
        packages: JSON.stringify(validPackages),
        durations: JSON.stringify(validDurations),
        timeSlots: JSON.stringify(timeSlots),
        availableDates: JSON.stringify(selectedDates),
        startDate: data.startDate || null,
        endDate: data.endDate || null,
      };

      console.log("Sending update data:", updateData);

      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update service");
      }

      const result = await response.json();
      console.log("Update result:", result);

      showToast("success", { title: "Service updated successfully" });
      onServiceUpdated();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      showToast("error", {
        title: "Failed to update service",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setImageUrl("");
    setPackages([{ name: "Basic", price: 0, features: [""] }]);
    setDurations([{ days: 1, label: "1 Day" }]);
    setTimeSlots([]);
    setSelectedDates([]);
    setSchedules([]);
    onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service: {service?.name}</DialogTitle>
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

            {/* Schedules */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Specific Schedules (Optional)</FormLabel>
                <Button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(true)}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schedule
                </Button>
              </div>

              {schedules.length > 0 && (
                <div className="space-y-2">
                  {schedules.map((schedule, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Calendar className="h-3 w-3" />
                            {new Date(schedule.date).toLocaleDateString()}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Clock className="h-3 w-3" />
                            {schedule.startTime} - {schedule.endTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Users className="h-3 w-3" />
                            {schedule.maxCapacity} people
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSchedule(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule Modal */}
            {isScheduleModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold mb-4">Add Schedule</h3>
                  <form
                    onSubmit={handleScheduleFormSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Date
                      </label>
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
