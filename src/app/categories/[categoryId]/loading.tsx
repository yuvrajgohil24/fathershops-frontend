export default function CategoryLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2">
        <div className="h-4 w-12 rounded bg-paper-2" />
        <div className="h-4 w-4 rounded bg-paper-2" />
        <div className="h-4 w-28 rounded bg-paper-2" />
      </div>

      {/* Header skeleton */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div className="h-12 w-56 rounded-xl bg-paper-2" />
        <div className="h-5 w-28 rounded-lg bg-paper-2" />
      </div>

      {/* Main layout with sidebar and grid */}
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[200px_1fr]">
        {/* Sidebar skeleton */}
        <div className="hidden flex-col gap-2 lg:flex">
          <div className="h-4 w-24 rounded bg-paper-2 mb-2" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 w-full rounded-xl bg-paper-2" />
          ))}
        </div>

        {/* Products section skeleton */}
        <div className="flex flex-col gap-6">
          {/* Toolbar skeleton */}
          <div className="h-14 w-full rounded-2xl border border-line bg-paper p-3 shadow-2xs" />

          {/* Cards grid skeleton */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-line bg-paper p-3 shadow-2xs"
              >
                <div className="aspect-square w-full rounded-xl bg-paper-2" />
                <div className="mt-3 flex flex-col gap-2 p-1.5">
                  <div className="h-4 w-16 rounded bg-paper-2" />
                  <div className="h-4 w-full rounded bg-paper-2" />
                  <div className="h-4 w-3/4 rounded bg-paper-2" />
                  <div className="mt-2 flex items-center justify-between border-t border-line/60 pt-2">
                    <div className="h-6 w-20 rounded bg-paper-2" />
                    <div className="h-4 w-10 rounded bg-paper-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
