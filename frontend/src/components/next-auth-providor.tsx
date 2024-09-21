"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NextAuthProvider({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: any }>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
