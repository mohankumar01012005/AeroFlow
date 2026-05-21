"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFlightStore } from "@/src/stores/useFlightStore";

export default function PassengerDetailsPage() {
  const router = useRouter();
const [error, setError] = useState("");
  const {
    passengerForm,
    setPassengerForm,
    selectedFlight,
    selectedSeat,
  } = useFlightStore();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPassengerForm({
      ...passengerForm,
      [e.target.name]: e.target.value,
    });
  }

 function handleContinue() {
  if (
    !passengerForm.fullName ||
    !passengerForm.email ||
    !passengerForm.phone ||
    !passengerForm.passportNumber
  ) {
    setError("Please fill all fields");

    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailRegex.test(passengerForm.email)
  ) {
    setError("Invalid email address");

    return;
  }

  if (
    passengerForm.phone.length < 10
  ) {
    setError(
      "Phone number must be at least 10 digits"
    );

    return;
  }

  setError("");

  router.push("/booking/review");
}

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Passenger Details
        </h1>

        <p className="mt-2 text-neutral-500">
          Enter passenger information
        </p>

        {/* Booking Summary */}
        <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Booking Summary
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              Flight:
              <span className="ml-2 font-medium">
                {selectedFlight?.flight_no}
              </span>
            </p>

            <p>
              Route:
              <span className="ml-2 font-medium">
                {selectedFlight?.origin} →
                {selectedFlight?.destination}
              </span>
            </p>

            <p>
              Seat:
              <span className="ml-2 font-medium">
                {selectedSeat}
              </span>
            </p>
          </div>
        </div>

        {/* Passenger Form */}
        <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={passengerForm.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={passengerForm.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={passengerForm.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Passport Number
              </label>

              <input
                type="text"
                name="passportNumber"
                value={
                  passengerForm.passportNumber
                }
                onChange={handleChange}
                placeholder="Enter passport number"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>
          </div>
{error && (
  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}
          <button
            onClick={handleContinue}
            className="mt-8 w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </main>
  );
}