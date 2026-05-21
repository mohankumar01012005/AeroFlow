"use client";

import { useMemo } from "react";

import SeatItem from "./SeatItem";

import {
  generateSeats,
  Seat,
} from "@/src/utils/generateSeats";

import { useFlightStore } from "@/src/stores/useFlightStore";

export default function SeatGrid() {
  const seats = useMemo(
    () => generateSeats(),
    []
  );

  const {
    selectedSeat,
    setSelectedSeat,
  } = useFlightStore();

  function renderRow(row: number) {
    const rowSeats = seats.filter((seat) =>
      seat.label.startsWith(
        row.toString()
      )
    );

    const leftSeats = rowSeats.slice(0, 3);

    const rightSeats = rowSeats.slice(3);

    return (
      <div
        key={row}
        className="flex items-center justify-center gap-4"
      >
        <div className="flex gap-2">
          {leftSeats.map((seat) => (
            <SeatItem
              key={seat.id}
              label={seat.label}
              occupied={seat.occupied}
              selected={
                selectedSeat === seat.id
              }
              onSelect={() =>
                setSelectedSeat(seat.id)
              }
            />
          ))}
        </div>

        <div className="w-8" />

        <div className="flex gap-2">
          {rightSeats.map((seat) => (
            <SeatItem
              key={seat.id}
              label={seat.label}
              occupied={seat.occupied}
              selected={
                selectedSeat === seat.id
              }
              onSelect={() =>
                setSelectedSeat(seat.id)
              }
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-175 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex items-center justify-center gap-12 text-sm font-medium text-neutral-500">
          <div className="flex gap-8">
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>

          <span className="text-neutral-300">
            aisle
          </span>

          <div className="flex gap-8">
            <span>D</span>
            <span>E</span>
            <span>F</span>
          </div>
        </div>

        <div className="space-y-4">
          {Array.from(
            { length: 10 },
            (_, index) => (
              <div
                key={index}
                className="flex items-center gap-6"
              >
                <div className="w-6 text-sm font-medium text-neutral-500">
                  {index + 1}
                </div>

                {renderRow(index + 1)}
              </div>
            )
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t pt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md border border-neutral-300 bg-white" />

            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-black" />

            <span>Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-neutral-300" />

            <span>Occupied</span>
          </div>
        </div>
      </div>
    </div>
  );
}