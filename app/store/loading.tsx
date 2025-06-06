import { ProductCategoryLayout } from "@/components/product-category-layout"
import { ProductSkeleton } from "@/components/product-skeleton"

export default function Loading() {
  return (
    <ProductCategoryLayout
      title="All Products"
      description="Browse our complete collection of inclusive products designed for everyone in the LGBTQA+ community."
      isLoading={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </ProductCategoryLayout>
  )
}

