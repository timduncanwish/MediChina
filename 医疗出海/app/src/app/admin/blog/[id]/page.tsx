"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogForm from "../BlogForm";

interface BlogData {
  title: string; slug: string; excerpt: string; content: string;
  language: string; author: string; image: string | null;
  tags: string[]; published: boolean;
}

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setInitial({
          title: data.title, slug: data.slug, excerpt: data.excerpt,
          content: data.content, language: data.language, author: data.author,
          image: data.image || "", tags: data.tags || [], published: data.published,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update post");
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!initial) return <p className="text-muted text-center py-20">Post not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground font-heading mb-6">Edit Blog Post</h1>
      <BlogForm initial={initial} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}
