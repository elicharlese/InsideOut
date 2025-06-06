import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviewCount: number
  isNew?: boolean
  isSale?: boolean
  slug: string
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviewCount,
  isNew,
  isSale,
  slug,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Card className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
      <Link href={`/store/products/${slug}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {isNew && <Badge className="absolute left-2 top-2 bg-olive-600 text-white hover:bg-olive-700">New</Badge>}
        {isSale && (
          <Badge className="absolute right-2 top-2 bg-clay-600 text-white hover:bg-clay-700">{discount}% Off</Badge>
        )}
      </Link>
      <CardContent className="p-4">
        <div className="mb-1 text-sm text-muted-foreground">{category}</div>
        <Link href={`/store/products/${slug}`} className="block">
          <h3 className="line-clamp-1 text-base font-medium transition-colors group-hover:text-primary">{name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn("fill-current", i < Math.floor(rating) ? "text-sand-500" : "text-stone-300")}
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Button size="sm" variant="outline" className="border-sand-300 hover:bg-sand-100 hover:text-sand-900">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

