export default function ProductLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2">
        <div className="h-4 w-12 rounded bg-paper-2" />
        <div className="h-4 w-4 rounded bg-paper-2" />
        <div className="h-4 w-24 rounded bg-paper-2" />
        <div className="h-4 w-4 rounded bg-paper-2" />
        <div className="h-4 w-36 rounded bg-paper-2" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        {/* Gallery skeleton */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex gap-2 lg:flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="size-16 rounded-xl bg-paper-2 shrink-0" />
            ))}
          </div>
          <div className="aspect-square w-full rounded-2xl bg-paper-2" />
        </div>

        {/* Details skeleton */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="h-8 w-4/5 rounded-xl bg-paper-2" />
            <div className="h-5 w-1/2 rounded-lg bg-paper-2" />
          </div>

          <div className="h-14 w-40 rounded-xl bg-paper-2" />

          {/* Options & Cart button skeleton */}
          <div className="flex flex-col gap-3">
            <div className="h-4 w-20 rounded bg-paper-2" />
            <div className="flex gap-2">
              <div className="h-10 w-24 rounded-lg bg-paper-2" />
              <div className="h-10 w-24 rounded-lg bg-paper-2" />
            </div>
            <div className="mt-2 flex gap-3">
              <div className="h-11 w-32 rounded-lg bg-paper-2" />
              <div className="h-11 flex-1 rounded-lg bg-paper-2" />
            </div>
          </div>

          {/* Specs table skeleton */}
          <div className="flex flex-col gap-2 pt-4 border-t border-line">
            <div className="h-4 w-28 rounded bg-paper-2 mb-2" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between border-b border-line py-2">
                <div className="h-4 w-20 rounded bg-paper-2" />
                <div className="h-4 w-32 rounded bg-paper-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
