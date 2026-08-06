"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, count } = useCart();
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 8;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-4xl text-ink">Your Bag</h1>
      <p className="mt-1 text-sm text-neutral-500">{count} item(s)</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-white py-24 text-center ring-1 ring-black/5">
          <div className="text-6xl">🛍️</div>
          <p className="mt-4 text-neutral-600">Your bag is empty.</p>
          <Link
            href="/shop"
            className="btn-sheen mt-6 inline-block rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.slug}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-24 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-display text-xl text-ink hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    <span className="font-medium text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">
                    {item.color} · Size {item.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-black/15">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.slug,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-2 text-ink"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.slug,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-2 text-ink"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.slug, item.size, item.color)
                      }
                      className="text-sm text-neutral-500 underline hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h2 className="font-display text-2xl text-ink">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
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
              <div className="my-4 border-t border-black/10" />
              <div className="flex justify-between text-lg">
                <span className="font-display text-ink">Total</span>
                <span className="font-display text-ink">
                  {formatPrice(subtotal + shipping)}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="btn-sheen mt-6 block rounded-full bg-ink py-4 text-center text-xs font-semibold uppercase tracking-widest text-white"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/shop"
              className="mt-3 block text-center text-sm text-neutral-500 underline"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
