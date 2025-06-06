import type { Metadata } from "next"

import { ProductCard } from "@/components/product-card"
import { CategoryLayout } from "@/components/category-layout"

export const metadata: Metadata = {
  title: "Gender-Affirming Products | InsideOut",
  description: "Discover our selection of gender-affirming products designed to help you express your authentic self.",
}

export default function GenderAffirmingPage() {
  // In a real app, this data would come from a database or API
  const products = [
    {
      id: "chest-binder-1",
      name: "Comfortable Chest Binder",
      price: 39.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Binders",
      description:
        "Breathable and comfortable chest binder designed for all-day wear. Available in multiple skin tones.",
      isNew: true,
      rating: 4.9,
    },
    {
      id: "packing-boxer-1",
      name: "Packing Boxer Briefs",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Underwear",
      description: "Comfortable boxer briefs with a built-in pocket for packing. Available in various colors.",
      rating: 4.8,
    },
    {
      id: "silicone-packer-1",
      name: "Realistic Silicone Packer",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Packers",
      description: "High-quality silicone packer in multiple skin tones. Realistic feel and appearance.",
      rating: 4.7,
    },
    {
      id: "tucking-gaff-1",
      name: "Comfortable Tucking Gaff",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Underwear",
      description: "Soft and secure tucking gaff for all-day comfort. Made with breathable, moisture-wicking fabric.",
      isSale: true,
      salePrice: 19.99,
      rating: 4.8,
    },
    {
      id: "breast-forms-1",
      name: "Silicone Breast Forms",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Breast Forms",
      description: "Realistic silicone breast forms available in multiple sizes and skin tones.",
      rating: 4.9,
    },
    {
      id: "stp-device-1",
      name: "Stand-to-Pee Device",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "STP Devices",
      description: "Discreet and easy-to-use stand-to-pee device. Comfortable and portable design.",
      isNew: true,
      rating: 4.7,
    },
    {
      id: "voice-training-1",
      name: "Voice Training Program",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Voice Training",
      description:
        "Comprehensive voice training program with exercises and guidance for voice feminization or masculinization.",
      rating: 4.8,
    },
    {
      id: "shapewear-1",
      name: "Full-Body Shapewear",
      price: 69.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Shapewear",
      description:
        "Comfortable full-body shapewear for creating a more feminine silhouette. Breathable and supportive.",
      isSale: true,
      salePrice: 54.99,
      rating: 4.6,
    },
  ]

  return (
    <CategoryLayout
      title="Gender-Affirming Products"
      description="Discover our selection of gender-affirming products designed to help you express your authentic self."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </CategoryLayout>
  )
}

