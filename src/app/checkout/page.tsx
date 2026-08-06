"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

type Status = "idle" | "submitting" | "success" | "error";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const ref = "AUR-" + Date.now().toString(36).toUpperCase();

    const orderSummary = items
      .map(
        (i) =>
          `• ${i.name} — ${i.color}/${i.size} × ${i.quantity} = ${formatPrice(
            i.price * i.quantity
          )}`
      )
      .join("\n");

    const payload = {
      reference: ref,
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      address: fd.get("address") as string,
      city: fd.get("city") as string,
      country: fd.get("country") as string,
      notes: (fd.get("notes") as string) || "",
      items: items.map((i) => ({
        slug: i.slug,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
        image: i.image,
      })),
      subtotal,
      shipping,
      total,
    };

    // 1) Persist order in our database (non-blocking for UX, but awaited)
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* order still proceeds via Formspree */
    }

    // 2) Send the order email via Formspree
    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: (() => {
            const data = new FormData();
            data.append("_subject", `New Order ${ref} — Ridexd`);
            data.append("Order Reference", ref);
            data.append("Customer", payload.name);
            data.append("Email", payload.email);
            data.append("Phone", payload.phone);
            data.append(
              "Shipping Address",
              `${payload.address}, ${payload.city}, ${payload.country}`
            );
            data.append("Notes", payload.notes);
            data.append("Order Items", orderSummary);
            data.append("Subtotal", formatPrice(subtotal));
            data.append("Shipping", shipping === 0 ? "Free" : formatPrice(shipping));
            data.append("Total", formatPrice(total));
            return data;
          })(),
        });
        if (!res.ok) throw new Error("Formspree submission failed");
      }
      setReference(ref);
      setStatus("success");
      clear();
    } catch {
      setError(
        "We couldn't send your order right now. Please check the Formspree form ID or try again."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="animate-fade-in mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-3xl text-white">
          ✓
        </div>
        <h1 className="mt-6 font-display text-4xl text-ink">Order confirmed!</h1>
        <p className="mt-3 text-neutral-600">
          Thank you for shopping with Ridexd. A confirmation has been emailed and
          our team will be in touch shortly.
        </p>
        <p className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm ring-1 ring-black/5">
          Your reference:{" "}
          <span className="font-semibold text-ink">{reference}</span>
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="btn-sheen rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-4xl text-ink">Checkout</h1>
      <p className="mt-2 max-w-xl text-sm text-neutral-500">
        Enter your details below. Instead of card payment, your order is sent
        securely to our team via email — we'll confirm payment options and
        delivery with you directly.
      </p>

      {!FORMSPREE_ID && (
        <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
          <strong>Setup note:</strong> Add your Formspree form ID as the
          <code className="mx-1 rounded bg-white px-1.5 py-0.5">
            NEXT_PUBLIC_FORMSPREE_ID
          </code>
          environment variable so order emails are delivered. Orders are still
          saved in the store database.
        </div>
      )}

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-white py-20 text-center ring-1 ring-black/5">
          <p className="text-neutral-600">
            Your bag is empty — add something first.
          </p>
          <Link
            href="/shop"
            className="btn-sheen mt-6 inline-block rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]"
        >
          {/* details */}
          <div className="space-y-8">
            <fieldset className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
              <legend className="px-2 font-display text-xl text-ink">
                Contact
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Full name" required />
                <Field name="email" label="Email" type="email" required />
                <Field name="phone" label="Phone" required />
              </div>
            </fieldset>

            <fieldset className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
              <legend className="px-2 font-display text-xl text-ink">
                Shipping address
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field name="address" label="Street address" required />
                </div>
                <Field name="city" label="City" required />
                <Field name="country" label="Country" required />
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Order notes (optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                  placeholder="Delivery instructions, gift note, etc."
                />
              </div>
            </fieldset>

            {status === "error" && (
              <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-sheen w-full rounded-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
            >
              {status === "submitting"
                ? "Placing order…"
                : `Place order · ${formatPrice(total)}`}
            </button>
          </div>

          {/* summary */}
          <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h2 className="font-display text-2xl text-ink">Your order</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-neutral-500">
                      {item.color}/{item.size} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="text-ink">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-black/10 pt-3 text-lg">
                <span className="font-display text-ink">Total</span>
                <span className="font-display text-ink">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}

function Field({
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
