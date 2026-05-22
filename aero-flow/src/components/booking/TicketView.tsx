"use client";

import jsPDF from "jspdf";

type TicketViewProps = {
  booking: any;
};

export default function TicketView({
  booking,
}: TicketViewProps) {
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
      `PNR: ${booking.pnr_code}`,
      20,
      60
    );

    pdf.text(
      `Flight: ${booking.flights?.flight_no}`,
      20,
      80
    );

    pdf.text(
      `Route: ${booking.flights?.origin} → ${booking.flights?.destination}`,
      20,
      100
    );

    pdf.text(
      `Seat: ${booking.seats?.seat_number}`,
      20,
      120
    );

    pdf.text(
      `Status: ${booking.status}`,
      20,
      140
    );

    pdf.text(
      `Price: ₹${booking.total_price}`,
      20,
      160
    );

    pdf.save(
      `Ticket-${booking.pnr_code}.pdf`
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <span className="text-5xl">
              ✈️
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Flight Ticket
          </h1>

          <p className="mt-3 text-gray-500">
            Your booking details
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-black p-6 text-center text-white">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            PNR Number
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-widest">
            {booking.pnr_code}
          </h2>
        </div>

        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">
                  Flight Number
                </p>

                <p className="mt-1 text-xl font-bold">
                  {
                    booking.flights
                      ?.flight_no
                  }
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Route
                </p>

                <p className="mt-1 text-xl font-bold">
                  {
                    booking.flights
                      ?.origin
                  }{" "}
                  →{" "}
                  {
                    booking.flights
                      ?.destination
                  }
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Departure
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {new Date(
                    booking.flights?.departs_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">
                  Seat Number
                </p>

                <p className="mt-1 text-xl font-bold">
                  {
                    booking.seats
                      ?.seat_number
                  }
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Booking Status
                </p>

                <p
                  className={`mt-1 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                    booking.status ===
                    "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Price
                </p>

                <p className="mt-1 text-xl font-bold">
                  ₹
                  {
                    booking.total_price
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={
            handleDownloadTicket
          }
          className="mt-8 w-full rounded-xl bg-black px-5 py-4 text-sm font-medium text-white transition hover:opacity-90"
        >
          Download Ticket
        </button>
      </div>
    </main>
  );
}