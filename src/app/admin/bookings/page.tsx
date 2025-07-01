"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Table } from "lucide-react";
import BookingCalendar from "@/components/admin/BookingCalender";
import BookingTable from "@/components/admin/BookingTable";

export default function AdminBookingsPage() {
  const [activeView, setActiveView] = useState("calendar");

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Manage Bookings</CardTitle>
          <Tabs
            value={activeView}
            onValueChange={setActiveView}
            className="w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                Table View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsContent value="calendar" className="m-0">
              <BookingCalendar />
            </TabsContent>
            <TabsContent value="table" className="m-0">
              <BookingTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
