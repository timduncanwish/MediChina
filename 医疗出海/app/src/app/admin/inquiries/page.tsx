"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Inquiry {
  id: string; fullName: string; email: string; phone: string | null;
  nationality: string | null; serviceInterest: string | null;
  status: string; createdAt: string;
}

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "resolved", label: "Resolved" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
};

export default function AdminInquiriesPage() {
  const searchParams = useSearchParams();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const statusFilter = searchParams.get("status") || "all";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/inquiries?status=${statusFilter}&page=${page}`)
      .then((r) => r.json())
      .then((data) => { setInquiries(data.inquiries); setTotal(data.total); setLoading(false); })
      .catch(() => setLoading(false));
  }, [statusFilter, page]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Inquiries</h1>
        <span className="text-sm text-muted">{total} total</span>
      </div>

      <div className="flex gap-2 mb-6">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f.value}
            href={`/admin/inquiries${f.value === "all" ? "" : `?status=${f.value}`}`}
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
      ) : inquiries.length === 0 ? (
        <p className="text-muted text-center py-20">No inquiries found.</p>
      ) : (
        <div className="bg-white rounded-xl border border-border divide-y divide-border">
          {inquiries.map((inq) => (
            <Link
              key={inq.id}
              href={`/admin/inquiries/${inq.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-foreground text-sm">{inq.fullName}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[inq.status] || "bg-gray-100 text-gray-700"}`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-sm text-muted truncate">{inq.email}</p>
                {inq.serviceInterest && <p className="text-xs text-muted mt-0.5">Interest: {inq.serviceInterest}</p>}
              </div>
              <p className="text-xs text-muted shrink-0 ml-4">{new Date(inq.createdAt).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
