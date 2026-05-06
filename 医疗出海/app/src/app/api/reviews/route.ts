import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientKey } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/validate";

export async function POST(request: NextRequest) {
  // Rate limit: 3 reviews per hour per IP
  const rlKey = `review:${getClientKey(request)}`;
  const rl = rateLimit(rlKey, { limit: 3, windowMs: 3_600_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many review submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const rating = Number(body.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const title = sanitizeText(String(body.title || ""));
    const reviewBody = sanitizeText(String(body.body || ""));
    const author = sanitizeText(String(body.author || ""));

    if (!title || title.length < 3) {
      return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 400 });
    }
    if (!reviewBody || reviewBody.length < 10) {
      return NextResponse.json({ error: "Review must be at least 10 characters." }, { status: 400 });
    }
    if (!author) {
      return NextResponse.json({ error: "Author name is required." }, { status: 400 });
    }

    // Verify product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        rating,
        title,
        body: reviewBody,
        author,
        verified: false,
      },
    });

    return NextResponse.json({
      message: "Review submitted successfully. It will appear after moderation.",
      id: review.id,
    }, { status: 201 });
  } catch (err) {
    console.error("Review submission error:", err);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}
