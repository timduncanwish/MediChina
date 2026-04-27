"use client";

import { useState, useEffect, Suspense } from "react";
import { useCart } from "@/components/CartProvider";
import { useRouter, useSearchParams } from "next/navigation";

type PaymentMethod = "card" | "paypal" | "alipay" | "wechat_pay" | "wise" | "crypto";

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  name: string;
  detail: string;
  icon: React.ReactNode;
  available: boolean;
}[] = [
  {
    id: "card",
    name: "Credit / Debit Card",
    detail: "Visa, Mastercard, AMEX",
    icon: (
      <svg className="w-8 h-5 text-muted" viewBox="0 0 32 20" fill="currentColor">
        <rect width="32" height="20" rx="3" />
      </svg>
    ),
    available: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    detail: "",
    icon: (
      <div className="w-8 h-5 bg-[#003087] rounded flex items-center justify-center">
        <span className="text-[#009cde] text-[8px] font-bold">PP</span>
      </div>
    ),
    available: true,
  },
  {
    id: "alipay",
    name: "支付宝 Alipay",
    detail: "",
    icon: (
      <div className="w-8 h-5 bg-[#1677FF] rounded flex items-center justify-center">
        <span className="text-white text-[7px] font-bold">支</span>
      </div>
    ),
    available: true,
  },
  {
    id: "wechat_pay",
    name: "微信支付 WeChat Pay",
    detail: "",
    icon: (
      <div className="w-8 h-5 bg-[#07C160] rounded flex items-center justify-center">
        <span className="text-white text-[7px] font-bold">微</span>
      </div>
    ),
    available: true,
  },
  {
    id: "wise",
    name: "Wise",
    detail: "International Transfer",
    icon: (
      <div className="w-8 h-5 bg-[#9FE870] rounded flex items-center justify-center">
        <span className="text-[#163300] text-[7px] font-bold">W</span>
      </div>
    ),
    available: false,
  },
  {
    id: "crypto",
    name: "Crypto (Creem)",
    detail: "USDT, BTC, ETH",
    icon: (
      <div className="w-8 h-5 bg-[#F7931A] rounded flex items-center justify-center">
        <span className="text-white text-[7px] font-bold">₿</span>
      </div>
    ),
    available: false,
  },
];

function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
  });

  // Handle cancelled payment redirect from Stripe
  useEffect(() => {
    if (searchParams.get("cancelled") === "true") {
      setError("Payment was cancelled. You can try again when ready.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selected = PAYMENT_OPTIONS.find((o) => o.id === paymentMethod);
    if (!selected?.available) {
      setError(`${selected?.name || "This method"} is coming soon. Please choose another payment method.`);
      return;
    }

    setIsProcessing(true);
    setError(null);

    const payload = {
      items: items.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      })),
      customerEmail: formData.email,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerNationality: formData.nationality,
      paymentMethod,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed. Please try again.");
      }

      if (data.url) {
        clearCart();
        window.location.href = data.url;
        return;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && searchParams.get("cancelled") !== "true") {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4 font-heading">
            Nothing to Checkout
          </h1>
          <p className="text-muted mb-6">
            Your cart is empty. Add some health screening packages first.
          </p>
          <a
            href="/collections/all"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-heading"
          >
            Browse Packages
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-heading">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p>{error}</p>
              {error.includes("cancelled") && (
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 underline text-xs mt-1"
                >
                  Dismiss
                </button>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 font-heading">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Nationality
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nationality: e.target.value,
                        })
                      }
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="SG">Singapore</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 font-heading">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`relative flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted-light transition-colors ${paymentMethod === opt.id ? "border-primary bg-primary/5" : "border-border"} ${!opt.available ? "opacity-60" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id)}
                        className="text-primary focus:ring-primary"
                      />
                      {opt.icon}
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium text-foreground block truncate">
                          {opt.name}
                        </span>
                        {opt.detail && (
                          <span className="text-xs text-muted">{opt.detail}</span>
                        )}
                      </div>
                      {!opt.available && (
                        <span className="text-[10px] bg-muted/20 text-muted px-1.5 py-0.5 rounded font-medium shrink-0">
                          Soon
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-sm text-muted">
                    {paymentMethod === "alipay"
                      ? "You will be redirected to Alipay to complete your purchase."
                      : paymentMethod === "wechat_pay"
                        ? "You will scan a QR code with WeChat to complete payment."
                        : paymentMethod === "paypal"
                          ? "You will be redirected to PayPal to complete your purchase."
                          : "You will be redirected to our secure payment page powered by Stripe."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-4 font-heading">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted">
                        {item.product.title} x{item.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-colors font-heading disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing
                    ? "Redirecting to payment..."
                    : `Pay $${totalPrice.toLocaleString()}`}
                </button>

                <p className="text-xs text-muted text-center mt-4">
                  Your payment is secure and encrypted. By proceeding, you
                  agree to our{" "}
                  <a href="/policies/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/policies/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen" />}>
      <CheckoutContent />
    </Suspense>
  );
}
