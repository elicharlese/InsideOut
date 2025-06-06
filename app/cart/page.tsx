import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  // In a real app, this would be fetched from a cart state or API
  const cartItems = [
    {
      id: 1,
      type: "product",
      name: "Pride T-Shirt",
      price: 24.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      options: { size: "M", color: "Rainbow" },
    },
    {
      id: 2,
      type: "product",
      name: "Chest Binder",
      price: 34.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      options: { size: "L", color: "Black" },
    },
    {
      id: 3,
      type: "service",
      name: "Therapy Session with Maya Rodriguez",
      price: 120.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      options: { date: "April 15, 2023", time: "2:00 PM" },
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                    >
                      <div className="sm:w-20 h-20 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.type === "product" ? (
                            <>
                              Size: {item.options.size} • Color: {item.options.color}
                            </>
                          ) : (
                            <>
                              Date: {item.options.date} • Time: {item.options.time}
                            </>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-none">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="w-10 text-center">{item.quantity}</div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex w-full sm:w-auto gap-2">
                  <Input placeholder="Promo code" className="w-full sm:w-auto" />
                  <Button variant="outline">Apply</Button>
                </div>
                <Button asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

