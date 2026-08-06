"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/lib/adminAuth";

export default function AdminSignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = signup(
      fd.get("name") as string,
      fd.get("email") as string,
      fd.get("password") as string
    );
    if (res.ok) {
      router.push("/admin");
    } else {
      setError(res.error || "Sign up failed.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <div className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Admin Portal
        </p>
        <h1 className="mt-2 font-display text-4xl text-ink">Create account</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Register as an Ridexd admin to manage the catalogue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Full name
            </label>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={4}
              className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="btn-sheen w-full rounded-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already registered?{" "}
          <Link href="/admin/login" className="font-semibold text-gold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
