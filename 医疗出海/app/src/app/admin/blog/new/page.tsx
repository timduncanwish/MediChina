"use client";

import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create post");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-muted">Blog</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground font-heading mb-6">New Blog Post</h1>
      <BlogForm onSubmit={handleSubmit} submitLabel="Create Post" />
    </div>
  );
}
