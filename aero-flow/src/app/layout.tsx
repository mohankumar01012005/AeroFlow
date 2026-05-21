import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/components/shared/AuthProvider";

import Navbar from "@/src/components/shared/Navbar";

export const metadata: Metadata = {
  title: "AeroFlow",
  description: "Flight booking and rescheduling system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="bg-neutral-50 text-neutral-950">
  <AuthProvider>
    <Navbar />

    {children}
  </AuthProvider>
</body>
    </html>
  );
}


