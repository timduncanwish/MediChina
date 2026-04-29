import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getBlogPosts, getBlogLanguages } from "@/lib/blog";
import { languages } from "@/data/blog";

const BASE_URL = "https://himedi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/collections/all`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/policies/refund`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policies/terms`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policies/privacy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const products = await getAllProducts();
  const productPages = products.map((p) => ({
    url: `${BASE_URL}/products/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogLangs = await getBlogLanguages();
  const allLangs = [...new Set([...languages.map((l) => l.code), ...blogLangs])];
  const blogPages = await Promise.all(allLangs.map(async (lang) => {
    const posts = await getBlogPosts(lang);
    const langListing = {
      url: `${BASE_URL}/blogs/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
    const postPages = posts.map((post) => ({
      url: `${BASE_URL}/blogs/${lang}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
    return [langListing, ...postPages];
  }));

  return [...staticPages, ...productPages, ...blogPages.flat()];
}
