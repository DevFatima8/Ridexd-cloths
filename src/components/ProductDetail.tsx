"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [active, setActive] = useState(product.image);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const gallery = [product.image, ...product.gallery].filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  const build = () => ({
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
    size,
    color,
    quantity: qty,
  });

  const handleAdd = () => {
    addItem(build());
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addItem(build());
    openCart();
    router.push("/checkout");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* gallery */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex gap-3 sm:flex-col">
          {gallery.map((img) => (
            <button
              key={img}
              onClick={() => setActive(img)}
              className={`h-20 w-16 overflow-hidden rounded-xl ring-2 transition sm:h-24 sm:w-20 ${
                active === img ? "ring-gold" : "ring-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden rounded-3xl bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active}
            src={active}
            alt={product.name}
            className="animate-fade-in aspect-[3/4] w-full object-cover"
          />
        </div>
      </div>

      {/* info */}
      <div className="lg:pt-4">
        <nav className="mb-4 text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>{" "}
          /{" "}
          <Link
            href={`/category/${product.category}`}
            className="hover:text-ink"
          >
            {product.category}
          </Link>
        </nav>

        <h1 className="font-display text-4xl text-ink">{product.name}</h1>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-2xl font-medium text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-lg text-neutral-400 line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
          <span className="ml-2 text-sm text-neutral-500">
            ★ {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <p className="mt-5 max-w-md leading-relaxed text-neutral-600">
          {product.description}
        </p>

        {/* color */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink">
            Colour — <span className="text-neutral-500">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  color === c
                    ? "border-ink bg-ink text-white"
                    : "border-black/15 text-ink hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* size */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink">
            Size — <span className="text-neutral-500">{size}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-12 rounded-lg border px-4 py-2 text-sm transition ${
                  size === s
                    ? "border-gold bg-gold text-white"
                    : "border-black/15 text-ink hover:border-gold"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* qty + actions */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-black/15">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-3 text-ink"
            >
              −
            </button>
            <span className="w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-4 py-3 text-ink"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="btn-sheen flex-1 rounded-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-white transition"
          >
            {added ? "Added ✓" : "Add to bag"}
          </button>
        </div>
        <button
          onClick={handleBuyNow}
          className="mt-3 w-full rounded-full border border-ink py-4 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-ink hover:text-white"
        >
          Buy it now
        </button>

        <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-neutral-500">
          {[
            ["🚚", "Free shipping $120+"],
            ["↩", "30-day returns"],
            ["✦", "Ethically crafted"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-4 ring-1 ring-black/5"
            >
              <div className="text-lg">{icon}</div>
              <p className="mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
