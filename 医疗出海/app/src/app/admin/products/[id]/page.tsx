"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ProductForm {
  title: string; handle: string; description: string; price: number;
  compareAtPrice: number | null; category: string; durationEstimate: string;
  partnerHospital: string; preparationInstructions: string; includes: string[];
  images: string[]; calendlyEventType: string; reviewsCount: number;
  averageRating: number; isActive: boolean; sortOrder: number;
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<ProductForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includeInput, setIncludeInput] = useState("");

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title, handle: data.handle, description: data.description,
          price: data.price, compareAtPrice: data.compareAtPrice, category: data.category,
          durationEstimate: data.durationEstimate, partnerHospital: data.partnerHospital,
          preparationInstructions: data.preparationInstructions || "", includes: data.includes || [],
          images: data.images || [], calendlyEventType: data.calendlyEventType || "",
          reviewsCount: data.reviewsCount, averageRating: data.averageRating,
          isActive: data.isActive, sortOrder: data.sortOrder,
        });
        setLoading(false);
      })
      .catch(() => { setError("Product not found"); setLoading(false); });
  }, [id]);

  const addInclude = () => {
    if (includeInput.trim() && form) {
      setForm({ ...form, includes: [...form.includes, includeInput.trim()] });
      setIncludeInput("");
    }
  };

  const removeInclude = (index: number) => {
    if (form) setForm({ ...form, includes: form.includes.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);

    const data = {
      ...form,
      compareAtPrice: form.compareAtPrice || null,
      preparationInstructions: form.preparationInstructions || null,
      calendlyEventType: form.calendlyEventType || null,
    };

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product");
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!form) return <p className="text-muted text-center py-20">{error || "Product not found."}</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-muted hover:text-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-foreground font-heading">Edit Product</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Handle (URL slug)</label>
              <input type="text" required value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
              <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Compare at Price ($)</label>
              <input type="number" value={form.compareAtPrice || ""} onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value ? parseFloat(e.target.value) : null })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm">
                <option value="comprehensive">Comprehensive</option>
                <option value="focused">Focused</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
              <input type="text" required value={form.durationEstimate} onChange={(e) => setForm({ ...form, durationEstimate: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Partner Hospital</label>
              <input type="text" required value={form.partnerHospital} onChange={(e) => setForm({ ...form, partnerHospital: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Reviews Count</label>
              <input type="number" value={form.reviewsCount} onChange={(e) => setForm({ ...form, reviewsCount: parseInt(e.target.value) })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Average Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={form.averageRating} onChange={(e) => setForm({ ...form, averageRating: parseFloat(e.target.value) })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Preparation Instructions</label>
            <textarea value={form.preparationInstructions} onChange={(e) => setForm({ ...form, preparationInstructions: e.target.value })} rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Includes</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={includeInput} onChange={(e) => setIncludeInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInclude(); } }} className="flex-1 border border-border rounded-lg px-3 py-2 text-sm" placeholder="Add item..." />
              <button type="button" onClick={addInclude} className="bg-gray-100 px-3 py-2 rounded-lg text-sm hover:bg-gray-200">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.includes.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                  {item}
                  <button type="button" onClick={() => removeInclude(i)} className="text-primary/50 hover:text-primary">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">Active</label>
            <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })} className={`w-10 h-5 rounded-full transition-colors ${form.isActive ? "bg-green-500" : "bg-gray-300"}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-border px-6 py-2.5 rounded-lg text-sm text-muted hover:text-foreground">Cancel</button>
        </div>
      </form>
    </div>
  );
}
