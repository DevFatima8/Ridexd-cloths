import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import {
  categories,
  featuredProducts,
  bestSellers,
} from "@/lib/catalog";

export default function HomePage() {
  const featured = featuredProducts().slice(0, 8);
  const best = bestSellers().slice(0, 4);

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/33402057/pexels-photo-33402057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1200"
          alt="Aurora new season"
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 lg:px-8">
          <div className="max-w-xl text-sand">
            <p className="animate-fade-in text-xs uppercase tracking-[0.35em] text-gold">
              Autumn / Winter 2026
            </p>
            <h1 className="animate-fade-in font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Dressed in
              <br /> quiet confidence.
            </h1>
            <p
              className="animate-fade-in mt-6 max-w-md text-base text-sand/80"
              style={{ animationDelay: "150ms" }}
            >
              Elevated essentials and statement pieces, crafted responsibly and
              designed to live in your wardrobe for years.
            </p>
            <div
              className="animate-fade-in mt-8 flex flex-wrap gap-4"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href="/shop"
                className="btn-sheen rounded-full bg-sand px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-white"
              >
                Shop the collection
              </Link>
              <Link
                href="/category/women"
                className="rounded-full border border-sand/50 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-sand transition hover:bg-sand hover:text-ink"
              >
                Women's edit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST BAR ---------------- */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 text-center md:grid-cols-4 lg:px-8">
          {[
            ["Free Shipping", "On orders over $120"],
            ["Easy Returns", "30-day window"],
            ["Ethically Made", "Responsible sourcing"],
            ["Secure Order Form", "Email confirmation"],
          ].map(([t, s], i) => (
            <Reveal key={t} delay={i * 80}>
              <p className="font-display text-lg text-ink">{t}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                {s}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Browse
          </p>
          <h2 className="mt-2 font-display text-4xl text-ink">
            Shop by Category
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 90}>
              <Link
                href={`/category/${cat.slug}`}
                className="group relative block h-[420px] overflow-hidden rounded-3xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="card-img h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-sand">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    {cat.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-2xl">{cat.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.subcategories.slice(0, 3).map((s) => (
                      <span
                        key={s.slug}
                        className="rounded-full bg-sand/15 px-3 py-1 text-[11px] backdrop-blur"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Curated
              </p>
              <h2 className="mt-2 font-display text-4xl text-ink">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-medium uppercase tracking-widest text-ink link-underline sm:block"
            >
              View all →
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EDITORIAL SPLIT ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="relative h-[520px] overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/20437814/pexels-photo-20437814.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900"
              alt="The essentials edit"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              The Aurora Standard
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink lg:text-5xl">
              Fewer, better things.
            </h2>
            <p className="mt-5 max-w-md text-neutral-600">
              We design each piece to be worn on repeat — premium natural fibres,
              considered fits and finishing details you can feel. No trends for
              the sake of trends, just clothing you'll reach for again and again.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Premium organic & natural fabrics",
                "Ethically manufactured in small batches",
                "Designed for longevity, not landfill",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs text-white">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="btn-sheen mt-8 inline-block rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Our story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- BEST SELLERS ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Loved by many
            </p>
            <h2 className="mt-2 font-display text-4xl text-ink">Best Sellers</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {best.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Kind words
          </p>
          <h2 className="mt-2 font-display text-4xl text-ink">
            What our customers say
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "The quality is unreal for the price. The linen overshirt has become my everyday go-to.",
              "Daniyal K.",
              "Verified Buyer",
            ],
            [
              "Ordering was so simple and I got an email confirmation instantly. The dress fits perfectly.",
              "Ayesha R.",
              "Verified Buyer",
            ],
            [
              "Beautiful packaging, fast delivery and genuinely timeless pieces. My new favourite brand.",
              "Omar S.",
              "Verified Buyer",
            ],
          ].map(([quote, name, role], i) => (
            <Reveal key={name} delay={i * 100}>
              <figure className="hover-lift h-full rounded-3xl bg-white p-8 ring-1 ring-black/5">
                <div className="text-gold">★★★★★</div>
                <blockquote className="mt-4 text-ink">“{quote}”</blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-lg text-ink">{name}</p>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden bg-ink py-24 text-center text-sand">
        <div className="animate-float absolute -left-20 top-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="animate-float absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-display text-4xl lg:text-5xl">
            Ready to refresh your wardrobe?
          </h2>
          <p className="mt-4 text-sand/70">
            Explore the full collection and check out in seconds — your order is
            confirmed straight to your inbox.
          </p>
          <Link
            href="/shop"
            className="btn-sheen mt-8 inline-block rounded-full bg-sand px-10 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-white"
          >
            Shop now
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
