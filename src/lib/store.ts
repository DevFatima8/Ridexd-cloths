import { db } from "@/db";
import { storeProducts, type StoreProduct } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  products as staticProducts,
  type Product,
} from "@/lib/catalog";

export function mapDbProduct(row: StoreProduct): Product {
  return {
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    compareAt: row.compareAt ? Number(row.compareAt) : undefined,
    category: row.category,
    subcategory: row.subcategory,
    image: row.image,
    gallery: [row.image],
    description: row.description,
    colors: row.colors?.length ? row.colors : ["Default"],
    sizes: row.sizes?.length ? row.sizes : ["One Size"],
    rating: 5,
    reviews: 0,
    isNew: row.isNew,
    featured: false,
    bestSeller: false,
  };
}

async function getDbProducts(): Promise<Product[]> {
  try {
    const rows = await db
      .select()
      .from(storeProducts)
      .orderBy(desc(storeProducts.createdAt));
    return rows.map(mapDbProduct);
  } catch {
    return [];
  }
}

/** All products: newest admin-created first, then the static catalog. */
export async function getAllProducts(): Promise<Product[]> {
  const dbProducts = await getDbProducts();
  return [...dbProducts, ...staticProducts];
}

export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.category === slug);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const staticMatch = staticProducts.find((p) => p.slug === slug);
  if (staticMatch) return staticMatch;
  try {
    const [row] = await db
      .select()
      .from(storeProducts)
      .where(eq(storeProducts.slug, slug))
      .limit(1);
    return row ? mapDbProduct(row) : undefined;
  } catch {
    return undefined;
  }
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
