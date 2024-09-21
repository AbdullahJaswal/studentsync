import type { Metadata } from "next";
import DashboardPosts from "@/components/dashboard/posts";

export const metadata: Metadata = {
  title: "Dashboard - StudentSync",
  description:
    "StudentSync is a platform for students to manage their academic life.",
};

export default function Dashboard() {
  return <DashboardPosts />;
}
