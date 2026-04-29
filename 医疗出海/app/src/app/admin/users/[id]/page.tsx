"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface UserDetail {
  id: string; name: string | null; email: string | null;
  phone: string | null; nationality: string | null;
  role: string; languagePref: string; createdAt: string;
  orders: {
    id: string; orderNumber: string; status: string;
    paymentStatus: string; totalAmount: number; createdAt: string;
    items: { title: string }[];
  }[];
}

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then((r) => r.json())
      .then((data) => { setUser(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!user) {
    return <p className="text-muted text-center py-20">User not found.</p>;
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
          {user.name || "User"}
        </h1>
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
          {user.role}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User info */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary font-heading">
              {(user.name || user.email || "U")[0].toUpperCase()}
            </span>
          </div>
          <div className="space-y-2 text-sm text-center mb-4">
            <p className="font-semibold text-foreground">{user.name || "Unnamed"}</p>
            <p className="text-muted">{user.email}</p>
          </div>
          <div className="space-y-2 text-sm border-t border-border pt-4">
            {user.phone && <p><span className="text-muted">Phone:</span> {user.phone}</p>}
            {user.nationality && <p><span className="text-muted">Nationality:</span> {user.nationality}</p>}
            <p><span className="text-muted">Language:</span> {user.languagePref}</p>
            <p><span className="text-muted">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground font-heading">Orders ({user.orders.length})</h2>
          </div>
          {user.orders.length === 0 ? (
            <p className="p-6 text-muted text-center">No orders yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {user.orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-sm text-primary">{order.orderNumber}</p>
                    <p className="text-xs text-muted">{order.items.map((i) => i.title).join(", ")}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-semibold text-foreground text-sm">${order.totalAmount.toLocaleString()}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${order.status === "completed" ? "bg-green-100 text-green-700" : order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
