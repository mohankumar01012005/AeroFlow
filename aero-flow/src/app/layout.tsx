import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/components/shared/AuthProvider";
import { Toaster } from "sonner";
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
<Toaster richColors position="top-right" />
    <Navbar />

    {children}
  </AuthProvider>
</body>
    </html>
  );
}


