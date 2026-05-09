import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-primary-light to-blue-50 relative overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain"
            width={400}
            height={300}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-primary/30"
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
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-primary capitalize">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div
          className="flex items-center gap-1 mb-2"
          role="img"
          aria-label={`${product.averageRating} out of 5 stars, ${product.reviewsCount} reviews`}
        >
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(product.averageRating)
                  ? "text-accent"
                  : "text-gray-200"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-muted ml-1">
            ({product.reviewsCount})
          </span>
        </div>

        <h3 className="font-semibold text-foreground text-lg mb-1 font-heading group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-muted mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toLocaleString()}
          </span>
          <Link
            href={`/products/${product.handle}`}
            className="inline-flex items-center gap-1 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            View Details
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
