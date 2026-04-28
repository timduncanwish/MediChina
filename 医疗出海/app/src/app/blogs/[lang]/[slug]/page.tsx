import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { languages, getBlogPost, getBlogPosts, blogPosts } from "@/data/blog";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .map((p) => ({ lang: p.language, slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);
  if (!post) notFound();

  const relatedPosts = getBlogPosts(lang)
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/blogs/${lang}`} className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full capitalize">
              {languages.find((l) => l.code === lang)?.label || lang}
            </span>
            <time className="text-sm text-muted">{post.createdAt}</time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            {post.title}
          </h1>
          <p className="text-lg text-muted">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{post.author.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{post.author}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4 font-heading">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-1 text-muted mb-4">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-muted leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-muted bg-muted-light px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted-light py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blogs/${lang}/${rPost.slug}`}
                  className="bg-white rounded-lg p-4 border border-border hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-foreground mb-2 font-heading line-clamp-2">
                    {rPost.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">{rPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
