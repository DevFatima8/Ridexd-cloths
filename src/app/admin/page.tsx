"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout } from "@/lib/adminAuth";
import { categories, formatPrice } from "@/lib/catalog";
import type { StoreProduct } from "@/db/schema";

type FormState = {
  id?: number;
  name: string;
  price: string;
  compareAt: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  colors: string;
  sizes: string;
};

const emptyForm: FormState = {
  name: "",
  price: "",
  compareAt: "",
  category: categories[0].slug,
  subcategory: categories[0].subcategories[0].slug,
  image: "",
  description: "",
  colors: "",
  sizes: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<{ name: string; email: string } | null>(
    null
  );
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Open the dashboard directly. If an admin happens to be signed in,
    // greet them by name — but access is never blocked or redirected.
    setSession(getSession());
    setReady(true);
    void loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.ok) setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }

  const activeCategory = categories.find((c) => c.slug === form.category);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditing(false);
  }

  function startEdit(p: StoreProduct) {
    setForm({
      id: p.id,
      name: p.name,
      price: String(p.price),
      compareAt: p.compareAt ? String(p.compareAt) : "",
      category: p.category,
      subcategory: p.subcategory,
      image: p.image,
      description: p.description,
      colors: (p.colors || []).join(", "),
      sizes: (p.sizes || []).join(", "),
    });
    setEditing(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = {
      name: form.name,
      price: form.price,
      compareAt: form.compareAt || null,
      category: form.category,
      subcategory: form.subcategory,
      image: form.image,
      description: form.description,
      colors: form.colors,
      sizes: form.sizes,
    };
    try {
      const res = await fetch(
        editing ? `/api/products/${form.id}` : "/api/products",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.ok) {
        setMessage(editing ? "Product updated ✓" : "Product created ✓");
        resetForm();
        await loadProducts();
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      await loadProducts();
      if (form.id === id) resetForm();
    }
  }

  function handleLogout() {
    logout();
    setSession(null);
    router.push("/");
  }

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-neutral-500">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Admin Dashboard
          </p>
          <h1 className="mt-1 font-display text-4xl text-ink">
            Welcome, {session?.name || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Create products — they appear instantly in their category on the
            storefront.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/shop"
            className="rounded-full border border-ink/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-white"
          >
            View store
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-3xl bg-white p-6 ring-1 ring-black/5"
        >
          <h2 className="font-display text-2xl text-ink">
            {editing ? "Edit product" : "Add new product"}
          </h2>

          <div className="mt-5 space-y-4">
            <Field
              label="Product name"
              value={form.name}
              onChange={(v) => setField("name", v)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Price ($)"
                type="number"
                value={form.price}
                onChange={(v) => setField("price", v)}
                required
              />
              <Field
                label="Compare at ($)"
                type="number"
                value={form.compareAt}
                onChange={(v) => setField("compareAt", v)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <select
                  value={form.category}
                  onChange={(e) => {
                    const cat = categories.find(
                      (c) => c.slug === e.target.value
                    );
                    setForm((f) => ({
                      ...f,
                      category: e.target.value,
                      subcategory: cat?.subcategories[0].slug ?? "",
                    }));
                  }}
                  className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Subcategory</Label>
                <select
                  value={form.subcategory}
                  onChange={(e) => setField("subcategory", e.target.value)}
                  className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                >
                  {activeCategory?.subcategories.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Field
              label="Image URL"
              value={form.image}
              onChange={(v) => setField("image", v)}
              placeholder="https://…  (leave blank for default)"
            />

            <div>
              <Label>Description</Label>
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
              />
            </div>

            <Field
              label="Colours (comma separated)"
              value={form.colors}
              onChange={(v) => setField("colors", v)}
              placeholder="Black, White, Sand"
            />
            <Field
              label="Sizes (comma separated)"
              value={form.sizes}
              onChange={(v) => setField("sizes", v)}
              placeholder="S, M, L, XL"
            />

            {message && (
              <p className="text-sm font-medium text-gold">{message}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-sheen flex-1 rounded-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
              >
                {saving
                  ? "Saving…"
                  : editing
                  ? "Update product"
                  : "Create product"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-ink/20 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* list */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink">
              Your products{" "}
              <span className="text-sm text-neutral-500">
                ({products.length})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-white py-16 text-center text-neutral-500 ring-1 ring-black/5">
              Loading…
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl bg-white py-16 text-center ring-1 ring-black/5">
              <p className="text-neutral-500">
                No admin products yet. Create your first one!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-black/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-20 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg text-ink">{p.name}</p>
                    <p className="text-xs uppercase tracking-widest text-gold">
                      {p.category} · {p.subcategory}
                    </p>
                    <p className="mt-1 text-sm text-ink">
                      {formatPrice(Number(p.price))}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/product/${p.slug}`}
                      className="rounded-full border border-ink/15 px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-sand"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-sand"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        step={type === "number" ? "0.01" : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/15 bg-sand px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
      />
    </div>
  );
}
