import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const [
    totalOrders,
    totalRevenue,
    pendingOrders,
    totalInquiries,
    newInquiries,
    totalUsers,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true }, where: { paymentStatus: "paid" } }),
    prisma.order.count({ where: { status: "confirmed", paymentStatus: "paid" } }),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { status: "new" } }),
    prisma.user.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  return NextResponse.json({
    totalOrders,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    pendingOrders,
    totalInquiries,
    newInquiries,
    totalUsers,
    recentOrders,
  });
}
