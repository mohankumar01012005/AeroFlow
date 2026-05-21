"use client";

import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl">
            ✓
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Booking Confirmed
        </h1>

        <p className="mt-3 text-neutral-500">
          Your flight booking has been
          successfully completed.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}