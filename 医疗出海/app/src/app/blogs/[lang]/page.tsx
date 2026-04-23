import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { languages, getBlogPosts } from "@/data/blog";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langInfo = languages.find((l) => l.code === lang);
  if (!langInfo) return { title: "Blog" };
  return {
    title: `Blog - ${langInfo.label}`,
    description: `Himedi blog in ${langInfo.label}. Health tips, Korea travel guides, and service spotlights.`,
  };
}

export default async function BlogListPage({ params }: PageProps) {
  const { lang } = await params;
  const langInfo = languages.find((l) => l.code === lang);
  if (!langInfo) notFound();

  const posts = getBlogPosts(lang);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Himedi Blog
          </h1>
          <p className="text-blue-200 max-w-2xl">
            Health tips, Korea travel guides, and insights into medical tourism.
          </p>
        </div>
      </section>

      {/* Language tabs */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto">
            {languages.map((l) => (
              <Link
                key={l.code}
                href={`/blogs/${l.code}`}
                className={`py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  l.code === lang
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No posts available in this language yet.</p>
            <Link href="/blogs/en" className="text-primary hover:underline mt-2 inline-block">
              Browse English posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${lang}/${post.slug}`}
                className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary-light to-blue-50 h-48 flex items-center justify-center">
                  <span className="text-primary/30 text-4xl font-bold">
                    {post.title.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full capitalize">
                      {post.language}
                    </span>
                    <span className="text-xs text-muted">{post.createdAt}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-heading line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-muted bg-muted-light px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
