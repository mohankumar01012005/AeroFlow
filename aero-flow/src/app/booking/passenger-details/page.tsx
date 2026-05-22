"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useFlightStore } from "@/src/stores/useFlightStore";
const passengerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required"),

  email: z
    .string()
    .email("Enter valid email"),

  phone: z
    .string()
    .min(10, "Enter valid phone number"),

  passportNumber: z
    .string()
    .min(6, "Enter valid passport number"),
});

type PassengerFormData =
  z.infer<typeof passengerSchema>;

export default function PassengerDetailsPage() {
  const router = useRouter();

  const {
    passengerForm,
    setPassengerForm,
    setBookingStep,
  } = useFlightStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(
      passengerSchema
    ),

    defaultValues: passengerForm,

    mode: "onChange",
  });

  function onSubmit(
    data: PassengerFormData
  ) {
    setPassengerForm(data);

    setBookingStep("review");

    router.push("/booking/review");
  }
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <button
  onClick={() => router.back()}
  className="mb-6 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
>
  ← Back
</button>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">
          Passenger Details
        </h1>

        <p className="mt-2 text-neutral-500">
          Enter passenger information
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          {/* FULL NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              {...register("fullName")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.fullName
                    .message
                }
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter phone number"
              {...register("phone")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.phone
                    .message
                }
              </p>
            )}
          </div>

          {/* PASSPORT */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Passport Number
            </label>

            <input
              type="text"
              placeholder="Enter passport number"
              {...register(
                "passportNumber"
              )}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />

            {errors.passportNumber && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors
                    .passportNumber
                    .message
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full rounded-xl bg-black px-5 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Review
          </button>
        </form>
      </div>
    </main>
  );
}