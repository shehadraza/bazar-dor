export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 h-32 animate-pulse rounded-2xl bg-green-100" />
      <div className="mb-4 h-6 w-48 animate-pulse rounded bg-green-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-green-100" />
        ))}
      </div>
    </div>
  );
}