import { Suspense } from "react"
import type { Metadata } from "next"
import { ProductCategoryLayout } from "@/components/product-category-layout"
import { ProductCard } from "@/components/product-card"
import { ProductSkeleton } from "@/components/product-skeleton"

export const metadata: Metadata = {
  title: "All Products | InsideOut",
  description: "Browse our complete collection of inclusive products for the LGBTQA+ community",
}

// This would typically come from a database or API
const allProducts = [
  // Clothing products
  {
    id: "c1",
    name: "Gender Neutral Hoodie",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: false,
  },
  {
    id: "c2",
    name: "Pride T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
    rating: 4.5,
    reviews: 89,
    isNew: false,
    isSale: true,
    salePrice: 19.99,
  },
  {
    id: "c3",
    name: "Inclusive Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
    rating: 4.7,
    reviews: 56,
    isNew: false,
    isSale: false,
  },
  {
    id: "c4",
    name: "Adaptive Button-Up Shirt",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
    rating: 4.6,
    reviews: 42,
    isNew: true,
    isSale: false,
  },
  {
    id: "c5",
    name: "Inclusive Swimwear",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
    rating: 4.9,
    reviews: 78,
    isNew: false,
    isSale: false,
  },

  // Accessories products
  {
    id: "a1",
    name: "Pronoun Pin Set",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.8,
    reviews: 65,
    isNew: false,
    isSale: false,
  },
  {
    id: "a2",
    name: "Equality Bracelet",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.7,
    reviews: 42,
    isNew: true,
    isSale: false,
  },
  {
    id: "a3",
    name: "Inclusive Tote Bag",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.6,
    reviews: 38,
    isNew: false,
    isSale: true,
    salePrice: 19.99,
  },
  {
    id: "a4",
    name: "Minimalist Wallet",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.5,
    reviews: 27,
    isNew: false,
    isSale: false,
  },
  {
    id: "a5",
    name: "Neutral Tone Watch",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.9,
    reviews: 53,
    isNew: true,
    isSale: false,
  },

  // Wellness products
  {
    id: "w1",
    name: "Self-Care Kit",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "wellness",
    rating: 4.8,
    reviews: 91,
    isNew: false,
    isSale: false,
  },
  {
    id: "w2",
    name: "Affirmation Cards",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "wellness",
    rating: 4.7,
    reviews: 64,
    isNew: false,
    isSale: true,
    salePrice: 11.99,
  },
  {
    id: "w3",
    name: "Meditation Cushion",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "wellness",
    rating: 4.6,
    reviews: 37,
    isNew: true,
    isSale: false,
  },
  {
    id: "w4",
    name: "Essential Oil Set",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "wellness",
    rating: 4.9,
    reviews: 82,
    isNew: false,
    isSale: false,
  },
  {
    id: "w5",
    name: "Inclusive Skincare Kit",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "wellness",
    rating: 4.8,
    reviews: 58,
    isNew: true,
    isSale: false,
  },

  // Gender-affirming products
  {
    id: "g1",
    name: "Chest Binder",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "gender-affirming",
    rating: 4.9,
    reviews: 127,
    isNew: false,
    isSale: false,
  },
  {
    id: "g2",
    name: "Packing Boxer Brief",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "gender-affirming",
    rating: 4.8,
    reviews: 93,
    isNew: true,
    isSale: false,
  },
  {
    id: "g3",
    name: "Tucking Underwear",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "gender-affirming",
    rating: 4.7,
    reviews: 86,
    isNew: false,
    isSale: true,
    salePrice: 19.99,
  },
  {
    id: "g4",
    name: "Silicone Breast Forms",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "gender-affirming",
    rating: 4.9,
    reviews: 74,
    isNew: false,
    isSale: false,
  },
  {
    id: "g5",
    name: "Voice Training Device",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "gender-affirming",
    rating: 4.8,
    reviews: 62,
    isNew: true,
    isSale: false,
  },
]

// Filter options for all products
const filterOptions = {
  categories: [
    { id: "all", name: "All Categories" },
    { id: "clothing", name: "Clothing" },
    { id: "accessories", name: "Accessories" },
    { id: "wellness", name: "Wellness" },
    { id: "gender-affirming", name: "Gender-Affirming" },
  ],
  priceRanges: [
    { id: "all", name: "All Prices" },
    { id: "under-25", name: "Under $25" },
    { id: "25-50", name: "$ 25 - $ 50" },
    { id: "50-100", name: "$ 50 - $ 100" },
    { id: "over-100", name: "Over $100" },
  ],
  sortOptions: [
    { id: "featured", name: "Featured" },
    { id: "newest", name: "Newest" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
  ],
  specialFeatures: [
    { id: "new-arrivals", name: "New Arrivals" },
    { id: "on-sale", name: "On Sale" },
    { id: "best-sellers", name: "Best Sellers" },
  ],
}

export default function AllProductsPage() {
  return (
    <ProductCategoryLayout
      title="All Products"
      description="Browse our complete collection of inclusive products designed for everyone in the LGBTQA+ community."
      filterOptions={filterOptions}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<ProductSkeletonGrid />}>
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
              isNew={product.isNew}
              isSale={product.isSale}
              salePrice={product.salePrice}
              category={product.category}
            />
          ))}
        </Suspense>
      </div>
    </ProductCategoryLayout>
  )
}

function ProductSkeletonGrid() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </>
  )
}

