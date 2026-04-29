import { NextRequest, NextResponse } from "next/server";
import { stripe, formatAmountForStripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerEmail, customerName, customerPhone, customerNationality, paymentMethod } = body;

    if (!items || !items.length) {
      return NextResponse.json(
        { error: "Items are required." },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email is required." },
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
      customer_email: customerEmail,
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
