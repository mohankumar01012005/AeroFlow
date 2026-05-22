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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
        >
          AeroFlow
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
           <div className="flex items-center gap-4">
            <Link href="/">
  Home
</Link>
  <Link
    href="/booking"
    className="text-sm font-medium hover:underline"
  >
    My Bookings
  </Link>

  <button onClick={() => { void handleLogout(); }}
    className="bg-black text-white px-4 py-2 rounded-xl"
  >
    Logout
  </button>
</div>
          </div>
        )}
      </div>
    </header>
  );
}