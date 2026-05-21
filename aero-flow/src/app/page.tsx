"use client";

import Link from "next/link";

import FlightSearchForm from "../components/flight/FlightSearchForm";

import { useUserStore } from "@/src/stores/useUserStore";


export default function HomePage() {
  const { isAuthenticated, isLoading } = useUserStore();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50">
        <p className="text-sm text-neutral-500">
          Loading...
        </p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              AeroFlow
            </h1>

            <p className="text-sm text-neutral-500">
              Sign in to search, book, and manage flights.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-xl border border-neutral-300 px-4 py-3 text-sm font-medium transition hover:bg-neutral-100"
            >
              Create account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <FlightSearchForm />
    </main>
  );
}