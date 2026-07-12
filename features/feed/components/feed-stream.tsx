/**
 * Middle column placeholder.
 *
 * Sections (Stories, Create Post, Post Stream) will be wired here once the
 * layout & structure have been reviewed.
 */
export function FeedStream() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-dashed border-border-strong bg-card/40 px-6 py-12 text-center">
        <p className="text-base font-medium text-muted-foreground">
          Feed stream
        </p>
        <p className="mt-1 text-sm text-muted-foreground/80">
          Stories · Create Post · Post cards will land here next.
        </p>
      </div>
    </div>
  );
}