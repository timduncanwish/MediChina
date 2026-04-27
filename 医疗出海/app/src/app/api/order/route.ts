import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "session_id is required" },
      { status: 400 }
    );
  }

  // Find order by Stripe session ID
  const order = await prisma.order.findFirst({
    where: { stripeSessionId: sessionId },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json(
      { error: "Order not found. It may still be processing." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    customerEmail: order.customerEmail,
    customerName: `${order.customerFirstName} ${order.customerLastName}`.trim(),
    items: order.items.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    })),
    total: order.totalAmount,
    currency: order.currency,
    paymentStatus: order.paymentStatus,
  });
}
