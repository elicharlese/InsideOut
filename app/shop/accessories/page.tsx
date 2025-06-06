import type { Metadata } from "next"

import { ProductCard } from "@/components/product-card"
import { CategoryLayout } from "@/components/category-layout"

export const metadata: Metadata = {
  title: "Accessories | InsideOut",
  description: "Discover our collection of accessories to express your identity and style.",
}

export default function AccessoriesPage() {
  // In a real app, this data would come from a database or API
  const products = [
    {
      id: "pride-pin-set-1",
      name: "Pride Pin Collection",
      price: 14.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Pins & Buttons",
      description: "Set of 10 enamel pins featuring various pride flags. Perfect for backpacks, jackets, or lanyards.",
      isNew: true,
      rating: 4.9,
    },
    {
      id: "pronoun-necklace-1",
      name: "Custom Pronoun Necklace",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Jewelry",
      description: "Personalized necklace with your pronouns. Available in gold, silver, and rose gold finishes.",
      rating: 4.8,
    },
    {
      id: "rainbow-bracelet-1",
      name: "Rainbow Beaded Bracelet",
      price: 12.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Jewelry",
      description: "Handmade beaded bracelet in rainbow colors. Adjustable size fits most wrists.",
      isSale: true,
      salePrice: 9.99,
      rating: 4.7,
    },
    {
      id: "trans-flag-tote-1",
      name: "Trans Pride Tote Bag",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Bags",
      description: "Durable canvas tote bag featuring the trans pride flag. Perfect for shopping or everyday use.",
      rating: 4.8,
    },
    {
      id: "pride-phone-case-1",
      name: "Pride Phone Case",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Tech Accessories",
      description: "Protective phone case with pride flag design. Available for various phone models.",
      rating: 4.6,
    },
    {
      id: "nonbinary-beanie-1",
      name: "Nonbinary Pride Beanie",
      price: 22.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Hats",
      description: "Warm knit beanie in nonbinary pride colors. Perfect for cold weather.",
      isNew: true,
      rating: 4.9,
    },
    {
      id: "pride-sunglasses-1",
      name: "Rainbow Sunglasses",
      price: 15.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Eyewear",
      description: "Fun sunglasses with rainbow-colored frames. 100% UV protection.",
      isSale: true,
      salePrice: 12.99,
      rating: 4.5,
    },
    {
      id: "pronoun-badge-1",
      name: "Pronoun Badge Holder",
      price: 9.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Work Accessories",
      description: "Retractable badge holder with pronoun display. Perfect for work or conferences.",
      rating: 4.7,
    },
  ]

  return (
    <CategoryLayout
      title="Accessories"
      description="Discover our collection of accessories to express your identity and style."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </CategoryLayout>
  )
}

