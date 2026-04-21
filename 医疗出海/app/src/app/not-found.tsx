import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4 font-[family-name:var(--font-heading)]">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-heading)]">
          Page Not Found
        </h2>
        <p className="text-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-[family-name:var(--font-heading)]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
