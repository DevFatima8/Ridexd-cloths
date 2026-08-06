import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { getProduct } from "@/lib/catalog";
import { getProductBySlug, getRelatedProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug) ?? (await getProductBySlug(slug));
  return {
    title: product ? `${product.name} — AURORA` : "AURORA",
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug) ?? (await getProductBySlug(slug));
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              You may also like
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Complete the look
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
