import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutExpired(session);
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await handleRefund(charge);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

/** Parse "productId:quantity,productId:quantity" from metadata */
function parseProductData(
  productData: string | undefined
): { productId: string; quantity: number }[] {
  if (!productData) return [];
  return productData.split(",").map((entry) => {
    const [productId, qty] = entry.split(":");
    return { productId, quantity: parseInt(qty, 10) || 1 };
  });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  // Skip if already processed (idempotency)
  const existingOrder = await prisma.order.findFirst({
    where: { stripeSessionId: session.id },
  });
  if (existingOrder) return;

  const customerEmail = session.customer_email || "";
  const customerName = session.metadata?.customerName || "";
  const customerPhone = session.metadata?.customerPhone || "";
  const productEntries = parseProductData(session.metadata?.productData);

  const orderNumber = `HM-${Date.now().toString(36).toUpperCase()}`;

  // Build order items: link to real products when possible
  const orderItemsData = productEntries.length > 0
    ? await Promise.all(
        productEntries.map(async (entry) => {
          const product = await prisma.product.findUnique({
            where: { id: entry.productId },
          });
          return {
            productId: entry.productId,
            title: product?.title || "Health Screening Package",
            price: product?.price || 0,
            quantity: entry.quantity,
          };
        })
      )
    : // Fallback: no productData in metadata (legacy)
      await (async () => {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );
        return lineItems.data.map((item) => ({
          productId: "custom",
          title: item.description || "Health Screening Package",
          price: (item.amount_total || 0) / 100,
          quantity: item.quantity || 1,
        }));
      })();

  // Create order with items
  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerEmail,
      customerFirstName: customerName.split(" ")[0] || "",
      customerLastName: customerName.split(" ").slice(1).join(" ") || "",
      customerPhone: customerPhone || undefined,
      totalAmount: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase() || "USD",
      status: "confirmed",
      paymentStatus: "paid",
      stripeSessionId: session.id,
      items: {
        create: orderItemsData,
      },
    },
    include: { items: true },
  });

  console.log(`Order created: ${order.orderNumber} (${order.id})`);

  // Send booking confirmation email (non-blocking)
  sendBookingConfirmation({
    to: customerEmail,
    customerName,
    orderNumber: order.orderNumber,
    items: order.items.map((i) => ({
      title: i.title,
      price: i.price,
      quantity: i.quantity,
    })),
    total: order.totalAmount,
  }).catch((err) => console.error("Failed to send confirmation email:", err));
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  // Mark existing order as cancelled if it was created before expiry
  const order = await prisma.order.findFirst({
    where: { stripeSessionId: session.id },
  });
  if (order && order.paymentStatus === "pending") {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "cancelled",
        paymentStatus: "failed",
      },
    });
    console.log(`Order expired: ${order.orderNumber}`);
  }
}

async function handleRefund(charge: Stripe.Charge) {
  // Find order by Stripe session ID stored on the charge's checkout session
  if (!charge.payment_intent) return;

  // Search for order with this payment intent
  // Since we store stripeSessionId, we need to find the session first
  try {
    const sessions = await stripe.checkout.sessions.list({
      payment_intent: charge.payment_intent.toString(),
      limit: 1,
    });
    const session = sessions.data[0];
    if (!session) return;

    const order = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    });
    if (!order) return;

    const isFullRefund = charge.amount_refunded === charge.amount;
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: isFullRefund ? "refunded" : "paid",
        refundStatus: isFullRefund ? "full" : "partial",
      },
    });
    console.log(
      `Order ${order.orderNumber}: ${isFullRefund ? "full" : "partial"} refund`
    );
  } catch (err) {
    console.error("Failed to handle refund:", err);
  }
}
