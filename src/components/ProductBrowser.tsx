"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, type Product } from "@/lib/catalog";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function ProductBrowser({
  products,
  initialCategory = "all",
  initialSub = "all",
  lockCategory = false,
}: {
  products: Product[];
  initialCategory?: string;
  initialSub?: string;
  lockCategory?: boolean;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sub, setSub] = useState(initialSub);
  const [sort, setSort] = useState<SortKey>("featured");

  const activeCategory = categories.find((c) => c.slug === category);
  const subOptions = activeCategory?.subcategories ?? [];

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (sub !== "all") list = list.filter((p) => p.subcategory === sub);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort(
          (a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0)
        );
    }
    return list;
  }, [products, category, sub, sort]);

  return (
    <div>
      {/* filter bar */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {!lockCategory && (
            <>
              <button
                onClick={() => {
                  setCategory("all");
                  setSub("all");
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                  category === "all"
                    ? "bg-ink text-white"
                    : "bg-sand text-ink hover:bg-neutral-200"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    setCategory(c.slug);
                    setSub("all");
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                    category === c.slug
                      ? "bg-ink text-white"
                      : "bg-sand text-ink hover:bg-neutral-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-widest text-neutral-500">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-black/15 bg-sand px-4 py-2 text-sm text-ink focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* subcategory chips */}
      {subOptions.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSub("all")}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition ${
              sub === "all"
                ? "border-gold bg-gold text-white"
                : "border-black/15 text-ink hover:border-gold"
            }`}
          >
            All {activeCategory?.name}
          </button>
          {subOptions.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSub(s.slug)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition ${
                sub === s.slug
                  ? "border-gold bg-gold text-white"
                  : "border-black/15 text-ink hover:border-gold"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <p className="mb-6 text-sm text-neutral-500">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white py-20 text-center ring-1 ring-black/5">
          <p className="text-neutral-500">No products match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
