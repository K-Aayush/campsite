"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { showToast } from "@/utils/Toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, Users, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Service {
  id: string;
  name: string;
  maxCapacity: number;
  currentBookings: number;
}

interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  currentBookings: number;
  availableSpots: number;
  isAvailable: boolean;
}

interface ServiceAvailabilityManagerProps {
  serviceId: string;
}

export default function ServiceAvailabilityManager({
  serviceId,
}: ServiceAvailabilityManagerProps) {
  const [service, setService] = useState<Service | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date: "",
    startTime: "",
    endTime: "",
    maxCapacity: 10,
  });

  useEffect(() => {
    fetchAvailability();
  }, [serviceId]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${serviceId}/availability`);
      if (!response.ok) throw new Error("Failed to fetch availability");

      const data = await response.json();
      setService(data.service);
      setSchedules(data.schedules);
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to fetch availability data" });
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async () => {
    if (!newSchedule.date || !newSchedule.startTime || !newSchedule.endTime) {
      showToast("error", { title: "Please fill all schedule fields" });
      return;
    }

    try {
      const response = await fetch(`/api/services/${serviceId}/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });

      if (!response.ok) throw new Error("Failed to add schedule");

      showToast("success", { title: "Schedule added successfully" });
      setNewSchedule({
        date: "",
        startTime: "",
        endTime: "",
        maxCapacity: 10,
      });
      setIsAddingSchedule(false);
      fetchAvailability();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to add schedule" });
    }
  };

  const deleteSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;

    try {
      const response = await fetch(
        `/api/services/${serviceId}/schedules/${scheduleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete schedule");

      showToast("success", { title: "Schedule deleted successfully" });
      fetchAvailability();
    } catch (error) {
      console.error(error);
      showToast("error", { title: "Failed to delete schedule" });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Service Availability
          </CardTitle>
          <Dialog open={isAddingSchedule} onOpenChange={setIsAddingSchedule}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, date: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Start Time
                    </label>
                    <Input
                      type="time"
                      value={newSchedule.startTime}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      End Time
                    </label>
                    <Input
                      type="time"
                      value={newSchedule.endTime}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Capacity
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={newSchedule.maxCapacity}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        maxCapacity: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
                <Button onClick={addSchedule} className="w-full">
                  Add Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {service && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">{service.name}</h3>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                {service.currentBookings}/{service.maxCapacity} booked
              </Badge>
              <Badge
                variant={
                  service.currentBookings < service.maxCapacity
                    ? "default"
                    : "destructive"
                }
              >
                {service.currentBookings < service.maxCapacity
                  ? "Available"
                  : "Full"}
              </Badge>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="font-medium">Scheduled Sessions</h4>
          {schedules.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No schedules found. Add a schedule to manage availability.
            </p>
          ) : (
            schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(schedule.date), "MMM dd, yyyy")}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {schedule.startTime} - {schedule.endTime}
                  </Badge>
                  <Badge
                    variant={schedule.isAvailable ? "default" : "destructive"}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-3 w-3" />
                    {schedule.currentBookings}/{schedule.maxCapacity}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {schedule.availableSpots} spots left
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
