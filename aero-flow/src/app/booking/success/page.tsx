"use client";

import Link from "next/link";

import { useFlightStore } from "@/src/stores/useFlightStore";

export default function BookingSuccessPage() {
  const {
    selectedFlight,
    selectedSeat,
    passengerForm,
    clearBooking,
  } = useFlightStore();

  function handleDone() {
    clearBooking();
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">
              ✅
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Booking Confirmed
          </h1>

          <p className="mt-3 text-neutral-500">
            Your flight has been booked successfully.
          </p>
        </div>

        <div className="mt-10 grid gap-6 rounded-2xl border border-neutral-200 p-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-neutral-500">
              Flight
            </p>

            <p className="mt-1 text-lg font-semibold">
              {
                selectedFlight?.flight_no
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Route
            </p>

            <p className="mt-1 text-lg font-semibold">
              {
                selectedFlight?.origin
              }{" "}
              →
              {
                selectedFlight?.destination
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Passenger
            </p>

            <p className="mt-1 text-lg font-semibold">
              {
                passengerForm.fullName
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Seat
            </p>

            <p className="mt-1 text-lg font-semibold">
              {selectedSeat}
            </p>
          </div>
        </div>

        <Link href="/">
          <button
            onClick={handleDone}
            className="mt-8 w-full rounded-xl bg-black px-5 py-4 text-sm font-medium text-white transition hover:opacity-90"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
}