"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">(
    "card"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      if (paymentMethod === "card") {
        // Stripe Checkout
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              title: item.product.title,
              price: item.product.price,
              quantity: item.quantity,
            })),
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Checkout failed");
        }

        // Redirect to Stripe hosted checkout
        if (data.url) {
          clearCart();
          window.location.href = data.url;
          return;
        }
      } else {
        // PayPal - same flow via Stripe with PayPal method
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              title: item.product.title,
              price: item.product.price,
              quantity: item.quantity,
            })),
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
            paymentMethod: "paypal",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Checkout failed");
        }

        if (data.url) {
          clearCart();
          window.location.href = data.url;
          return;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
            Nothing to Checkout
          </h1>
          <p className="text-muted mb-6">
            Your cart is empty. Add some health screening packages first.
          </p>
          <a
            href="/collections/all"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-[family-name:var(--font-heading)]"
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)]">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
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
                <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
                  Payment Method
                </h2>
                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted-light transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-primary focus:ring-primary"
                    />
                    <svg
                      className="w-8 h-5 text-muted"
                      viewBox="0 0 32 20"
                      fill="currentColor"
                    >
                      <rect width="32" height="20" rx="3" />
                    </svg>
                    <span className="text-sm font-medium text-foreground">
                      Credit / Debit Card
                    </span>
                    <span className="ml-auto text-xs text-muted">
                      Visa, Mastercard, AMEX
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted-light transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="w-8 h-5 bg-[#003087] rounded flex items-center justify-center">
                      <span className="text-[#009cde] text-[8px] font-bold">PP</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      PayPal
                    </span>
                  </label>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted">
                    {paymentMethod === "paypal"
                      ? "You will be redirected to PayPal to complete your purchase."
                      : "You will be redirected to our secure payment page powered by Stripe."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
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
                  disabled={isProcessing}
                  className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-colors font-[family-name:var(--font-heading)] disabled:opacity-50 disabled:cursor-not-allowed"
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
