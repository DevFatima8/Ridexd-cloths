import { db } from "@/db";
import { orders, type OrderItem } from "@/db/schema";

export const dynamic = "force-dynamic";

type OrderPayload = {
  reference?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  notes?: string;
  items?: OrderItem[];
  total?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;

    if (
      !body.name ||
      !body.email ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return Response.json(
        { ok: false, error: "Missing required order fields." },
        { status: 400 }
      );
    }

    const reference =
      body.reference || "AUR-" + Date.now().toString(36).toUpperCase();

    const [saved] = await db
      .insert(orders)
      .values({
        reference,
        customerName: body.name,
        email: body.email,
        phone: body.phone ?? "",
        address: body.address ?? "",
        city: body.city ?? "",
        country: body.country ?? "",
        notes: body.notes ?? "",
        items: body.items,
        total: String(body.total ?? 0),
      });

    return Response.json({ ok: true, reference, id: saved.insertId });
  } catch (err) {
    console.error("order save failed", err);
    return Response.json(
      { ok: false, error: "Could not save order." },
      { status: 500 }
    );
  }
}
