import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Our Story — AURORA",
  description:
    "AURORA crafts considered clothing for the modern wardrobe — designed in-house and made responsibly.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/7070775/pexels-photo-7070775.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600"
          alt="Aurora atelier"
          className="animate-slow-zoom h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-sand">
          <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-gold">
            Est. 2019
          </p>
          <h1 className="animate-fade-in font-display text-5xl lg:text-6xl">
            Our Story
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl leading-snug text-ink lg:text-4xl">
            We started AURORA with a simple belief: your wardrobe should work
            harder, not grow bigger.
          </h2>
          <p className="mt-6 leading-relaxed text-neutral-600">
            From a small studio to a community of thousands, we've stayed devoted
            to one idea — timeless design, honest materials and craftsmanship
            that lasts. Every collection is designed in-house and produced in
            small, responsible batches with partners we know by name.
          </p>
        </Reveal>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 text-center md:grid-cols-4 lg:px-8">
          {[
            ["50k+", "Happy customers"],
            ["120+", "Signature pieces"],
            ["18", "Countries shipped"],
            ["4.9★", "Average rating"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 90}>
              <p className="font-display text-4xl text-ink">{n}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500">
                {l}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "Designed in-house",
              "Every silhouette is drawn, prototyped and refined by our own design team.",
            ],
            [
              "Made responsibly",
              "Natural fibres, low-waste production and partners who share our values.",
            ],
            [
              "Built to last",
              "We obsess over fit, finish and durability so your favourites stay favourites.",
            ],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="hover-lift h-full rounded-3xl bg-white p-8 ring-1 ring-black/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-display text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-neutral-600">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-sand">
        <Reveal className="mx-auto max-w-xl px-5">
          <h2 className="font-display text-4xl">Join the AURORA community</h2>
          <p className="mt-4 text-sand/70">
            Discover pieces designed to be worn, loved and kept for years.
          </p>
          <Link
            href="/shop"
            className="btn-sheen mt-8 inline-block rounded-full bg-sand px-10 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-white"
          >
            Explore the collection
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
