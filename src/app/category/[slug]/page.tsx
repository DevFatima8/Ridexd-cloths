import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ProductBrowser from "@/components/ProductBrowser";
import { categories, getCategory } from "@/lib/catalog";
import { getProductsByCategory } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  return {
    title: cat ? `${cat.name} — AURORA` : "AURORA",
    description: cat?.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}) {
  const { slug } = await params;
  const { sub = "all" } = await searchParams;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = await getProductsByCategory(slug);

  return (
    <div>
      {/* category hero */}
      <section className="relative h-[46vh] min-h-[340px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cat.image}
          alt={cat.name}
          className="animate-slow-zoom h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-sand">
          <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-gold">
            {cat.tagline}
          </p>
          <h1 className="animate-fade-in font-display text-5xl lg:text-6xl">
            {cat.name}
          </h1>
          <p
            className="animate-fade-in mt-3 max-w-xl text-sand/80"
            style={{ animationDelay: "150ms" }}
          >
            {cat.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <ProductBrowser
          products={list}
          initialCategory={slug}
          initialSub={sub}
          lockCategory
        />
      </div>
    </div>
  );
}
