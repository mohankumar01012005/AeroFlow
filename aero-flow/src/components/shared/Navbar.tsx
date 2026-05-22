"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { createClient } from "@/src/lib/supabase/client";

import { useUserStore } from "@/src/stores/useUserStore";

export default function Navbar() {
  const router = useRouter();

  const supabase = createClient();

  const {
    isAuthenticated,
    clearUser,
  } = useUserStore();

  async function handleLogout() {
    await supabase.auth.signOut();

    clearUser();

    router.replace("/login");

    router.refresh();
  }

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:py-0">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight"
        >
          AeroFlow
        </Link>

        {isAuthenticated && (
          <div className="ml-auto flex items-center gap-3 text-sm sm:gap-4">
            <Link
              href="/"
              className="whitespace-nowrap font-medium hover:underline"
            >
              Home
            </Link>

            <Link
              href="/booking"
              className="whitespace-nowrap font-medium hover:underline"
            >
              My Bookings
            </Link>

            <button
              onClick={() => {
                void handleLogout();
              }}
              className="rounded-xl bg-black px-4 py-2 text-white transition hover:bg-neutral-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}