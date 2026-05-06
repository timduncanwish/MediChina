import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();

  // Approve review and update product stats
  if (body.verified === true) {
    const review = await prisma.review.update({
      where: { id },
      data: { verified: true },
    });

    // Recalculate product stats
    await updateProductStats(review.productId);
    return NextResponse.json(review);
  }

  // Reject / delete
  if (body.action === "reject") {
    const review = await prisma.review.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const review = await prisma.review.delete({ where: { id } });
  await updateProductStats(review.productId);

  return NextResponse.json({ ok: true });
}

async function updateProductStats(productId: string) {
  const stats = await prisma.review.aggregate({
    where: { productId, verified: true },
    _count: true,
    _avg: { rating: true },
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      reviewsCount: stats._count,
      averageRating: stats._avg.rating ?? 0,
    },
  });
}
