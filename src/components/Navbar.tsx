"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* announcement marquee */}
      <div className="overflow-hidden bg-ink text-white">
        <div className="marquee-track flex w-max whitespace-nowrap py-2 text-[11px] uppercase tracking-[0.25em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex">
              {[
                "Free shipping over $120",
                "New season drop live now",
                "30-day easy returns",
                "Handcrafted essentials",
              ].map((t) => (
                <span key={t} className="mx-8 flex items-center gap-3">
                  <span className="text-gold">✦</span> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-sand/90 shadow-sm backdrop-blur"
            : "bg-sand"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            className="lg:hidden text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-[0.2em] text-ink"
          >
            Ridexd
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {categories.map((cat) => (
              <li
                key={cat.slug}
                className="group relative"
                onMouseEnter={() => setOpenCat(cat.slug)}
                onMouseLeave={() => setOpenCat(null)}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="link-underline py-2 text-sm font-medium uppercase tracking-widest text-ink"
                >
                  {cat.name}
                </Link>
                {/* dropdown */}
                <div
                  className={`absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    openCat === cat.slug
                      ? "visible opacity-100 translate-y-0"
                      : "invisible opacity-0 translate-y-2"
                  }`}
                >
                  <div className="rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                    <p className="px-3 pb-2 text-[10px] uppercase tracking-widest text-gold">
                      {cat.tagline}
                    </p>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${cat.slug}?sub=${sub.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-ink transition hover:bg-sand"
                      >
                        {sub.name}
                      </Link>
                    ))}
                    <Link
                      href={`/category/${cat.slug}`}
                      className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-gold transition hover:bg-sand"
                    >
                      Shop all {cat.name} →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                className="link-underline py-2 text-sm font-medium uppercase tracking-widest text-ink"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="link-underline py-2 text-sm font-medium uppercase tracking-widest text-ink"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden text-sm font-medium uppercase tracking-widest text-ink lg:block link-underline"
            >
              Contact
            </Link>
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 text-ink transition hover:text-gold"
              aria-label="Open cart"
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2.5 3h2l.6 2m0 0L7 15h10l2-8H5.1Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        <div
          className={`overflow-hidden border-t border-black/5 bg-sand lg:hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[80vh]" : "max-h-0"
          }`}
        >
          <div className="space-y-1 px-5 py-4">
            {categories.map((cat) => (
              <details key={cat.slug} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold uppercase tracking-widest text-ink">
                  {cat.name}
                  <span className="text-gold transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-2 pl-3">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/category/${cat.slug}?sub=${sub.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-sm text-neutral-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-widest text-ink"
            >
              Shop All
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-widest text-ink"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-widest text-ink"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
