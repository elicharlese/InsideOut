import { Skeleton } from "@/components/ui/skeleton"

export default function HealthcareLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-5 w-[500px]" />
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[80px]" />
        </div>
        <Skeleton className="h-9 w-[180px]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-4">
                <Skeleton className="mb-2 h-6 w-[200px]" />
                <Skeleton className="mb-4 h-4 w-[150px]" />
                <Skeleton className="mb-3 h-16 w-full" />
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {Array(3)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-5 w-16" />
                    ))}
                </div>
                <Skeleton className="mb-2 h-4 w-[180px]" />
                <Skeleton className="mb-4 h-4 w-[150px]" />
                <div className="border-t pt-4 flex justify-between">
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-9 w-[100px]" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

