import { Skeleton } from "@/components/ui/skeleton"

export default function ResearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-10 w-[300px] mb-2" />
          <Skeleton className="h-5 w-[400px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
          ))}
      </div>

      <Skeleton className="h-[500px] w-full rounded-lg mb-12" />

      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  )
}

