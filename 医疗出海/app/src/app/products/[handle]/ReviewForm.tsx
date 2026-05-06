"use client";

import { useState } from "react";

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ReviewForm({ productId, onSuccess, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, title, body, author }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit review.");
        return;
      }

      onSuccess();
    } catch {
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-primary/20 bg-primary/5 rounded-xl p-6 mb-8"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
        Write a Review
      </h3>

      {/* Star rating selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Rating *
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
            >
              <svg
                className={`w-7 h-7 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "text-amber-400"
                    : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="review-title" className="block text-sm font-medium text-foreground mb-1">
            Review Title *
          </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={100}
            placeholder="Summarize your experience"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          />
        </div>
        <div>
          <label htmlFor="review-author" className="block text-sm font-medium text-foreground mb-1">
            Your Name *
          </label>
          <input
            id="review-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            maxLength={50}
            placeholder="John D."
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="review-body" className="block text-sm font-medium text-foreground mb-1">
          Your Review *
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder="Share your experience with this health screening package..."
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-3">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-muted px-4 py-2.5 rounded-lg hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-muted mt-3">
        Reviews are moderated and will appear after approval.
      </p>
    </form>
  );
}
