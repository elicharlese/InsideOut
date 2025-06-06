import type { Metadata } from "next"

import { ProductCard } from "@/components/product-card"
import { CategoryLayout } from "@/components/category-layout"

export const metadata: Metadata = {
  title: "Clothing | InsideOut",
  description: "Explore our inclusive clothing collection designed for all gender expressions and identities.",
}

export default function ClothingPage() {
  // In a real app, this data would come from a database or API
  const products = [
    {
      id: "pride-tshirt-1",
      name: "Pride Rainbow T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "T-Shirts",
      description:
        "Comfortable cotton t-shirt featuring a vibrant rainbow design. Perfect for Pride and everyday wear.",
      isNew: true,
      rating: 4.8,
    },
    {
      id: "pronoun-hoodie-1",
      name: "Pronoun Hoodie",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Hoodies",
      description: "Cozy hoodie with customizable pronouns. Stay warm while expressing your authentic self.",
      rating: 4.9,
    },
    {
      id: "trans-flag-tank-1",
      name: "Trans Flag Tank Top",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Tank Tops",
      description:
        "Lightweight tank top featuring the trans pride flag colors. Perfect for summer events and workouts.",
      rating: 4.7,
    },
    {
      id: "nonbinary-sweater-1",
      name: "Nonbinary Pride Sweater",
      price: 54.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Sweaters",
      description: "Soft knit sweater in nonbinary pride colors. Stylish and affirming for cooler weather.",
      isSale: true,
      salePrice: 39.99,
      rating: 4.6,
    },
    {
      id: "lesbian-flag-shirt-1",
      name: "Lesbian Pride Button-Up",
      price: 44.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Button-Ups",
      description:
        "Stylish button-up shirt with subtle lesbian pride flag colors. Perfect for casual and semi-formal occasions.",
      rating: 4.8,
    },
    {
      id: "bi-pride-jacket-1",
      name: "Bi Pride Denim Jacket",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Jackets",
      description: "Classic denim jacket with bi pride flag embroidery. A statement piece for your wardrobe.",
      rating: 4.9,
    },
    {
      id: "gender-fluid-scarf-1",
      name: "Gender Fluid Scarf",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Accessories",
      description: "Soft scarf in gender fluid flag colors. A versatile accessory for any outfit.",
      isNew: true,
      rating: 4.7,
    },
    {
      id: "pride-socks-1",
      name: "Pride Flag Socks Set",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Socks",
      description:
        "Set of 6 pairs of socks featuring different pride flags. Comfortable and colorful for everyday wear.",
      isSale: true,
      salePrice: 19.99,
      rating: 4.8,
    },
  ]

  return (
    <CategoryLayout
      title="Clothing"
      description="Explore our inclusive clothing collection designed for all gender expressions and identities."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </CategoryLayout>
  )
}

