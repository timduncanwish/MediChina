export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-10 w-64 bg-muted-light rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <div className="h-48 bg-muted-light animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-muted-light rounded animate-pulse" />
                <div className="h-4 w-1/4 bg-muted-light rounded animate-pulse" />
                <div className="h-10 w-full bg-muted-light rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
