"use client";

import { useUserStore } from "@/src/stores/useUserStore";

export default function HomePage() {
  const { email, isAuthenticated, isLoading } = useUserStore();

  if (isLoading) {
    return <main className="p-6">Loading session...</main>;
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">AeroFlow</h1>

      <p>
        Auth status:{" "}
        <span className="font-medium">
          {isAuthenticated ? "Logged in" : "Logged out"}
        </span>
      </p>

      {email && <p>Email: {email}</p>}
    </main>
  );
}