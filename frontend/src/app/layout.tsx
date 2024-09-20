import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import React from "react";
import Footer from "@/components/footer/footer";

import { Inter as Font } from "next/font/google";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "This is the homepage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <section className="mx-auto flex min-h-screen flex-col justify-between">
            <Navbar />

            <main className="mx-auto mb-auto flex max-w-7xl justify-center overflow-y-auto">{children}</main>

            <Footer />
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
