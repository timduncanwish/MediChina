import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;

  const reviews = await prisma.review.findMany({
    where: { productId, verified: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}
