"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useFlightStore } from "@/src/stores/useFlightStore";

export default function FlightSearchForm() {
  const router = useRouter();

  const {
    addRecentSearch,

    recentSearches,
  } = useFlightStore();

  const [origin, setOrigin] =
    useState("");

  const [
    destination,
    setDestination,
  ] = useState("");

  const [date, setDate] =
    useState("");

  const [
    passengers,
    setPassengers,
  ] = useState(1);

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    addRecentSearch({
      origin,

      destination,

      date,
    });

    const query =
      new URLSearchParams({
        origin,

        destination,

        date,

        passengers:
          passengers.toString(),
      });

    router.push(
      `/flights?${query.toString()}`
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Search Flights
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Find and book flights
            across multiple
            destinations
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
              onChange={(e) =>
                setOrigin(
                  e.target.value
                )
              }
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
              onChange={(e) =>
                setDestination(
                  e.target.value
                )
              }
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
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
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
                setPassengers(
                  Number(
                    e.target.value
                  )
                )
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

        {recentSearches.length >
          0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">
              Recent Searches
            </h2>

            <div className="flex flex-wrap gap-3">
              {recentSearches.map(
                (
                  search,
                  index
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      router.push(
                        `/flights?origin=${search.origin}&destination=${search.destination}&date=${search.date}`
                      )
                    }
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {
                      search.origin
                    }{" "}
                    →{" "}
                    {
                      search.destination
                    }
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}