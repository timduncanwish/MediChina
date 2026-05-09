import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { sanitizeText } from "@/lib/validate";

const VALID_CATEGORIES = ["imaging", "blood", "genetic", "wellness"];

function sanitizeAddonData(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  if (typeof body.name === "string") data.name = sanitizeText(body.name);
  if (typeof body.description === "string") data.description = sanitizeText(body.description);
  if (typeof body.price === "number" && isFinite(body.price) && body.price >= 0) data.price = body.price;
  if (typeof body.category === "string" && VALID_CATEGORIES.includes(body.category)) data.category = body.category;
  if (typeof body.icon === "string") data.icon = body.icon.trim();
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (typeof body.sortOrder === "number" && isFinite(body.sortOrder)) data.sortOrder = Math.floor(body.sortOrder);
  return data;
}

export { sanitizeAddonData };

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const addons = await prisma.addOn.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(addons);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const data = sanitizeAddonData(body);

  if (!data.name || data.price === undefined || !data.category) {
    return NextResponse.json({ error: "Name, price, and category are required." }, { status: 400 });
  }

  const addon = await prisma.addOn.create({ data: data as never });

  return NextResponse.json(addon, { status: 201 });
}
