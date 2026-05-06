"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string; title: string; handle: string; price: number;
  category: string; isActive: boolean; sortOrder: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, isActive: !isActive } : p));
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Category</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase">Price</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted uppercase">Active</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted uppercase">Order</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${product.id}`} className="text-sm font-medium text-foreground hover:text-primary">
                      {product.title}
                    </Link>
                    <p className="text-xs text-muted font-mono">{product.handle}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${product.category === "comprehensive" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground text-sm">${product.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActive(product.id, product.isActive)}
                      className={`w-10 h-5 rounded-full transition-colors ${product.isActive ? "bg-green-500" : "bg-gray-300"}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${product.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-muted">{product.sortOrder}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/products/${product.id}`} className="text-sm text-primary hover:underline mr-3">Edit</Link>
                    <button onClick={() => deleteProduct(product.id)} className="text-sm text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
