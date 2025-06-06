import Link from "next/link"
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderSuccessPage() {
  // In a real app, this would be fetched from the order details
  const orderNumber = "IO-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString()

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-muted-foreground">Your order has been received and is being processed.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Order #{orderNumber}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Date</h3>
                <p>{orderDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p>Credit Card ending in 3456</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Shipping Address</h3>
                <p>Jane Doe</p>
                <p>123 Main Street, Apt 4B</p>
                <p>New York, NY 10001</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                <p>jane.doe@example.com</p>
                <p>(555) 123-4567</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pride T-Shirt (x1)</span>
                  <span>$24.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Chest Binder (x1)</span>
                  <span>$34.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Therapy Session (x1)</span>
                  <span>$120.00</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$179.98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$14.40</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>$200.37</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="#">
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Service Booking Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Service Booking Information</CardTitle>
          <CardDescription>Details for your booked services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Therapy Session with Maya Rodriguez</h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span> April 15, 2023
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span> 2:00 PM
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span> 60 minutes
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span> Virtual
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">How to Join</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive a link to join the session via email 30 minutes before your appointment.
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/services/appointments">Manage Appointment</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/shop">
            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

