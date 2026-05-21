"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FlightSearchForm() {
  const router = useRouter();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const query = new URLSearchParams({
      origin,
      destination,
      date,
      passengers: passengers.toString(),
    });

    router.push(`/flights?${query.toString()}`);
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Search Flights
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Find and book flights across multiple destinations
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Origin
            </label>

            <input
              type="text"
              placeholder="Delhi"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Destination
            </label>

            <input
              type="text"
              placeholder="Mumbai"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Departure Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Passengers
            </label>

            <input
              type="number"
              min={1}
              max={5}
              value={passengers}
              onChange={(e) =>
                setPassengers(Number(e.target.value))
              }
              required
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          <div className="md:col-span-2 xl:col-span-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:opacity-90"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}