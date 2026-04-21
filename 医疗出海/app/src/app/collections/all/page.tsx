import { Metadata } from "next";
import {
  comprehensiveProducts,
  focusedProducts,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop All Packages",
  description:
    "Browse our complete catalog of Korean health screening packages. From comprehensive full-body checkups to focused diagnostics.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-white">
      {/* Page header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]">
            Health Screening Packages
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Choose from our curated selection of Korean health screening
            packages. All prices include full concierge support at no extra
            cost.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Comprehensive Screens */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Comprehensive Screens
            </h2>
            <p className="text-muted mt-2">
              Full-body health checkup packages ranging from baseline to
              premium all-inclusive screenings
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comprehensiveProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Focused Diagnostics */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              Focused Diagnostics
            </h2>
            <p className="text-muted mt-2">
              Single-system analysis for targeted health concerns
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
