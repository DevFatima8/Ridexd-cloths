import { db } from "@/db";
import { storeProducts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return Response.json({ ok: false, error: "Invalid id." }, { status: 400 });
    }
    const body = (await request.json()) as ProductBody;

    await db
      .update(storeProducts)
      .set({
        name: body.name,
        price: body.price !== undefined ? String(body.price) : undefined,
        compareAt:
          body.compareAt !== undefined
            ? body.compareAt === null || body.compareAt === ""
              ? null
              : String(body.compareAt)
            : undefined,
        category: body.category,
        subcategory: body.subcategory,
        image: body.image,
        description: body.description,
        colors:
          body.colors !== undefined
            ? normalizeList(body.colors, "Default")
            : undefined,
        sizes:
          body.sizes !== undefined
            ? normalizeList(body.sizes, "One Size")
            : undefined,
        isNew: body.isNew,
      })
      .where(eq(storeProducts.id, numericId));

    const [updatedProduct] = await db
      .select()
      .from(storeProducts)
      .where(eq(storeProducts.id, numericId))
      .limit(1);

    if (!updatedProduct) {
      return Response.json(
        { ok: false, error: "Product not found." },
        { status: 404 }
      );
    }
    return Response.json({ ok: true, product: updatedProduct });
  } catch (err) {
    console.error("update product failed", err);
    return Response.json(
      { ok: false, error: "Could not update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return Response.json({ ok: false, error: "Invalid id." }, { status: 400 });
    }
    await db
      .delete(storeProducts)
      .where(eq(storeProducts.id, numericId));

    return Response.json({ ok: true });
  } catch (err) {
    console.error("delete product failed", err);
    return Response.json(
      { ok: false, error: "Could not delete product." },
      { status: 500 }
    );
  }
}
