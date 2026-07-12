export default function FeedLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg bg-card p-6">
          <div className="mb-4 h-4 w-3/4 rounded bg-surface-muted" />
          <div className="mb-3 h-3 w-full rounded bg-surface-muted" />
          <div className="mb-3 h-3 w-5/6 rounded bg-surface-muted" />
          <div className="h-40 w-full rounded-md bg-surface-muted" />
        </div>
      ))}
    </div>
  );
}
