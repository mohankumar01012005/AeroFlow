import { createClient } from "@/src/lib/supabase/server";

import TicketView from "@/src/components/booking/TicketView";

type TicketPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TicketPage({
  params,
}: TicketPageProps) {
  const { id } = await params;

  const supabase =
    await createClient();

  const { data: booking, error } =
    await supabase
      .from("bookings")
      .select(
        `
        *,
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
      .eq("id", id)
      .single();

  if (error || !booking) {
    return (
      <main className="p-10">
        <p>
          Ticket not found.
        </p>
      </main>
    );
  }

  return (
    <TicketView
      booking={booking}
    />
  );
}