"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ReviewWithProduct {
  id: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  verified: boolean;
  createdAt: string;
  product: { title: string; handle: string };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending">("all");

  useEffect(() => {
    const url = filter === "pending" ? "/api/admin/reviews?status=pending" : "/api/admin/reviews";
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filter]);

  const approveReview = async (id: string) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verified: true }),
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const pendingCount = reviews.filter((r) => !r.verified).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Reviews</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-muted hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === "pending" ? "bg-amber-500 text-white" : "bg-gray-100 text-muted hover:bg-gray-200"
            }`}
          >
            Pending {pendingCount > 0 && `(${pendingCount})`}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg font-medium">No reviews {filter === "pending" ? "pending approval" : "yet"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-xl border p-5 ${!review.verified ? "border-amber-200 bg-amber-50/30" : "border-border"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Star display */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? "text-amber-400" : "text-gray-200"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                    {!review.verified && (
                      <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                    {review.verified && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        Approved
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-foreground mb-1">{review.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-2">{review.body}</p>

                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-foreground">{review.author}</span>
                    <span className="text-muted">on</span>
                    <Link
                      href={`/products/${review.product.handle}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {review.product.title}
                    </Link>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  {!review.verified && (
                    <button
                      onClick={() => approveReview(review.id)}
                      className="text-sm bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
