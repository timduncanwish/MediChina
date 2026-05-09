"use client";

import { Suspense, useEffect, useState, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface OrderItem {
  title: string;
  price: number;
  quantity: number;
}

interface OrderData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  currency: string;
  paymentStatus: string;
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      startTransition(() => {
        setError("No session found.");
        setLoading(false);
      });
      return;
    }

    fetch(`/api/order?session_id=${sessionId}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load order");
        }
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2 font-heading">
            Order Not Found
          </h1>
          <p className="text-muted mb-6">{error || "We could not find your order details."}</p>
          <Link
            href="/"
            className="inline-flex items-center bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-heading"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            Booking Confirmed!
          </h1>

          <p className="text-muted text-lg mb-2">
            Thank you, {order.customerName}!
          </p>
          <p className="text-muted">
            A confirmation email has been sent to <strong>{order.customerEmail}</strong>
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-muted-light rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-foreground font-heading">
              Order Details
            </h2>
            <span className="text-sm font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
              {order.orderNumber}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted">
                  {item.title} x{item.quantity}
                </span>
                <span className="text-foreground font-medium">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-primary">
              ${order.total.toLocaleString()} {order.currency}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-secondary rounded-full" />
            <span className="text-secondary font-medium capitalize">
              Payment {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-white border border-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 font-heading">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Concierge Contact",
                description:
                  "Our team will reach out within 24-48 hours to help plan your itinerary.",
              },
              {
                step: "2",
                title: "Schedule Appointment",
                description:
                  "We will work with you to select the best date and time for your screening.",
              },
              {
                step: "3",
                title: "Preparation Guide",
                description:
                  "You will receive a detailed preparation guide including fasting instructions.",
              },
              {
                step: "4",
                title: "Travel to Korea",
                description:
                  "We assist with travel recommendations and airport transfer arrangements.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 font-heading">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground font-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-2 font-heading">
            Important Information
          </h3>
          <ul className="text-sm text-muted space-y-1">
            <li>- Free reschedule within 12 months of booking.</li>
            <li>- Full refund if cancelled 7+ days before appointment.</li>
            <li>- 50% refund for cancellations less than 7 days before.</li>
            <li>- English medical interpretation included at no extra cost.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-heading"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-heading"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  );
}
