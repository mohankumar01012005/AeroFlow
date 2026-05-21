export type Flight = {
  id: string;
  flight_no: string;

  origin: string;
  destination: string;

  departs_at: string;
  arrives_at: string;

  aircraft_type: string;
  status: "scheduled" | "cancelled" | "delayed";

  base_price: number;
};