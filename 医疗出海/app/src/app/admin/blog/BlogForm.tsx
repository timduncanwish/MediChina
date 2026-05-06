"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogFormProps {
  initial?: {
    title: string; slug: string; excerpt: string; content: string;
    language: string; author: string; image: string | null;
    tags: string[]; published: boolean;
  };
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  submitLabel: string;
}

export default function BlogForm({ initial, onSubmit, submitLabel }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    language: initial?.language || "en",
    author: initial?.author || "Himedi Team",
    image: initial?.image || "",
    tags: initial?.tags || [],
    published: initial?.published ?? true,
  });
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9가-힣\u0600-\u06FF\u0400-\u04FF\u0400-\u04FF]+/g, "-").replace(/^-|-$/g, "");

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      image: form.image || null,
      tags: form.tags,
    };

    try {
      await onSubmit(data);
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input type="text" required value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value, slug: form.slug || generateSlug(e.target.value) }); }} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
              <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Excerpt</label>
              <textarea required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Content (Markdown supported: use ## for headings)</label>
              <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="w-full border border-border rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Language</label>
              <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm">
                <option value="en">English</option>
                <option value="kr">한국어</option>
                <option value="ar">العربية</option>
                <option value="mn">Монгол</option>
                <option value="ru">Русский</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Author</label>
              <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
              <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} className="flex-1 border border-border rounded-lg px-3 py-2 text-sm" placeholder="Add tag..." />
              <button type="button" onClick={addTag} className="bg-gray-100 px-3 py-2 rounded-lg text-sm hover:bg-gray-200">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                  #{tag}
                  <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((_, j) => j !== i) })} className="text-blue-400 hover:text-blue-600">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">Published</label>
            <button type="button" onClick={() => setForm({ ...form, published: !form.published })} className={`w-10 h-5 rounded-full transition-colors ${form.published ? "bg-green-500" : "bg-gray-300"}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm disabled:opacity-50">
            {saving ? "Saving..." : submitLabel}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-border px-6 py-2.5 rounded-lg text-sm text-muted hover:text-foreground">Cancel</button>
        </div>
      </form>
    </div>
  );
}
