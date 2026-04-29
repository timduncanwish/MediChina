import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const skip = (page - 1) * limit;

  const where = status && status !== "all" ? { status } : {};

  const [inquiries, total] = await Promise.all([
    prisma.contactInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contactInquiry.count({ where }),
  ]);

  return NextResponse.json({ inquiries, total, page, pages: Math.ceil(total / limit) });
}
