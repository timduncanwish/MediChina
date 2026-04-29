"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  appointmentDate: string | null;
  items: OrderItem[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

const PAYMENT_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "Paid", color: "bg-green-100 text-green-700" },
  failed: { label: "Failed", color: "bg-red-100 text-red-700" },
  refunded: { label: "Refunded", color: "bg-gray-100 text-gray-700" },
  partially_refunded: { label: "Partial Refund", color: "bg-orange-100 text-orange-700" },
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status !== "authenticated") return;

    fetch("/api/user/orders")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      });
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="bg-muted-light min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            My Account
          </h1>
          <p className="text-muted mt-2">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary font-heading">
                {(session.user.name || session.user.email || "U")[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-foreground font-heading">
                {session.user.name || "User"}
              </p>
              <p className="text-sm text-muted">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground font-heading">
            My Bookings
          </h2>
          <Link
            href="/collections/all"
            className="text-sm text-primary hover:underline font-medium"
          >
            Book New Screening
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <svg className="w-16 h-16 text-muted/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
              No Bookings Yet
            </h3>
            <p className="text-muted mb-6 text-sm">
              Start your health journey with a Korean medical screening package.
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-heading"
            >
              Browse Packages
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                {/* Order Header */}
                <button
                  className="w-full text-left p-5 flex items-center justify-between hover:bg-muted-light/50 transition-colors"
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {order.orderNumber}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${(STATUS_CONFIG[order.status] || STATUS_CONFIG.pending).color}`}>
                        {(STATUS_CONFIG[order.status] || STATUS_CONFIG.pending).label}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${(PAYMENT_STATUS_CONFIG[order.paymentStatus] || PAYMENT_STATUS_CONFIG.pending).color}`}>
                        {(PAYMENT_STATUS_CONFIG[order.paymentStatus] || PAYMENT_STATUS_CONFIG.pending).label}
                      </span>
                    </div>
                    <p className="text-sm text-muted">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" "}&middot; {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-primary">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                    <svg
                      className={`w-5 h-5 text-muted transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Order Detail (expanded) */}
                {expandedOrder === order.id && (
                  <div className="border-t border-border p-5">
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted">
                            {item.title} x{item.quantity}
                          </span>
                          <span className="text-foreground font-medium">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-3 flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-primary">
                          ${order.totalAmount.toLocaleString()} {order.currency}
                        </span>
                      </div>
                    </div>

                    {order.appointmentDate && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
                        <span className="font-medium text-blue-800">Appointment:</span>{" "}
                        <span className="text-blue-700">
                          {new Date(order.appointmentDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        Contact Support
                      </Link>
                      {order.status !== "cancelled" && (
                        <span className="text-sm text-muted">
                          Free reschedule within 12 months
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
