import { createClient } from "@/src/lib/supabase/server";

import { Flight } from "@/src/types/flight";
import FlightCard from "@/src/components/flight/FlightCard";
import FlightsList from "../../components/flight/FlightsList";
type FlightsPageProps = {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  }>;
};

export default async function FlightsPage({
  
  searchParams,
}: FlightsPageProps) {


  const params = await searchParams;
 
  const origin = params.origin ?? "";

  const destination = params.destination ?? "";

  const date = params.date ?? "";

  const supabase = await createClient();

  let query = supabase
    .from("flights")
    .select("*")
    .ilike("origin", origin)
    .ilike("destination", destination)
    .not("status", "eq", "cancelled");

  if (date) {
    query = query.gte(
      "departs_at",
      `${date}T00:00:00`
    );

    query = query.lte(
      "departs_at",
      `${date}T23:59:59`
    );
  }

  const { data: flights, error } =
    await query;

  console.log("Flights:", flights);

  console.log("Error:", error);

  if (error) {
    return (
      <main className="p-6">
        <p className="text-red-500">
          Failed to load flights.
        </p>
      </main>
    );
  }




  
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Available Flights
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            {origin} → {destination}
          </p>
        </div>
        <div className="mb-6 flex items-center justify-between">
  

 
</div>
        
         {flights?.length === 0 ? (
  <div className="rounded-2xl border bg-white p-6 text-center">
    <p className="text-neutral-500">
      No flights found.
    </p>
  </div>
) : (
  <FlightsList flights={flights} />
)}
        </div>
      
    </main>
  );
}