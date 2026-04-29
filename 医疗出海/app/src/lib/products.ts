import { prisma } from "@/lib/prisma";
import { Product } from "@/types";

function toProduct(row: {
  id: string; title: string; handle: string; description: string;
  price: number; compareAtPrice: number | null; category: string;
  durationEstimate: string; partnerHospital: string;
  preparationInstructions: string | null; includes: string[];
  images: string[]; calendlyEventType: string | null;
  reviewsCount: number; averageRating: number; isActive: boolean;
  sortOrder: number;
}): Product {
  return {
    ...row,
    compareAtPrice: row.compareAtPrice,
    category: row.category as "comprehensive" | "focused",
    preparationInstructions: row.preparationInstructions,
    calendlyEventType: row.calendlyEventType,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toProduct);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, category },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toProduct);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { handle, isActive: true },
  });
  return row ? toProduct(row) : null;
}

export async function getProductHandles(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    select: { handle: true },
  });
  return rows.map((r) => r.handle);
}
