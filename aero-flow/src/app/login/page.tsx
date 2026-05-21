"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-neutral-500">
  Don&apos;t have an account?{" "}

  <Link
    href="/register"
    className="font-medium text-black hover:underline"
  >
    Create account
  </Link>
</p>
      </form>
    </main>
  );
}