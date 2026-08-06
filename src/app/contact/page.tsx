"use client";

import { useState } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });
        if (!res.ok) throw new Error();
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Get in touch
          </p>
          <h1 className="mt-2 font-display text-5xl text-ink">Contact us</h1>
          <p className="mt-4 max-w-md text-neutral-600">
            Questions about sizing, orders or a collaboration? Our team replies
            within one business day.
          </p>

          <div className="mt-10 space-y-6">
            {[
              ["✉", "Email", "hello@aurora-studio.com"],
              ["☎", "Phone", "+1 (555) 018-2049"],
              ["⌖", "Studio", "24 Atelier Lane, Lahore & London"],
              ["◷", "Hours", "Mon–Sat · 9am – 7pm"],
            ].map(([icon, label, value]) => (
              <div key={label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-lg text-sand">
                  {icon}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {label}
                  </p>
                  <p className="text-ink">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
          {status === "sent" ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl text-white">
                ✓
              </div>
              <h2 className="mt-4 font-display text-2xl text-ink">
                Message sent!
              </h2>
              <p className="mt-2 text-neutral-600">
                Thanks for reaching out — we'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!FORMSPREE_ID && (
                <p className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs text-ink">
                  Add your <code>NEXT_PUBLIC_FORMSPREE_ID</code> to enable email
                  delivery.
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="name" label="Name" required />
                <Input name="email" label="Email" type="email" required />
              </div>
              <Input name="subject" label="Subject" required />
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-sheen w-full rounded-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
      />
    </div>
  );
}
