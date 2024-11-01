import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import React from "react";
import Footer from "@/components/footer/footer";

import { Inter as Font } from "next/font/google";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import NextAuthProvider from "@/components/next-auth-providor";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudentSync",
  description:
    "StudentSync is a platform for students to manage their academic life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <section className="mx-auto flex min-h-screen flex-col justify-between">
              <Navbar />

              <main className="flex-grow w-full">{children}</main>

              <Footer />
            </section>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
