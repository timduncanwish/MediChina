"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalInquiries: number;
  newInquiries: number;
  totalUsers: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    customerEmail: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
    items: { title: string }[];
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!stats) {
    return <p className="text-muted text-center py-20">Failed to load stats.</p>;
  }

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, href: "/admin/orders", color: "bg-blue-500" },
    { label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, href: "/admin/orders", color: "bg-green-500" },
    { label: "Pending Orders", value: stats.pendingOrders, href: "/admin/orders?status=confirmed", color: "bg-yellow-500" },
    { label: "New Inquiries", value: stats.newInquiries, href: "/admin/inquiries?status=new", color: "bg-purple-500" },
    { label: "Total Users", value: stats.totalUsers, href: "/admin/users", color: "bg-indigo-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground font-heading mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-white text-lg font-bold">{String(card.value).charAt(0)}</span>
            </div>
            <p className="text-2xl font-bold text-foreground font-heading">{card.value}</p>
            <p className="text-sm text-muted mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground font-heading">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="p-6 text-muted text-center">No orders yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {stats.recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-mono text-sm text-primary">{order.orderNumber}</p>
                  <p className="text-sm text-muted truncate">{order.customerEmail}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-semibold text-foreground">${order.totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
