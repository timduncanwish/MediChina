import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { sanitizeText, sanitizeStringArray } from "@/lib/validate";

export function sanitizeBlogData(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  if (typeof body.title === "string") data.title = sanitizeText(body.title);
  if (typeof body.slug === "string") data.slug = sanitizeText(body.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (typeof body.excerpt === "string") data.excerpt = sanitizeText(body.excerpt);
  if (typeof body.content === "string") data.content = body.content; // content is db.Text, allow HTML but it's admin-only
  if (typeof body.language === "string" && ["en", "kr", "ar", "mn", "ru"].includes(body.language)) data.language = body.language;
  if (typeof body.author === "string") data.author = sanitizeText(body.author);
  if (typeof body.image === "string") data.image = body.image;
  if (Array.isArray(body.tags)) data.tags = sanitizeStringArray(body.tags);
  if (typeof body.published === "boolean") data.published = body.published;
  return data;
}

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const data = sanitizeBlogData(body);

  if (!data.title || !data.slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }

  const post = await prisma.blogPost.create({ data: data as never });

  return NextResponse.json(post, { status: 201 });
}
