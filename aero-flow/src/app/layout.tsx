import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/components/shared/AuthProvider";
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
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}