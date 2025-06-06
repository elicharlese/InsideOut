import Link from "next/link"
import Image from "next/image"
import { Heart, Search, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function WishlistPage() {
  // In a real app, this would be fetched from an API
  const wishlistItems = [
    {
      id: 1,
      name: "Chest Binder",
      price: 34.99,
      image: "/placeholder.svg?height=120&width=120",
      category: "Clothing",
      inStock: true,
      dateAdded: "July 10, 2023",
    },
    {
      id: 2,
      name: "Affirmation Journal",
      price: 18.99,
      image: "/placeholder.svg?height=120&width=120",
      category: "Wellness",
      inStock: true,
      dateAdded: "July 5, 2023",
    },
    {
      id: 3,
      name: "Self-Care Kit",
      price: 49.99,
      image: "/placeholder.svg?height=120&width=120",
      category: "Wellness",
      inStock: false,
      dateAdded: "June 28, 2023",
    },
    {
      id: 4,
      name: "Pride Flag",
      price: 19.99,
      image: "/placeholder.svg?height=120&width=120",
      category: "Accessories",
      inStock: true,
      dateAdded: "June 15, 2023",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground">Items you've saved for later</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search wishlist..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Heart className="mr-2 h-4 w-4" />
          Share Wishlist
        </Button>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Items added to your wishlist will appear here. Browse our products and click the heart icon to add items
              to your wishlist.
            </p>
            <Button asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Saved Items ({wishlistItems.length})</CardTitle>
            <CardDescription>Items you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-28 h-28 relative bg-muted rounded overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{item.name}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                          {item.inStock ? (
                            <span className="text-xs text-green-600">In Stock</span>
                          ) : (
                            <span className="text-xs text-red-600">Out of Stock</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Added on {item.dateAdded}</p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/shop/${item.id}`}>View</Link>
                        </Button>
                        <Button size="sm" disabled={!item.inStock}>
                          <ShoppingBag className="mr-2 h-3 w-3" />
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your wishlist and browsing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <div className="aspect-square relative bg-muted rounded overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=200&width=200`}
                    alt={`Recommended product ${item}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
                <h3 className="font-medium text-sm">Recommended Product {item}</h3>
                <p className="text-sm font-medium">$24.99</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

