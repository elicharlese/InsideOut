import type { Metadata } from "next"

import { ProductCard } from "@/components/product-card"
import { CategoryLayout } from "@/components/category-layout"

export const metadata: Metadata = {
  title: "Wellness | InsideOut",
  description: "Explore our wellness products designed to support your physical and mental health journey.",
}

export default function WellnessPage() {
  // In a real app, this data would come from a database or API
  const products = [
    {
      id: "affirming-journal-1",
      name: "Gender Affirming Journal",
      price: 18.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Mental Health",
      description: "Guided journal with prompts designed to support your gender journey and self-discovery.",
      isNew: true,
      rating: 4.9,
    },
    {
      id: "pride-yoga-mat-1",
      name: "Pride Yoga Mat",
      price: 39.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Fitness",
      description: "Non-slip yoga mat with rainbow pride design. Perfect for your wellness practice.",
      rating: 4.7,
    },
    {
      id: "queer-meditation-1",
      name: "Queer Meditation Guide",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Mental Health",
      description: "Book and audio guide for meditation practices specifically designed for LGBTQA+ individuals.",
      rating: 4.8,
    },
    {
      id: "affirming-skincare-1",
      name: "Gender Affirming Skincare Set",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Skincare",
      description: "Complete skincare set formulated for individuals on HRT or with specific skin concerns.",
      isSale: true,
      salePrice: 39.99,
      rating: 4.9,
    },
    {
      id: "pride-water-bottle-1",
      name: "Pride Insulated Water Bottle",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Hydration",
      description: "Stainless steel insulated water bottle with pride flag design. Keeps drinks cold for 24 hours.",
      rating: 4.6,
    },
    {
      id: "aromatherapy-set-1",
      name: "Calming Aromatherapy Set",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Aromatherapy",
      description: "Set of essential oils and diffuser designed to reduce anxiety and promote relaxation.",
      isNew: true,
      rating: 4.8,
    },
    {
      id: "affirmation-cards-1",
      name: "LGBTQA+ Affirmation Cards",
      price: 15.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Mental Health",
      description: "Deck of 52 affirmation cards with messages specifically for the LGBTQA+ community.",
      rating: 4.9,
    },
    {
      id: "sleep-aid-1",
      name: "Sleep Support Supplement",
      price: 22.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Supplements",
      description:
        "Natural supplement to support healthy sleep patterns. Especially formulated for those experiencing anxiety.",
      isSale: true,
      salePrice: 18.99,
      rating: 4.7,
    },
  ]

  return (
    <CategoryLayout
      title="Wellness"
      description="Explore our wellness products designed to support your physical and mental health journey."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </CategoryLayout>
  )
}

