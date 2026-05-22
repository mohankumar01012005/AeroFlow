"use client";
import { useRouter } from "next/navigation";

import { useFlightStore } from "@/src/stores/useFlightStore";

import { Flight } from "@/src/types/flight";

import { formatDate } from "@/src/utils/formatDate";

import { calculateDuration } from "@/src/utils/calculateDuration";


type FlightCardProps = {
  flight: Flight;
};

export default function FlightCard({
  flight,
}: FlightCardProps) {
      const router = useRouter();

  const {
    setSelectedFlight,
    setBookingStep,
  } = useFlightStore();

  function handleSelectFlight() {
    setSelectedFlight(flight);

    setBookingStep("seat-selection");

    router.push("/booking/seats");
  }

 const statusStyles = {
  scheduled:
    "bg-blue-500 text-white",

  boarding:
    "bg-yellow-500 text-black",

  delayed:
    "bg-red-500 text-white",

  departed:
    "bg-gray-500 text-white",

  cancelled:
    "bg-black text-white",
};
  return (
<div>
  
   
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
  <div>
    <p className="text-sm text-neutral-500">
      Flight Number
    </p>

    <h2 className="text-xl font-bold">
      {flight.flight_no}
    </h2>
  </div>

  <div
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
      statusStyles[
        flight.status as keyof typeof statusStyles
      ]
    }`}
  >
    {flight.status}
  </div>
</div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div>
              <p className="text-sm text-neutral-500">
                Origin
              </p>

              <p className="font-medium">
                {flight.origin}
              </p>
            </div>

            <div className="text-neutral-400">
              →
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Destination
              </p>

              <p className="font-medium">
                {flight.destination}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-500">
              Departure
            </p>

            <p className="font-medium">
              {formatDate(flight.departs_at)}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Arrival
            </p>

            <p className="font-medium">
              {formatDate(flight.arrives_at)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-500">
              Duration
            </p>

            <p className="font-medium">
              {calculateDuration(
                flight.departs_at,
                flight.arrives_at
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Aircraft
            </p>

            <p className="font-medium">
              {flight.aircraft_type}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div>
            <p className="text-sm text-neutral-500">
              Starting From
            </p>

            <h3 className="text-2xl font-bold">
              ₹{flight.base_price}
            </h3>
          </div>

         <button
  onClick={handleSelectFlight}
  className="w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
>
  Select Flight
</button>
        </div>
      </div>
    </div>
</div>
  );
}
