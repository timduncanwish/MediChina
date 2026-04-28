"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-heading">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 text-muted/30 mx-auto mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-foreground mb-2 font-heading">
              Your cart is empty
            </h2>
            <p className="text-muted mb-6">
              Browse our health screening packages to get started.
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-heading"
            >
              Browse Packages
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-5 border border-border rounded-xl"
                >
                  {/* Product image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-light to-blue-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 text-primary/30"
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
                    )}
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.handle}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors font-heading"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-muted mt-1">
                      {item.product.partnerHospital}
                    </p>
                    <p className="text-primary font-bold mt-1">
                      ${item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity and remove */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-foreground hover:bg-muted-light transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-medium border-x border-border">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-foreground hover:bg-muted-light transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-muted-light rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-4 font-heading">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">
                      Subtotal ({items.length}{" "}
                      {items.length === 1 ? "item" : "items"})
                    </span>
                    <span className="text-foreground font-medium">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Concierge Support</span>
                    <span className="text-secondary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Medical Interpretation</span>
                    <span className="text-secondary font-medium">Included</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-primary text-white text-center font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-colors font-heading"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/collections/all"
                  className="block w-full text-center text-sm text-primary font-medium mt-3 hover:text-primary-dark transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
