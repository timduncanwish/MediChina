import { NextRequest, NextResponse } from "next/server";
import { stripe, formatAmountForStripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { rateLimit, getClientKey } from "@/lib/rate-limit";
import { sanitizeText, isValidEmail } from "@/lib/validate";

export async function POST(request: NextRequest) {
  // Rate limit: 10 checkout attempts per minute per IP
  const rlKey = `checkout:${getClientKey(request)}`;
  const rl = rateLimit(rlKey, { limit: 10, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body = await request.json();
    const { items, customerEmail, customerPhone, customerNationality, paymentMethod } = body;
    const customerName = sanitizeText(String(body.customerName || ""));
    const sanitizedEmail = sanitizeText(String(customerEmail || ""));

    if (!items || !Array.isArray(items) || !items.length) {
      return NextResponse.json(
        { error: "Items are required." },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (typeof item.price !== "number" || item.price <= 0 || item.price > 100000) {
        return NextResponse.json(
          { error: "Invalid item price." },
          { status: 400 }
        );
      }
      if (typeof item.quantity !== "number" || item.quantity < 1 || item.quantity > 10) {
        return NextResponse.json(
          { error: "Invalid item quantity." },
          { status: 400 }
        );
      }
    }

    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: "Customer email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Get authenticated user if available
    const authSession = await getServerSession();
    const userId = authSession?.user?.id as string | undefined;

    const origin = request.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Map frontend payment method to Stripe payment_method_types
    const methodMap: Record<string, string[]> = {
      card: ["card"],
      paypal: ["card", "paypal"],
      alipay: ["card", "alipay"],
      wechat_pay: ["wechat_pay"],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paymentMethodTypes = (methodMap[paymentMethod] || ["card"]) as any;

    // Encode product IDs and quantities in metadata for webhook to link OrderItems to real Products
    const productData = items.map(
      (item: { productId: string; quantity: number }) =>
        `${item.productId}:${item.quantity}`
    ).join(",");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      mode: "payment",
      customer_email: sanitizedEmail,
      line_items: items.map(
        (item: { title: string; price: number; quantity: number }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: formatAmountForStripe(item.price),
          },
          quantity: item.quantity,
        })
      ),
      metadata: {
        customerName: customerName || "",
        customerPhone: customerPhone || "",
        customerNationality: customerNationality || "",
        userId: userId || "",
        productData,
      },
      success_url: `${origin}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=true`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : "Failed to create checkout session.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
