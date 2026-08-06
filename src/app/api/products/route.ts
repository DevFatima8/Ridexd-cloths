import { db } from "@/db";
import { storeProducts } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(storeProducts)
      .orderBy(desc(storeProducts.createdAt));
    return Response.json({ ok: true, products: rows });
  } catch (err) {
    console.error("list products failed", err);
    return Response.json(
      { ok: false, error: "Could not load products." },
      { status: 500 }
    );
  }
}

type ProductBody = {
  name?: string;
  price?: number | string;
  compareAt?: number | string | null;
  category?: string;
  subcategory?: string;
  image?: string;
  description?: string;
  colors?: string[] | string;
  sizes?: string[] | string;
  isNew?: boolean;
};

function normalizeList(value: string[] | string | undefined, fallback: string) {
  if (Array.isArray(value)) {
    const cleaned = value.map((v) => v.trim()).filter(Boolean);
    return cleaned.length ? cleaned : [fallback];
  }
  if (typeof value === "string") {
    const cleaned = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    return cleaned.length ? cleaned : [fallback];
  }
  return [fallback];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductBody;

    if (
      !body.name ||
      !body.category ||
      !body.subcategory ||
      body.price === undefined ||
      body.price === ""
    ) {
      return Response.json(
        { ok: false, error: "Name, price, category and subcategory are required." },
        { status: 400 }
      );
    }

    const baseSlug = slugify(body.name);
    const slug = `${baseSlug}-${Date.now().toString(36).slice(-4)}`;
    const colors = normalizeList(body.colors, "Default");
    const sizes = normalizeList(body.sizes, "One Size");
    const image =
      body.image ||
      "https://images.pexels.com/photos/3998648/pexels-photo-3998648.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";
    const description = body.description || "A new arrival from the Ridexd studio.";

    const [saved] = await db
      .insert(storeProducts)
      .values({
        slug,
        name: body.name,
        price: String(body.price),
        compareAt:
          body.compareAt !== undefined &&
          body.compareAt !== null &&
          body.compareAt !== ""
            ? String(body.compareAt)
            : null,
        category: body.category,
        subcategory: body.subcategory,
        image,
        description,
        colors,
        sizes,
        isNew: body.isNew ?? true,
      });

    return Response.json({
      ok: true,
      product: {
        id: saved.insertId,
        slug,
        name: body.name,
        price: String(body.price),
        compareAt: body.compareAt ? String(body.compareAt) : null,
        category: body.category,
        subcategory: body.subcategory,
        image,
        description,
        colors,
        sizes,
        isNew: body.isNew ?? true,
      },
    });
  } catch (err) {
    console.error("create product failed", err);
    return Response.json(
      { ok: false, error: "Could not create product." },
      { status: 500 }
    );
  }
}
