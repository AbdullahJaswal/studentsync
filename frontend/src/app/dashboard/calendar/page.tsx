import React from "react";
import { redirect } from "next/navigation";
import AddCalendarClient from "@/components/calendar/add-calendar";
import fetchData from "@/utils/fetchData";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Calendar Events - StudentSync",
  description:
    "StudentSync is a platform for students to manage their academic life.",
};

export default async function AddCalendar() {
  const user_calendar = await fetchData("event/calendar/");

  if (user_calendar && user_calendar.length > 0) {
    redirect("/dashboard/calendar");
  }

  return (
    <div className="max-w-7xl mx-auto mt-40 sm:px-6 lg:px-8">
      <AddCalendarClient />
    </div>
  );
}
