"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface InquiryDetail {
  id: string; fullName: string; email: string; phone: string | null;
  nationality: string | null; serviceInterest: string | null;
  preferredDateRange: string | null; notes: string | null;
  status: string; createdAt: string; updatedAt: string;
}

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

export default function AdminInquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/inquiries/${id}`)
      .then((r) => r.json())
      .then((data) => { setInquiry(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setInquiry(updated);
    setUpdating(false);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!inquiry) {
    return <p className="text-muted text-center py-20">Inquiry not found.</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-muted hover:text-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-foreground font-heading">Inquiry from {inquiry.fullName}</h1>
        {updating && <span className="text-sm text-muted animate-pulse">Updating...</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Message</h2>
            <p className="text-muted leading-relaxed">{inquiry.notes || "No message provided."}</p>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Quick Reply</h2>
            <a
              href={`mailto:${inquiry.email}?subject=Re: Your Himedi Inquiry`}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Reply via Email
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4 font-heading">Contact Info</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted">Name:</span> <span className="text-foreground">{inquiry.fullName}</span></p>
              <p><span className="text-muted">Email:</span> <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">{inquiry.email}</a></p>
              {inquiry.phone && <p><span className="text-muted">Phone:</span> <span className="text-foreground">{inquiry.phone}</span></p>}
              {inquiry.nationality && <p><span className="text-muted">Nationality:</span> <span className="text-foreground">{inquiry.nationality}</span></p>}
              {inquiry.serviceInterest && <p><span className="text-muted">Interest:</span> <span className="text-foreground">{inquiry.serviceInterest}</span></p>}
              {inquiry.preferredDateRange && <p><span className="text-muted">Dates:</span> <span className="text-foreground">{inquiry.preferredDateRange}</span></p>}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <label className="text-xs text-muted block mb-2">Update Status</label>
            <select
              value={inquiry.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-white"
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
            <p className="text-xs text-muted mt-2">
              Created: {new Date(inquiry.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
