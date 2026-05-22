"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { useFlightStore } from "@/src/stores/useFlightStore";
import { useState } from "react";

export default function ReviewBookingPage() {
    const [loading, setLoading] =
  useState(false);
  const router = useRouter();
const supabase = createClient();
 const {
  selectedFlight,
  selectedSeat,
  passengerForm,
  
} = useFlightStore();

  const totalPrice =
    Number(selectedFlight?.base_price || 0);

 async function handleConfirmBooking() {
    setLoading(true);

  if (
    
    !selectedFlight ||
    !selectedSeat
  ) {
    setLoading(false);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    toast.error("Please login again");
    
    setLoading(false);
    return;
  }

  const { data, error } =
    await supabase.rpc(
      "book_seat",
      {
        p_user_id: user.id,

        p_flight_id:
          selectedFlight.id,

        p_seat_number:
          selectedSeat,

        p_passenger_name:
          passengerForm.fullName,

        p_passenger_email:
          passengerForm.email,

        p_passenger_phone:
          passengerForm.phone,

        p_passport_number:
          passengerForm.passportNumber,
      }
    );

  if (error) {
    console.error(error);
    toast.error("Booking failed");
    
    setLoading(false);
    return;
  }

  if (!data.success) {
    toast.error(data.message);
    
    setLoading(false);
    return;
  }

  

//   clearBooking();
setLoading(false);
  router.push(
  `/booking/success?id=${data.booking_id}`
);


}


  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <button
  onClick={() => router.back()}
  className="mb-6 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
>
  ← Back
</button>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Review Booking
        </h1>

        <p className="mt-2 text-neutral-500">
          Verify your booking details
        </p>

        {/* Flight Details */}
        <div className="mt-8 rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold">
            Flight Information
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">
                Flight Number
              </p>

              <p className="font-semibold">
                {selectedFlight?.flight_no}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Route
              </p>

              <p className="font-semibold">
                {selectedFlight?.origin} →
                {selectedFlight?.destination}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Seat
              </p>

              <p className="font-semibold">
                {selectedSeat}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Total Price
              </p>

              <p className="text-2xl font-bold">
                ₹{totalPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="mt-6 rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold">
            Passenger Information
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">
                Full Name
              </p>

              <p className="font-semibold">
                {passengerForm.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Email
              </p>

              <p className="font-semibold">
                {passengerForm.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Phone
              </p>

              <p className="font-semibold">
                {passengerForm.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Passport Number
              </p>

              <p className="font-semibold">
                {
                  passengerForm.passportNumber
                }
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
  onClick={handleConfirmBooking}
  disabled={loading}
  className="mt-6 w-full rounded-xl bg-black px-5 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading
    ? "Confirming Booking..."
    : "Confirm Booking"}
</button>
      </div>
    </main>
  );
}
