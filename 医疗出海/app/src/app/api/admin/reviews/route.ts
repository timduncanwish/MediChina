import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const status = request.nextUrl.searchParams.get("status");

  const reviews = await prisma.review.findMany({
    where: status === "pending" ? { verified: false } : undefined,
    include: { product: { select: { title: true, handle: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}
