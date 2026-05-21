import { create } from "zustand";

import { persist } from "zustand/middleware";

import {
  FlightStore,
  PassengerForm,
} from "@/src/types/booking";

const initialPassengerForm: PassengerForm = {
  fullName: "",

  email: "",

  phone: "",

  passportNumber: "",
};

export const useFlightStore =
  create<FlightStore>()(
    persist(
      (set) => ({
        searchQuery: null,

        selectedFlight: null,

        selectedSeat: null,

        bookingStep: "search",

        passengerForm: initialPassengerForm,

        setSearchQuery: (query) =>
          set({
            searchQuery: query,
          }),

        setSelectedFlight: (flight) =>
          set({
            selectedFlight: flight,
          }),

        setSelectedSeat: (seat) =>
          set({
            selectedSeat: seat,
          }),

        setBookingStep: (step) =>
          set({
            bookingStep: step,
          }),

        setPassengerForm: (form) =>
          set({
            passengerForm: form,
          }),

        clearBooking: () =>
          set({
            searchQuery: null,

            selectedFlight: null,

            selectedSeat: null,

            bookingStep: "search",

            passengerForm:
              initialPassengerForm,
          }),
      }),
     {
  name: "flight-booking-store",

  partialize: (state) => ({
    searchQuery: state.searchQuery,

    selectedFlight:
      state.selectedFlight,

    selectedSeat:
      state.selectedSeat,

    bookingStep:
      state.bookingStep,
  }),
}
    )
  );