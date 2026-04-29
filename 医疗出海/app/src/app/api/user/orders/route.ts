import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id as string;

  // Also link any unlinked orders matching the user's email
  if (session.user.email) {
    await prisma.order.updateMany({
      where: {
        customerEmail: session.user.email,
        userId: null,
      },
      data: { userId },
    });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
