"use client";

import { useEffect, useState, useCallback, startTransition } from "react";
import Link from "next/link";

interface User {
  id: string; name: string | null; email: string | null;
  role: string; createdAt: string;
  _count: { orders: number };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/users?page=${page}`);
      const data = await r.json();
      setUsers(data.users);
      setTotal(data.total);
    } catch {
      // keep existing data on error
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    startTransition(() => { fetchData(); });
  }, [fetchData]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Users</h1>
        <span className="text-sm text-muted">{total} total</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : users.length === 0 ? (
        <p className="text-muted text-center py-20">No users found.</p>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Orders</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${user.id}`} className="hover:underline">
                      <p className="text-sm font-medium text-foreground">{user.name || "Unnamed"}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{user._count.orders}</td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
