"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function AddCalendarClient() {
  const { data: session } = useSession();

  const router = useRouter();
  const [calendarUrl, setCalendarUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (session) {
      try {
        const response = await fetch(
          `${publicRuntimeConfig.NEXT_PUBLIC_URL}/event/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access}`,
            },
            body: JSON.stringify({
              url: calendarUrl,
            }),
          },
        );

        if (response.ok) {
          setSuccess(true);
          setError(null);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setSuccess(false);
          setError("Failed to add calendar. Please check the URL.");
        }
      } catch (error) {
        setSuccess(false);
        setError("An unexpected error occurred. Please try again.");
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Add Calendar</CardTitle>
        <CardDescription>
          Add your calendar feed to sync your events with StudentSync.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              placeholder="Calendar URL"
              value={calendarUrl}
              onChange={(e) => setCalendarUrl(e.target.value)}
              className={`w-full ${error ? "border-red-500" : success ? "border-green-500" : ""}`}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && (
              <p className="text-emerald-500 mt-2">
                Events added successfully! Redirecting...
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
