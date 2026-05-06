import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import { JsonLd, productJsonLd } from "@/components/JsonLd";
import { getProductByHandle, getProductHandles } from "@/lib/products";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const handles = await getProductHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const dbReviews = await prisma.review.findMany({
    where: { productId: product.id, verified: true },
    orderBy: { createdAt: "desc" },
  });

  const reviews = dbReviews.map((r) => ({
    id: r.id,
    productId: r.productId,
    rating: r.rating,
    title: r.title,
    body: r.body,
    author: r.author,
    verified: r.verified,
    createdAt: r.createdAt.toISOString().split("T")[0],
  }));

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <ProductDetailClient product={product} reviews={reviews} />
    </>
  );
}
