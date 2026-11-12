export default function RootLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-8">
      {/* Header skeleton */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div className="h-14 w-64 rounded-2xl bg-paper-2" />
        <div className="h-6 w-36 rounded-lg bg-paper-2" />
      </div>

      {/* Category rows skeleton */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 rounded-2xl border border-line bg-paper p-5 shadow-2xs"
          >
            <div className="size-20 shrink-0 rounded-xl bg-paper-2" />
            <div className="flex flex-1 flex-col gap-2.5">
              <div className="h-8 w-48 rounded-lg bg-paper-2" />
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-paper-2" />
                <div className="h-6 w-24 rounded-full bg-paper-2" />
              </div>
            </div>
            <div className="size-8 rounded-full bg-paper-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
