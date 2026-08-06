"use client";

import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block hover-lift rounded-2xl bg-white overflow-hidden ring-1 ring-black/5"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="card-img h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
              New
            </span>
          )}
          {product.compareAt && (
            <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
              Sale
            </span>
          )}
        </div>
        <button
          onClick={quickAdd}
          className="btn-sheen absolute inset-x-3 bottom-3 translate-y-4 rounded-full bg-ink/95 py-3 text-xs font-semibold uppercase tracking-widest text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-widest text-gold">
          {product.subcategory.replace("-", " ")}
        </p>
        <h3 className="mt-1 font-display text-lg text-ink">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-medium text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
          <span className="ml-auto text-xs text-neutral-500">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          onClick={quickAdd}
          className="btn-sheen mt-4 w-full rounded-full bg-ink py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gold"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
