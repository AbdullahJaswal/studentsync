"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function SignupClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ email?: string; password1?: string }>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    if (password !== confirmPassword) {
      setError({ password1: "Passwords do not match" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://studentsync.abdullahjaswal.com/backend-api/auth/registration/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password1: password,
            password2: confirmPassword,
          }),
        },
      );

      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        setError({
          email: data.email?.[0],
          password1: data.password1?.[0],
        });
      } else {
        window.location.href = "/";
      }
    } catch {
      setError({ password1: "An error occurred. Please try again." });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Create your account by filling in the information below.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="mail@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error.email ? "border-red-500" : ""}
          />
          {error.email && (
            <div className="text-red-500 text-sm">{error.email}</div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error.password1 ? "border-red-500" : ""}
          />
          {error.password1 && (
            <div className="text-red-500 text-sm">{error.password1}</div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={error.password1 ? "border-red-500" : ""}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/" className="underline">
          Login
        </Link>
      </div>
    </form>
  );
}
