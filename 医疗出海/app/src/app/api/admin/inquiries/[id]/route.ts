import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json(inquiry);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { status } = await request.json();

  const inquiry = await prisma.contactInquiry.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(inquiry);
}
