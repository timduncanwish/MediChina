"use client";

import { useEffect, useState, useCallback, startTransition } from "react";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  imaging: "bg-blue-100 text-blue-800",
  blood: "bg-red-100 text-red-800",
  genetic: "bg-purple-100 text-purple-800",
  wellness: "bg-green-100 text-green-800",
};

const CATEGORIES = [
  { value: "imaging", label: "Imaging" },
  { value: "blood", label: "Blood" },
  { value: "genetic", label: "Genetic" },
  { value: "wellness", label: "Wellness" },
];

const EMPTY_FORM = {
  name: "",
  description: "",
  price: 0,
  category: "imaging",
  icon: "🔬",
  isActive: true,
};

export default function AdminAddonsPage() {
  const [addons, setAddons] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AddOn | null>(null);

  const fetchAddons = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/addons");
      const data = await r.json();
      setAddons(data);
    } catch {
      // keep existing data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    startTransition(() => { fetchAddons(); });
  }, [fetchAddons]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(addon: AddOn) {
    setEditingId(addon.id);
    setForm({
      name: addon.name,
      description: addon.description,
      price: addon.price,
      category: addon.category,
      icon: addon.icon,
      isActive: addon.isActive,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/addons/${editingId}`
        : "/api/admin/addons";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        const data = await r.json();
        alert(data.error || "Failed to save add-on.");
        return;
      }
      setShowModal(false);
      fetchAddons();
    } catch {
      alert("Failed to save add-on.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const r = await fetch(`/api/admin/addons/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!r.ok) {
        alert("Failed to delete add-on.");
        return;
      }
      setDeleteTarget(null);
      fetchAddons();
    } catch {
      alert("Failed to delete add-on.");
    }
  }

  async function toggleActive(addon: AddOn) {
    try {
      const r = await fetch(`/api/admin/addons/${addon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !addon.isActive }),
      });
      if (r.ok) fetchAddons();
    } catch {
      // silently fail
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Add-On Management</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:opacity-90 transition-opacity"
        >
          New Add-On
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : addons.length === 0 ? (
        <p className="text-muted text-center py-20">No add-ons found. Create your first add-on.</p>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Icon</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Category</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase">Price</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {addons.map((addon) => (
                <tr key={addon.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xl">{addon.icon}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{addon.name}</p>
                    <p className="text-xs text-muted line-clamp-1">{addon.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${CATEGORY_COLORS[addon.category] || "bg-gray-100 text-gray-700"}`}>
                      {addon.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    ${addon.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActive(addon)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${addon.isActive ? "bg-primary" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${addon.isActive ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(addon)}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(addon)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-xl border border-border shadow-xl w-full max-w-lg mx-4 p-6">
            <h2 className="text-lg font-bold text-foreground font-heading mb-4">
              {editingId ? "Edit Add-On" : "New Add-On"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
                    required
                    min={0}
                    step={0.01}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-xl border border-border shadow-xl w-full max-w-sm mx-4 p-6">
            <h2 className="text-lg font-bold text-foreground font-heading mb-2">Delete Add-On</h2>
            <p className="text-sm text-muted mb-6">
              Are you sure you want to delete &quot;{deleteTarget.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
