import { Flight } from "./flight";

export type PassengerForm = {
  fullName: string;

  email: string;

  phone: string;

  passportNumber: string;
};

export type BookingStep =
  | "search"
  | "seat-selection"
  | "passenger-details"
  | "payment"
  | "confirmation";

export type FlightSearchQuery = {
  origin: string;

  destination: string;

  date: string;

  passengers: number;
};

export type FlightStore = {
  searchQuery: FlightSearchQuery | null;

  selectedFlight: Flight | null;

  selectedSeat: string | null;

  bookingStep: BookingStep;

  passengerForm: PassengerForm;

  setSearchQuery: (
    query: FlightSearchQuery
  ) => void;

  setSelectedFlight: (
    flight: Flight
  ) => void;

  setSelectedSeat: (
    seat: string
  ) => void;

  setBookingStep: (
    step: BookingStep
  ) => void;

  setPassengerForm: (
    form: PassengerForm
  ) => void;

  clearBooking: () => void;
};