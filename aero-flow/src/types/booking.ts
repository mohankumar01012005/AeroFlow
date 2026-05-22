import { Flight } from "./flight";

export type PassengerForm = {
  fullName: string;

  email: string;

  phone: string;

  passportNumber: string;
};

export type BookingStep =
  | "flight-selection"
  | "seat-selection"
  | "passenger-details"
  | "review"
  | "success";

export type FlightSearchQuery = {
  origin: string;

  destination: string;

  date: string;

  passengers: number;
};

export type RecentSearch = {
  origin: string;

  destination: string;

  date: string;
};

export type FlightStore = {
  searchQuery:
    | FlightSearchQuery
    | null;

  selectedFlight: Flight | null;

  selectedSeat: string | null;

  bookingStep: BookingStep;

  passengerForm: PassengerForm;

  recentSearches: RecentSearch[];

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

  addRecentSearch: (
    search: RecentSearch
  ) => void;

  clearBooking: () => void;
};