export default function LoadingFlightsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="h-10 w-64 animate-pulse rounded-xl bg-neutral-200" />

          <div className="mt-3 h-5 w-40 animate-pulse rounded-lg bg-neutral-200" />
        </div>

        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-6 md:grid-cols-4">
                {[1, 2, 3, 4].map(
                  (block) => (
                    <div
                      key={block}
                      className="space-y-3"
                    >
                      <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />

                      <div className="h-6 w-32 animate-pulse rounded bg-neutral-300" />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}