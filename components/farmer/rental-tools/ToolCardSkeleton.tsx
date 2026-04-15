export function ToolCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card">
      {/* Image skeleton */}
      <div className="bg-muted h-40 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />

        {/* Price */}
        <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />

        {/* Rating */}
        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />

        {/* Owner info */}
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-4">
          <div className="h-9 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 bg-muted rounded animate-pulse" />
            <div className="h-9 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
