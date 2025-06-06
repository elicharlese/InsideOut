import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Shop | InsideOut",
  description: "Explore our inclusive shop with products designed for the LGBTQA+ community.",
}

export default function ShopPage() {
  const categories = [
    {
      title: "Clothing",
      description: "Inclusive clothing for all gender expressions and identities.",
      image: "/placeholder.svg?height=400&width=400",
      href: "/shop/clothing",
    },
    {
      title: "Accessories",
      description: "Express yourself with our range of inclusive accessories.",
      image: "/placeholder.svg?height=400&width=400",
      href: "/shop/accessories",
    },
    {
      title: "Wellness",
      description: "Products to support your physical and mental wellbeing.",
      image: "/placeholder.svg?height=400&width=400",
      href: "/shop/wellness",
    },
    {
      title: "Gender-Affirming Products",
      description: "Products designed to help you express your authentic self.",
      image: "/placeholder.svg?height=400&width=400",
      href: "/shop/gender-affirming",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Shop Our Products</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collection of products designed with the LGBTQA+ community in mind. From affirming
          clothing to wellness essentials, we've got you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {categories.map((category) => (
          <Card key={category.title} className="overflow-hidden group">
            <Link href={category.href} className="block h-full">
              <div className="grid md:grid-cols-2 h-full">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-6">
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button className="w-full md:w-auto gap-2 mt-auto">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-muted">
            <h3 className="text-lg font-medium mb-2">Inclusive Products</h3>
            <p className="text-muted-foreground">
              Our products are designed with all gender identities and expressions in mind.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted">
            <h3 className="text-lg font-medium mb-2">Community-Focused</h3>
            <p className="text-muted-foreground">
              A portion of every purchase goes back to supporting LGBTQA+ organizations.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted">
            <h3 className="text-lg font-medium mb-2">Quality Guaranteed</h3>
            <p className="text-muted-foreground">
              We carefully select and test all products to ensure the highest quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

