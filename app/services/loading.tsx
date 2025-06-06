import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <Skeleton className="mx-auto h-10 w-[400px]" />
        <Skeleton className="mx-auto mt-4 h-5 w-[500px]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-[120px]" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Skeleton className="mb-4 h-16 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
      </div>

      <div className="mt-16 rounded-lg bg-muted p-6 md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <Skeleton className="mx-auto h-8 w-[300px]" />
          <Skeleton className="mx-auto mt-4 h-5 w-[400px]" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-lg bg-card p-6 text-center shadow-sm">
                <Skeleton className="mx-auto mb-3 h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto h-6 w-[150px]" />
                <Skeleton className="mx-auto mt-2 h-16 w-full" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

