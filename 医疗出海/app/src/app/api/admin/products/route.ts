import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { sanitizeText, sanitizeStringArray } from "@/lib/validate";

function sanitizeProductData(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  if (typeof body.title === "string") data.title = sanitizeText(body.title);
  if (typeof body.handle === "string") data.handle = sanitizeText(body.handle).toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (typeof body.description === "string") data.description = body.description;
  if (typeof body.price === "number" && isFinite(body.price) && body.price > 0) data.price = body.price;
  if (typeof body.compareAtPrice === "number" && isFinite(body.compareAtPrice)) data.compareAtPrice = body.compareAtPrice;
  if (typeof body.category === "string" && ["comprehensive", "focused"].includes(body.category)) data.category = body.category;
  if (typeof body.durationEstimate === "string") data.durationEstimate = sanitizeText(body.durationEstimate);
  if (typeof body.partnerHospital === "string") data.partnerHospital = sanitizeText(body.partnerHospital);
  if (typeof body.preparationInstructions === "string") data.preparationInstructions = body.preparationInstructions;
  if (Array.isArray(body.includes)) data.includes = sanitizeStringArray(body.includes);
  if (Array.isArray(body.images)) data.images = (body.images as string[]).filter((u) => typeof u === "string");
  if (typeof body.calendlyEventType === "string") data.calendlyEventType = body.calendlyEventType;
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (typeof body.sortOrder === "number" && isFinite(body.sortOrder)) data.sortOrder = Math.floor(body.sortOrder);
  return data;
}

export { sanitizeProductData };

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const data = sanitizeProductData(body);

  if (!data.title || !data.handle || !data.price) {
    return NextResponse.json({ error: "Title, handle, and price are required." }, { status: 400 });
  }

  const product = await prisma.product.create({ data: data as never });

  return NextResponse.json(product, { status: 201 });
}
