"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    count,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-sand shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="font-display text-xl text-ink">
            Your Bag{" "}
            <span className="text-sm text-neutral-500">({count})</span>
          </h2>
          <button
            onClick={closeCart}
            className="text-ink transition hover:rotate-90"
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="text-5xl">🛍️</div>
            <p className="text-neutral-600">Your bag is currently empty.</p>
            <button
              onClick={closeCart}
              className="rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-2xl bg-white p-3 ring-1 ring-black/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-display text-base text-ink">
                        {item.name}
                      </h3>
                      <button
                        onClick={() =>
                          removeItem(item.slug, item.size, item.color)
                        }
                        className="text-neutral-400 hover:text-ink"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500">
                      {item.color} · {item.size}
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
                          className="px-3 py-1 text-ink"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">
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
                          className="px-3 py-1 text-ink"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-medium text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/10 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-display text-lg text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Shipping & taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-sheen mt-4 block rounded-full bg-ink py-4 text-center text-xs font-semibold uppercase tracking-widest text-white"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 block rounded-full border border-ink/20 py-3 text-center text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-white"
              >
                View Bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
