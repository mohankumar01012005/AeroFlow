"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  pnr_code: string;
  status: string;
  total_price: number;

  flights: {
    flight_no: string;
    origin: string;
    destination: string;
    departs_at: string;
  };

  seats: {
    seat_number: string;
  };
};

export default function BookingsPage() {
  const supabase = createClient();

  const router = useRouter();

  const [bookings, setBookings] = useState<
    Booking[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function loadBookings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        id,
        pnr_code,
        status,
        total_price,

        flights (
          flight_no,
          origin,
          destination,
          departs_at
        ),

        seats (
          seat_number
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      setLoading(false);

      return;
    }

    setBookings(data || []);

    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleCancelBooking(
    bookingId: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    const { error } = await supabase.rpc(
      "cancel_booking",
      {
        p_booking_id: bookingId,
      }
    );

    if (error) {
      console.error(error);

      alert("Failed to cancel booking");

      return;
    }

    alert("Booking cancelled successfully");

    loadBookings();

    router.refresh();
  }

  if (loading) {
    return (
      <main className="p-10">
        <p>Loading bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">
          My Bookings
        </h1>

        <p className="mt-2 text-neutral-500">
          View all your flight bookings
        </p>

        <div className="mt-10 space-y-5">
          {bookings.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center">
              <p className="text-neutral-500">
                No bookings found.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-neutral-500">
                        PNR
                      </p>

                      <p className="text-xl font-bold">
                        {booking.pnr_code}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Flight
                      </p>

                      <p className="font-semibold">
                        {
                          booking.flights
                            ?.flight_no
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Route
                      </p>

                      <p className="font-semibold">
                        {
                          booking.flights
                            ?.origin
                        }{" "}
                        →
                        {
                          booking.flights
                            ?.destination
                        }
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Seat
                      </p>

                      <p className="font-semibold">
                        {
                          booking.seats
                            ?.seat_number
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Status
                      </p>

                      <p
                        className={`font-semibold capitalize ${
                          booking.status ===
                          "cancelled"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {booking.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Price
                      </p>

                      <p className="font-semibold">
                        ₹
                        {booking.total_price}
                      </p>
                    </div>
                  </div>
                </div>

                {booking.status !==
                  "cancelled" && (
                  <button
                    onClick={() =>
                      handleCancelBooking(
                        booking.id
                      )
                    }
                    className="mt-6 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}