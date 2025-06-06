"use client"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CartButton() {
  // This would be replaced with actual cart state from your state management solution
  const cartCount = 3
  const cartItems = [
    { id: 1, name: "Gender-Neutral T-Shirt", price: 29.99, quantity: 1 },
    { id: 2, name: "Wellness Kit", price: 49.99, quantity: 1 },
    { id: 3, name: "Pride Pin Set", price: 19.99, quantity: 1 },
  ]
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative border-sand-300 hover:bg-sand-100 hover:text-sand-900"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sand-600 text-xs text-white">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <h3 className="font-medium">Your Cart ({cartCount})</h3>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-auto">
          {cartItems.map((item) => (
            <DropdownMenuItem key={item.id} className="flex flex-col items-start p-4">
              <div className="flex w-full justify-between">
                <span className="font-medium">{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <span>Qty: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="p-4">
          <div className="flex justify-between py-2">
            <span className="font-medium">Total</span>
            <span className="font-medium">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild className="w-full bg-sand-600 hover:bg-sand-700">
              <Link href="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-sand-300 hover:bg-sand-100 hover:text-sand-900">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

