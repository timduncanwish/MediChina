"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: string; title: string; slug: string; language: string;
  author: string; published: boolean; createdAt: string;
}

const LANG_LABELS: Record<string, string> = { en: "English", kr: "한국어", ar: "العربية", mn: "Монгол", ru: "Русский" };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Language</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Author</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted uppercase">Published</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${post.id}`} className="text-sm font-medium text-foreground hover:text-primary">
                      {post.title}
                    </Link>
                    <p className="text-xs text-muted font-mono">{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {LANG_LABELS[post.language] || post.language}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{post.author}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block w-2 h-2 rounded-full ${post.published ? "bg-green-500" : "bg-gray-300"}`} />
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/blog/${post.id}`} className="text-sm text-primary hover:underline mr-3">Edit</Link>
                    <button onClick={() => deletePost(post.id)} className="text-sm text-red-500 hover:underline">Delete</button>
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
