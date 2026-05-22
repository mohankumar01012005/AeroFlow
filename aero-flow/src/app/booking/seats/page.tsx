/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useFlightStore } from "@/src/stores/useFlightStore";
import { useEffect } from "react";
import { formatDate } from "@/src/utils/formatDate";
import { createClient } from "@/src/lib/supabase/client";
import {
  
  Seat,
  SeatStatus,
  
  
} from "@/src/utils/mockSeats";

function getSeatClass(status: SeatStatus): string {
  switch (status) {
    case 'selected':
      return 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200';
    case 'booked':
      return 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed';
    default:
      return 'bg-white text-gray-700 border-amber-300 hover:border-blue-400 hover:shadow-sm cursor-pointer';
  }
}

export default function App() {
  const router = useRouter();
  const supabase = createClient();
  const [seats, setSeats] =
  useState<Seat[]>([]);



  const {
  selectedSeat,
  setSelectedSeat,
  selectedFlight,
  setBookingStep,
  searchQuery,
} = useFlightStore();

useEffect(() => {
 async function loadSeats() {
  if (!selectedFlight) return;

  const { data, error } =
    await supabase
      .from("seats")
      .select("*")
      .eq(
        "flight_id",
        selectedFlight.id
      );

  if (error) {
    console.error(error);
    return;
  }

  const transformedSeats: Seat[] =
    data.map((seat) => {
      const rowNumber = Number(
        seat.seat_number.slice(0, -1)
      );

      const seatLetter =
        seat.seat_number.slice(-1);

      const seatMap: Record<
        string,
        number
      > = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
      };

      return {
        id: seat.seat_number,

        row: rowNumber.toString(),

        col: seatMap[seatLetter],

        status:
          seat.is_available
            ? "available"
            : "booked",
      };
    });

  setSeats(transformedSeats);
 }

 loadSeats();
}, [selectedFlight?.id]);


useEffect(() => {
  if (!selectedFlight) return;

  const channel = supabase
    .channel("seat-updates")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "seats",
      },
      (payload) => {
        const updatedSeat = payload.new;

        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === updatedSeat.seat_number
             ? {
    ...seat,
    status: updatedSeat.is_available
      ? "available"
      : "booked",
  }
              : seat
          )
        );
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [selectedFlight, supabase]);





function handleSeat(id: string) {
  setSelectedSeat(id);

  setSeats((prev) =>
    prev.map((seat) => {
      if (seat.status === "booked") {
        return seat;
      }

      if (seat.id === id) {
        return {
          ...seat,
          status:
            seat.status === "selected"
              ? "available"
              : "selected",
        };
      }

      return {
        ...seat,
        status:
          seat.status === "selected"
            ? "available"
            : seat.status,
      };
    })
  );
}
function handleContinueBooking() {
  if (!selectedSeat) return;

  setBookingStep(
    "passenger-details"
  );

  router.push(
    "/booking/passenger-details"
  );
}
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-200 via-blue-100 to-purple-100 p-4 font-sans sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <div className="mb-5">
        <button
  onClick={() => router.back()}
  className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
>
  <ArrowLeft size={14} />
  Back
</button>
        </div>

        <h1 className="mb-5 text-3xl font-extrabold text-gray-900">Choose Seats</h1>

        <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
          {/* Left panel */}
          <div className="flex w-full flex-col gap-4 xl:w-72 xl:shrink-0">
            {/* Your Flight */}
           <div className="bg-white rounded-3xl shadow-xl p-5">
  <div>
    <p className="text-sm text-neutral-500">
      Flight Number
    </p>

    <p className="text-lg font-bold">
      {selectedFlight?.flight_no}
    </p>
  </div>

  <div>
    <p className="text-sm text-neutral-500">
      Route
    </p>

    <p className="font-medium">
      {selectedFlight?.origin} →
      {" "}
      {selectedFlight?.destination}
    </p>
  </div>

  <div>
    <p className="text-sm text-neutral-500">
      Departure
    </p>

    <p className="font-medium">
      {formatDate(
        selectedFlight?.departs_at || ""
      )}
    </p>
  </div>

  <div>
    <p className="text-sm text-neutral-500">
      Arrival
    </p>

    <p className="font-medium">
      {formatDate(
        selectedFlight?.arrives_at || ""
      )}
    </p>
  </div>

  <div>
    <p className="text-sm text-neutral-500">
      Aircraft
    </p>

    <p className="font-medium">
      {selectedFlight?.aircraft_type}
    </p>
  </div>
</div>
             <div className="bg-white rounded-3xl shadow-xl p-5">
  {/* Airline card */}
  <div className="border border-gray-100 rounded-xl p-3">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-1">
        <span className="font-extrabold text-blue-600 text-xl tracking-tight">
          ANA
        </span>

        <div className="w-5 h-5 bg-blue-700 transform rotate-12 rounded-sm ml-1" />
      </div>

      <button className="bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
        Details
      </button>
    </div>

    <div className="flex flex-wrap justify-between gap-3 text-xs sm:items-end">
      <div>
        <p className="font-semibold text-gray-900">
          AeroFlow Airways
        </p>

        <p className="text-gray-400">
          {formatDate(
            selectedFlight?.departs_at || ""
          )}
        </p>
      </div>

      <div className="text-center text-gray-400 leading-tight">
        <p>
          {selectedFlight?.origin} →
          {" "}
          {selectedFlight?.destination}
        </p>

        <p>
          Direct Flight
        </p>
      </div>

      <div className="text-right">
        <p className="text-green-500 font-bold">
          ₹{selectedFlight?.base_price}
        </p>
      </div>
    </div>
  </div>

  {/* Economy Class */}
  <div className="flex items-center gap-3 mt-5">
    <img
      src="https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=96&h=72&fit=crop"
      alt="Economy Class"
      className="w-14 h-11 rounded-lg object-cover shrink-0"
    />

    <div>
      <p className="font-bold text-gray-900 text-sm">
        Economy Class
      </p>

      <p className="text-gray-400 text-xs">
        Comfortable seating experience
      </p>
    </div>
  </div>
</div>

            {/* Transaction Details */}
           <div className="bg-white rounded-3xl shadow-xl p-5">
  <div className="flex items-center justify-between">
    <span className="text-neutral-500">
      Seat
    </span>

    <span className="font-semibold">
      {selectedSeat || "Not selected"}
    </span>
  </div>

  <div className="flex items-center justify-between">
    <span className="text-neutral-500">
      Passengers
    </span>

    <span className="font-semibold">
      {searchQuery?.passengers || 1}
    </span>
  </div>

  <div className="flex items-center justify-between">
    <span className="text-neutral-500">
      Ticket Price
    </span>

    <span className="font-semibold">
      ₹{selectedFlight?.base_price}
    </span>
  </div>

  <div className="border-t pt-4">
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">
        Total
      </span>

      <span className="text-2xl font-bold">
        ₹{selectedFlight?.base_price}
      </span>
    </div>
  </div>
</div>
</div>
          {/* Right panel – Seat map */}
          <div className="flex-1 overflow-hidden rounded-3xl bg-linear-to-b from-gray-50 to-white shadow-lg">
            {/* Airplane nose */}
            <div className="relative w-full pt-8 pb-4 bg-linear-to-b from-gray-100 to-gray-50 flex justify-center">
              <div
                className="w-32 h-16 bg-linear-to-b from-white to-gray-50 border-2 border-gray-200"
                style={{ borderRadius: '100% 100% 0 0' }}
              />
            </div>

            {/* Title and legend */}
            <div className="border-b border-gray-100 px-4 py-4 sm:px-8">
              <h2 className="text-center font-extrabold text-gray-900 text-lg mb-4">Economy Class</h2>

              {/* Legend */}
              <div className="mb-2 flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-white border-2 border-amber-400 shadow-sm" />
                  <span className="text-xs font-medium text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-gray-300 border-2 border-gray-300 shadow-sm" />
                  <span className="text-xs font-medium text-gray-600">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-blue-500 border-2 border-blue-600 shadow-md" />
                  <span className="text-xs font-medium text-gray-600">Selected</span>
                </div>
              </div>
            </div>

            {/* Scrollable cabin area */}
            <div className="overflow-x-auto overflow-y-auto px-3 py-6 sm:px-8">
              <div className="mx-auto flex min-w-fit flex-col gap-3">
                {Array.from(
  { length: 30 },
  (_, i) => (i + 1).toString()
).map((row) => (
                  <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2.5">
                    {/* Left side seats (1-3) */}
                    <div className="flex gap-1.5 sm:gap-2">
                      {[1, 2, 3].map((col) => {
                        const seat = seats.find(
  (s) =>
    s.row === row &&
    s.col === col
);
                        return (
                          <button
                            key={seat?.id}
                            onClick={() =>
  seat &&
  handleSeat(seat.id)
}
                            disabled={
  !seat ||
  seat.status === "booked"
}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 text-[9px] font-bold transition-all duration-200 hover:scale-105 active:scale-95 sm:h-9 sm:w-9 sm:text-[10px] ${
  seat
    ? getSeatClass(seat.status)
    : ""
}`}
                            title={`${seat?.id} - ${seat?.status}`}
                          >
                            {seat?.id}
                          </button>
                        );
                      })}
                    </div>

                    {/* Row label */}
                    <div className="w-5 text-center sm:w-6">
                      <span className="text-xs font-bold text-gray-500">{row}</span>
                    </div>

                    {/* Aisle */}
                    <div className="mx-0.5 h-6 w-1 rounded-full bg-gray-200 sm:mx-1" />

                    {/* Right side seats (4-6) */}
                    <div className="flex gap-1.5 sm:gap-2">
                    {[4, 5, 6].map((col) => {
  const seat = seats.find(
    (s) =>
      s.row === row &&
      s.col === col
  );

  return (
    <button
      key={seat?.id}
      onClick={() =>
        seat &&
        handleSeat(seat.id)
      }
      disabled={
        !seat ||
        seat.status === "booked"
      }
      className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 text-[9px] font-bold transition-all duration-200 hover:scale-105 active:scale-95 sm:h-9 sm:w-9 sm:text-[10px] ${
        seat
          ? getSeatClass(seat.status)
          : ""
      }`}
      title={`${seat?.id} - ${seat?.status}`}
    >
      {seat?.id}
    </button>
  );
})}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tail section */}
            <div className="relative w-full py-6 bg-linear-to-b from-gray-50 to-gray-100 border-t border-gray-200 flex justify-center">
              <div
                className="w-16 h-24 bg-linear-to-b from-gray-50 to-white border-2 border-gray-200 opacity-40"
                style={{ borderRadius: '0 0 100% 100%' }}
              />
            </div>

            {/* Continue button */}
            <div className="border-t border-gray-100 bg-white px-4 py-6 sm:px-8">
             <button
  onClick={handleContinueBooking}
  disabled={!selectedSeat}
  className={`
    w-full py-3.5 rounded-xl text-sm tracking-wide shadow-md transition-all font-bold

    ${
      selectedSeat
        ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white hover:shadow-lg"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }
  `}
>
  Continue Booking
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
