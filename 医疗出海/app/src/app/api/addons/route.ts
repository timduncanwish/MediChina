import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const addOns = await prisma.addOn.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json({ addOns });
}
