"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface OrderItem { id: string; title: string; price: number; quantity: number; }
interface Order {
  id: string; orderNumber: string; customerEmail: string;
  customerFirstName: string; customerLastName: string;
  status: string; paymentStatus: string; totalAmount: number;
  currency: string; createdAt: string; items: OrderItem[];
}

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const statusFilter = searchParams.get("status") || "all";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/orders?status=${statusFilter}&page=${page}`)
      .then((r) => r.json())
      .then((data) => { setOrders(data.orders); setTotal(data.total); setLoading(false); })
      .catch(() => setLoading(false));
  }, [statusFilter, page]);

  const pages = Math.ceil(total / 20);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Orders</h1>
        <span className="text-sm text-muted">{total} total</span>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-6">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f.value}
            href={`/admin/orders${f.value === "all" ? "" : `?status=${f.value}`}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === f.value
                ? "bg-primary text-white"
                : "bg-white border border-border text-muted hover:text-foreground"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : orders.length === 0 ? (
        <p className="text-muted text-center py-20">No orders found.</p>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Order</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Payment</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase">Total</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${order.id}`} className="font-mono text-sm text-primary hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">{order.customerEmail}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground text-sm">${order.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium ${p === page ? "bg-primary text-white" : "bg-white border border-border text-muted hover:text-foreground"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
