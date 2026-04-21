"use client";

import Link from "next/link";
import { useState } from "react";
import { Product, Review } from "@/types";
import { useCart } from "@/components/CartProvider";
import { StarRating } from "@/components/StarRating";

interface Props {
  product: Product;
  reviews: Review[];
}

export function ProductDetailClient({ product, reviews }: Props) {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "schedule">("details");

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collections/all"
            className="hover:text-foreground transition-colors"
          >
            Shop All
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>
      </div>

      {/* Product Hero - Two column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="bg-gradient-to-br from-primary-light to-blue-50 rounded-2xl aspect-square flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-24 h-24 text-primary/20 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className="text-primary/30 text-sm font-medium">
                {product.title}
              </p>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full capitalize mb-3">
                {product.category === "comprehensive"
                  ? "Comprehensive Screen"
                  : "Focused Diagnostic"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <StarRating
                rating={product.averageRating}
                count={product.reviewsCount}
              />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-muted">USD</span>
              {product.compareAtPrice && (
                <span className="text-muted line-through text-lg">
                  ${product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-muted leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-primary-dark transition-colors font-[family-name:var(--font-heading)] disabled:opacity-50"
                disabled={addedToCart}
              >
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
              <Link
                href="/cart"
                className="flex-1 border-2 border-primary text-primary font-semibold py-3.5 px-6 rounded-lg hover:bg-primary-light transition-colors text-center font-[family-name:var(--font-heading)]"
              >
                Book Now
              </Link>
            </div>

            {/* Quick info */}
            <div className="border border-border rounded-lg divide-y divide-border">
              <div className="flex items-center gap-3 p-4">
                <svg
                  className="w-5 h-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Duration
                  </p>
                  <p className="text-sm text-muted">
                    {product.durationEstimate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <svg
                  className="w-5 h-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Partner Hospital
                  </p>
                  <p className="text-sm text-muted">
                    {product.partnerHospital}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <svg
                  className="w-5 h-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Concierge Support
                  </p>
                  <p className="text-sm text-muted">
                    English interpretation included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 border-b border-border">
            {(
              [
                { key: "details", label: "What's Included" },
                { key: "reviews", label: `Reviews (${reviews.length})` },
                { key: "schedule", label: "Schedule" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                className={`py-4 text-sm font-medium border-b-2 transition-colors font-[family-name:var(--font-heading)] ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                What&apos;s Included
              </h2>
              <ul className="space-y-3 mb-8">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {product.preparationInstructions && (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
                    Preparation Instructions
                  </h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-foreground leading-relaxed">
                        {product.preparationInstructions}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <p className="text-4xl font-bold text-foreground">
                    {product.averageRating.toFixed(1)}
                  </p>
                  <StarRating rating={product.averageRating} />
                  <p className="text-sm text-muted mt-1">
                    Based on {product.reviewsCount} reviews
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review: Review) => (
                    <div
                      key={review.id}
                      className="border border-border rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-xs text-muted">
                          {review.createdAt}
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {review.title}
                      </h4>
                      <p className="text-muted text-sm leading-relaxed mb-3">
                        {review.body}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-secondary bg-green-50 px-2 py-0.5 rounded-full">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center py-8">
                    No reviews yet. Be the first to share your experience!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Schedule Tab - Calendly embed */}
          {activeTab === "schedule" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                Schedule Your Appointment
              </h2>
              <div className="bg-muted-light border border-border rounded-xl p-6">
                {product.calendlyEventType ? (
                  <div className="calendly-inline-widget" data-url={product.calendlyEventType} style={{ minWidth: "320px", height: "630px" }} />
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]">
                      Book After Purchase
                    </h3>
                    <p className="text-muted text-sm max-w-md mx-auto mb-6">
                      After completing your purchase, our concierge team will
                      reach out within 24-48 hours to schedule your appointment
                      at a date and time that works best for you.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                      <div className="bg-white rounded-lg p-4 border border-border">
                        <p className="text-2xl font-bold text-primary mb-1">1</p>
                        <p className="text-xs text-muted">Purchase your package</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-border">
                        <p className="text-2xl font-bold text-primary mb-1">2</p>
                        <p className="text-xs text-muted">Concierge contacts you</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-border">
                        <p className="text-2xl font-bold text-primary mb-1">3</p>
                        <p className="text-xs text-muted">Book your date</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
