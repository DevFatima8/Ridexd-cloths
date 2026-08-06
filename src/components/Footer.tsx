import Link from "next/link";
import { categories } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="bg-ink text-sand">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-3xl tracking-[0.2em]">AURORA</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/70">
              Considered clothing for the modern wardrobe. Designed in-house,
              crafted responsibly, made to last.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-sand/25 px-4 py-2 text-xs uppercase tracking-widest transition hover:bg-sand hover:text-ink"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-sand/70">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="transition hover:text-sand"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="transition hover:text-sand">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-sand/70">
              <li>
                <Link href="/about" className="transition hover:text-sand">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-sand">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-sand">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-sand">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="transition hover:text-sand">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-sand/70">
              Join for early access to drops & 10% off your first order.
            </p>
            <form className="mt-4 flex overflow-hidden rounded-full bg-sand/10 ring-1 ring-sand/20">
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-sand placeholder:text-sand/50 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gold px-5 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-sand/15 pt-8 text-xs text-sand/50 md:flex-row">
          <p>© {new Date().getFullYear()} Aurora Studio. All rights reserved.</p>
          <p>Crafted with Next.js · Payments via secure order form</p>
        </div>
      </div>
    </footer>
  );
}
