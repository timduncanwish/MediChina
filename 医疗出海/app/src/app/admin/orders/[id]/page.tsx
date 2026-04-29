"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface OrderItem { id: string; title: string; price: number; quantity: number; }
interface OrderDetail {
  id: string; orderNumber: string; customerEmail: string;
  customerFirstName: string; customerLastName: string; customerPhone: string | null;
  status: string; paymentStatus: string; totalAmount: number; currency: string;
  appointmentDate: string | null; appointmentTime: string | null;
  interpreterLanguage: string | null; refundStatus: string;
  stripeSessionId: string | null; createdAt: string; updatedAt: string;
  items: OrderItem[];
  user: { id: string; name: string | null; email: string | null } | null;
}

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];
const PAYMENT_OPTIONS = ["pending", "paid", "failed", "refunded"];

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then((data) => { setOrder(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const updateStatus = async (field: "status" | "paymentStatus", value: string) => {
    setUpdating(true);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    const updated = await res.json();
    setOrder(updated);
    setUpdating(false);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!order) {
    return <p className="text-muted text-center py-20">Order not found.</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-muted hover:text-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-foreground font-heading">
          Order {order.orderNumber}
        </h1>
        {updating && <span className="text-sm text-muted animate-pulse">Updating...</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Controls */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Status</h2>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="text-xs text-muted block mb-1">Order Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus("status", e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Payment Status</label>
                <select
                  value={order.paymentStatus}
                  onChange={(e) => updateStatus("paymentStatus", e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {PAYMENT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted">{item.title} x{item.quantity}</span>
                  <span className="text-foreground font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">${order.totalAmount.toLocaleString()} {order.currency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Customer</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted">Name:</span> <span className="text-foreground">{order.customerFirstName} {order.customerLastName}</span></p>
              <p><span className="text-muted">Email:</span> <span className="text-foreground">{order.customerEmail}</span></p>
              {order.customerPhone && <p><span className="text-muted">Phone:</span> <span className="text-foreground">{order.customerPhone}</span></p>}
              {order.user && (
                <p><span className="text-muted">Account:</span> <Link href={`/admin/users/${order.user.id}`} className="text-primary hover:underline">{order.user.email}</Link></p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Details</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted">Created:</span> <span className="text-foreground">{new Date(order.createdAt).toLocaleString()}</span></p>
              <p><span className="text-muted">Updated:</span> <span className="text-foreground">{new Date(order.updatedAt).toLocaleString()}</span></p>
              <p><span className="text-muted">Refund:</span> <span className="text-foreground capitalize">{order.refundStatus}</span></p>
              {order.appointmentDate && <p><span className="text-muted">Appointment:</span> <span className="text-foreground">{new Date(order.appointmentDate).toLocaleDateString()}</span></p>}
              {order.interpreterLanguage && <p><span className="text-muted">Interpreter:</span> <span className="text-foreground">{order.interpreterLanguage}</span></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
