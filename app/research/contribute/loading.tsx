import { Skeleton } from "@/components/ui/skeleton"

export default function ContributeLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-[300px] mb-2" />
        <Skeleton className="h-5 w-[400px]" />
      </div>

      <Skeleton className="h-10 w-full mb-6" />

      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

