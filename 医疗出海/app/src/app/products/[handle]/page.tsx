import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductByHandle, mockReviews } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { JsonLd, productJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const reviews = mockReviews.filter((r) => r.productId === product.id);
  // Also show some reviews from other products to demonstrate the section
  const additionalReviews = mockReviews
    .filter((r) => r.productId !== product.id)
    .slice(0, 3);
  const allReviews = [...reviews, ...additionalReviews];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <ProductDetailClient product={product} reviews={allReviews} />
    </>
  );
}
