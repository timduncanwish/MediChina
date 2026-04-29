import { prisma } from "@/lib/prisma";

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  language: string;
  author: string;
  image: string | null;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getBlogPosts(language: string): Promise<BlogPostRow[]> {
  return prisma.blogPost.findMany({
    where: { language, published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPost(slug: string, language: string): Promise<BlogPostRow | null> {
  return prisma.blogPost.findFirst({
    where: { slug, language, published: true },
  });
}

export async function getBlogSlugs(language: string): Promise<string[]> {
  const rows = await prisma.blogPost.findMany({
    where: { language, published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getBlogLanguages(): Promise<string[]> {
  const result = await prisma.blogPost.findMany({
    where: { published: true },
    select: { language: true },
    distinct: ["language"],
  });
  return result.map((r) => r.language);
}
