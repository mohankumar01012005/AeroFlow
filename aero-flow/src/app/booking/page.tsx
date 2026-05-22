"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createPortal } from "react-dom";

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
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => {
      // cleanup body scroll lock if needed
      document.body.style.overflow = "";
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (mounted && bookingToCancel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingToCancel, mounted]);

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
        flights ( flight_no, origin, destination, departs_at ),
        seats ( seat_number )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBookings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCancelBooking(bookingId: string) {
    const { error } = await supabase.rpc("cancel_booking", {
      p_booking_id: bookingId,
    });

    if (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
      return;
    }

    toast.success("Booking cancelled successfully");
    loadBookings();
    router.refresh();
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && bookingToCancel) {
        setBookingToCancel(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [bookingToCancel]);

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
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <p className="mt-2 text-neutral-500">View all your flight bookings</p>

        <div className="mt-10 space-y-5">
          {bookings.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center">
              <p className="text-neutral-500">No bookings found.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-3xl border mt-5 border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:scale-[1.01]"
              >
                <Link href={`/booking/ticket/${booking.id}`} className="block">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm text-neutral-500">PNR</p>
                        <p className="text-xl font-bold">{booking.pnr_code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Flight</p>
                        <p className="font-semibold">{booking.flights?.flight_no}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Route</p>
                        <p className="font-semibold">
                          {booking.flights?.origin} → {booking.flights?.destination}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-neutral-500">Seat</p>
                        <p className="font-semibold">{booking.seats?.seat_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Status</p>
                        <p
                          className={`font-semibold capitalize ${
                            booking.status === "cancelled" ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {booking.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Price</p>
                        <p className="font-semibold">₹{booking.total_price}</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {booking.status !== "cancelled" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingToCancel(booking.id);
                    }}
                    className="mt-6 rounded-xl bg-red-500 px-4 py-2 text-white cursor-pointer transition-colors hover:bg-red-600"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {mounted &&
        bookingToCancel &&
        createPortal(
          <div
            className="fixed inset-0 z-9999"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setBookingToCancel(null);
            }}
          >
            <div
              className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
              style={{ pointerEvents: "auto" }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Cancel Booking</h2>
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700">Are you sure you want to cancel this booking?</p>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setBookingToCancel(null)}
                    className=" cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    Keep Booking
                  </button>

                  <button
                    onClick={() => {
                      handleCancelBooking(bookingToCancel);
                      setBookingToCancel(null);
                    }}
                    className=" cursor-pointer rounded-lg px-5 py-4 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    style={{
                      backgroundColor: "#dc2626", // red-600
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#b91c1c"; // red-700
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#dc2626";
                    }}
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}