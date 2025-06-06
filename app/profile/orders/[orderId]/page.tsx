import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const orderId = params.orderId

  // In a real app, this would be fetched from an API
  const order = {
    id: orderId,
    date: "July 12, 2023",
    status: "Delivered",
    deliveredDate: "July 15, 2023",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    paymentMethod: "Credit Card ending in 4242",
    billingAddress: {
      name: "Alex Johnson",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    shippingAddress: {
      name: "Alex Johnson",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        name: "Pride T-Shirt",
        price: 24.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        options: { size: "M", color: "Rainbow" },
      },
      {
        name: "Chest Binder",
        price: 34.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        options: { size: "L", color: "Black" },
      },
      {
        name: "Rainbow Bracelet",
        price: 9.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
        options: { size: "One Size", color: "Rainbow" },
      },
    ],
    subtotal: 79.97,
    shipping: 5.99,
    tax: 6.4,
    total: 92.36,
  }

  const getStatusColor = () => {
    switch (order.status) {
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/profile/orders"
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Order #{order.id}</h1>
          <p className="text-muted-foreground">Placed on {order.date}</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Items included in your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-20 h-20 relative bg-muted rounded overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key}>
                              {key}: {value}{" "}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                    {order.status}
                  </span>
                </div>

                {order.status === "Delivered" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivered on</span>
                    <span>{order.deliveredDate}</span>
                  </div>
                )}

                {order.trackingNumber && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tracking</span>
                    <Link href="#" className="text-primary hover:underline">
                      {order.trackingNumber}
                    </Link>
                  </div>
                )}

                {order.carrier && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carrier</span>
                    <span>{order.carrier}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {order.status === "Shipped" && (
                <Button className="w-full" asChild>
                  <Link href="#">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Package
                  </Link>
                </Button>
              )}

              {order.status === "Delivered" && (
                <Button variant="outline" className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  Report an Issue
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                  <p>{order.paymentMethod}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Billing Address</h3>
                  <p>{order.billingAddress.name}</p>
                  <p>{order.billingAddress.address}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Shipping Address</h3>
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

