import Reveal from "@/components/Reveal";
import ProductBrowser from "@/components/ProductBrowser";
import { getAllProducts } from "@/lib/store";

export const metadata = {
  title: "Shop All — Ridexd",
  description: "Browse the full Ridexd collection across all categories.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sub?: string }>;
}) {
  const { category = "all", sub = "all" } = await searchParams;
  const products = await getAllProducts();

  return (
    <div>
      <section className="bg-ink py-16 text-center text-sand">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Everything
          </p>
          <h1 className="mt-2 font-display text-5xl">The Collection</h1>
          <p className="mx-auto mt-3 max-w-md text-sand/70">
            Filter by category, refine by style and sort to find your next
            favourite piece.
          </p>
        </Reveal>
      </section>
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <ProductBrowser
          products={products}
          initialCategory={category}
          initialSub={sub}
        />
      </div>
    </div>
  );
}
