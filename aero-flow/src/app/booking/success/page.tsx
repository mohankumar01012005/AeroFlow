"use client";


import jsPDF from "jspdf";



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

  
  function handleDownloadTicket() {
  const pdf = new jsPDF();

  pdf.setFontSize(24);

  pdf.text(
    "AeroFlow Flight Ticket",
    20,
    30
  );

  pdf.setFontSize(16);

  pdf.text(
    `Flight: ${
      selectedFlight?.flight_no || ""
    }`,
    20,
    60
  );

  pdf.text(
    `Route: ${
      selectedFlight?.origin
    } → ${
      selectedFlight?.destination
    }`,
    20,
    80
  );

  pdf.text(
    `Passenger: ${
      passengerForm.fullName
    }`,
    20,
    100
  );

  pdf.text(
    `Seat: ${selectedSeat}`,
    20,
    120
  );

  pdf.text(
    `Status: Confirmed`,
    20,
    140
  );

  pdf.text(
    `Departure: ${new Date(
      selectedFlight?.departs_at ||
        ""
    ).toLocaleString()}`,
    20,
    160
  );

  pdf.save("AeroFlow-Ticket.pdf");
}


  return (
    <main
  className="min-h-screen px-4 py-10"
  style={{
    backgroundColor: "#fafafa",
  }}
>
      <div  className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-5 sm:p-8"
style={{
  boxShadow:
    "0 1px 3px rgba(0,0,0,0.1)",
}}>
        {/* Success Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:h-24 sm:w-24">
            <span className="text-5xl">
              ✈️
            </span>
           
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Booking Confirmed
          </h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Your ticket has been booked
            successfully. Your booking
            details and PNR are shown
            below.
          </p>
        </div>

        {/* PNR */}
        <div className="mt-8 rounded-2xl bg-black p-6 text-center text-white">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            PNR Number
          </p>

          <h2 className="mt-2 break-all text-3xl font-bold tracking-widest sm:text-4xl">
            BOOKED
          </h2>
        </div>

        {/* Ticket Card */}
        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">
                  Flight Number
                </p>

                <p className="mt-1 text-xl font-bold">
                  {
                    selectedFlight?.flight_no
                  }
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Route
                </p>

                <p className="mt-1 text-xl font-bold">
                  {
                    selectedFlight?.origin
                  }{" "}
                  →{" "}
                  {
                    selectedFlight?.destination
                  }
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Departure
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {new Date(
                    selectedFlight?.departs_at ||
                      ""
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">
                  Passenger
                </p>

                <p className="mt-1 text-xl font-bold">
                  {
                    passengerForm.fullName
                  }
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Seat Number
                </p>

                <p className="mt-1 text-xl font-bold">
                  {selectedSeat}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Booking Status
                </p>

                <p className="mt-1 inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                  Confirmed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Link href="/booking">
            <button className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-sm font-medium transition hover:bg-gray-100">
              View My Bookings
            </button>
          </Link>

          <Link href="/">
            <button
              onClick={handleDone}
              className="w-full rounded-xl bg-black px-5 py-4 text-sm font-medium text-white transition hover:opacity-90"
            >
              Back to Home
            </button>
          </Link>

          <button
  onClick={handleDownloadTicket}
  className="w-full rounded-xl border border-black bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-black hover:text-white"
>
  Download Ticket
</button>
        </div>
      </div>
    </main>
  );
}
