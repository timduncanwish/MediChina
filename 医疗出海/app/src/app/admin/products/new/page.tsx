"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyProduct = {
  title: "", handle: "", description: "", price: 0, compareAtPrice: null as number | null,
  category: "comprehensive", durationEstimate: "", partnerHospital: "",
  preparationInstructions: "", includes: [] as string[], images: [] as string[],
  calendlyEventType: "", reviewsCount: 0, averageRating: 0, isActive: true, sortOrder: 0,
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includeInput, setIncludeInput] = useState("");

  const generateHandle = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const addInclude = () => {
    if (includeInput.trim()) {
      setForm({ ...form, includes: [...form.includes, includeInput.trim()] });
      setIncludeInput("");
    }
  };

  const removeInclude = (index: number) => {
    setForm({ ...form, includes: form.includes.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = {
      ...form,
      handle: form.handle || generateHandle(form.title),
      compareAtPrice: form.compareAtPrice || null,
      preparationInstructions: form.preparationInstructions || null,
      calendlyEventType: form.calendlyEventType || null,
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product");
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-muted hover:text-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-foreground font-heading">New Product</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input type="text" required value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value, handle: form.handle || generateHandle(e.target.value) }); }} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
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
              <input type="text" required value={form.durationEstimate} onChange={(e) => setForm({ ...form, durationEstimate: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" placeholder="Half-day (3-4 hours)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Partner Hospital</label>
              <input type="text" required value={form.partnerHospital} onChange={(e) => setForm({ ...form, partnerHospital: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })} className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
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
            {saving ? "Creating..." : "Create Product"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-border px-6 py-2.5 rounded-lg text-sm text-muted hover:text-foreground">Cancel</button>
        </div>
      </form>
    </div>
  );
}
