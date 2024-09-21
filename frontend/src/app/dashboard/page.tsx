import type { Metadata } from "next";
import fetchData from "@/utils/fetchData";
import { redirect } from "next/navigation";
import DashboardPosts from "@/components/dashboard/posts";

export const metadata: Metadata = {
  title: "Dashboard - StudentSync",
  description:
    "StudentSync is a platform for students to manage their academic life.",
};

export default async function Dashboard() {
  const user_calendar = await fetchData("event/calendar/");

  if (!user_calendar || user_calendar.length === 0) {
    redirect("/dashboard/calendar");
  }

  return <DashboardPosts />;
}
