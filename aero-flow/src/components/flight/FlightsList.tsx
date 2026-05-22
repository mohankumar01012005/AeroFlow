"use client";

import {
  useMemo,
  useState,
} from "react";

import FlightCard from "./FlightCard";

import { Flight } from "@/src/types/flight";

type FlightsListProps = {
  flights: Flight[];
};

export default function FlightsList({
  flights,
}: FlightsListProps) {
  const [sortBy, setSortBy] =
    useState("price-low");

  const sortedFlights =
    useMemo(() => {
      const copiedFlights = [
        ...flights,
      ];

      switch (sortBy) {
        case "price-low":
          return copiedFlights.sort(
            (a, b) =>
              a.base_price -
              b.base_price
          );

        case "price-high":
          return copiedFlights.sort(
            (a, b) =>
              b.base_price -
              a.base_price
          );

        case "departure":
          return copiedFlights.sort(
            (a, b) =>
              new Date(
                a.departs_at
              ).getTime() -
              new Date(
                b.departs_at
              ).getTime()
          );

        default:
          return copiedFlights;
      }
    }, [flights, sortBy]);

  return (
    <>
      <div className="mb-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 sm:w-auto"
        >
          <option value="price-low">
            Lowest Price
          </option>

          <option value="price-high">
            Highest Price
          </option>

          <option value="departure">
            Earliest Departure
          </option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedFlights.map(
          (flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
            />
          )
        )}
      </div>
    </>
  );
}
