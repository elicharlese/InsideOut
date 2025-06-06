import Link from "next/link"
import Image from "next/image"
import { Download, ExternalLink, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders & Purchases</h1>
        <p className="text-muted-foreground">View and manage your order history</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <Select defaultValue="all-time">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
            <SelectItem value="all-time">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>You have made 6 orders in total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <OrderItem
              id="ORD-7829"
              date="July 12, 2023"
              status="Delivered"
              total={79.97}
              items={[
                { name: "Pride T-Shirt", price: 24.99, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
                { name: "Chest Binder", price: 34.99, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
                { name: "Rainbow Bracelet", price: 9.99, quantity: 2, image: "/placeholder.svg?height=60&width=60" },
              ]}
            />

            <Separator />

            <OrderItem
              id="ORD-6547"
              date="June 3, 2023"
              status="Delivered"
              total={49.99}
              items={[
                { name: "Self-Care Kit", price: 49.99, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
              ]}
            />

            <Separator />

            <OrderItem
              id="ORD-5932"
              date="May 17, 2023"
              status="Delivered"
              total={120.0}
              items={[
                {
                  name: "Therapy Session with Dr. Maya",
                  price: 120.0,
                  quantity: 1,
                  image: "/placeholder.svg?height=60&width=60",
                  type: "service",
                },
              ]}
            />

            <Separator />

            <OrderItem
              id="ORD-4781"
              date="April 29, 2023"
              status="Delivered"
              total={44.98}
              items={[
                { name: "Pronoun Pin Set", price: 12.99, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
                {
                  name: "Affirmation Journal",
                  price: 18.99,
                  quantity: 1,
                  image: "/placeholder.svg?height=60&width=60",
                },
                { name: "Rainbow Bracelet", price: 9.99, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Manage your recurring payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <SubscriptionItem
              name="Therapy Sessions"
              description="Bi-weekly sessions with Dr. Maya Rodriguez"
              price={240.0}
              frequency="Monthly"
              nextBilling="August 1, 2023"
              status="Active"
            />

            <Separator />

            <SubscriptionItem
              name="Self-Care Box"
              description="Monthly delivery of self-care products"
              price={34.99}
              frequency="Monthly"
              nextBilling="July 25, 2023"
              status="Active"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface OrderItemProps {
  id: string
  date: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  total: number
  items: {
    name: string
    price: number
    quantity: number
    image: string
    type?: "product" | "service"
  }[]
}

function OrderItem({ id, date, status, total, items }: OrderItemProps) {
  const getStatusColor = () => {
    switch (status) {
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Order #{id}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>{status}</span>
          </div>
          <p className="text-sm text-muted-foreground">Placed on {date}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/profile/orders/${id}`}>
              <ExternalLink className="mr-2 h-3 w-3" />
              Details
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-3 w-3" />
            Invoice
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-12 h-12 relative bg-muted rounded overflow-hidden flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">
                  {item.type === "service" ? "Service" : `Qty: ${item.quantity}`}
                </p>
                <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <span className="font-medium">Total</span>
        <span className="font-medium">${total.toFixed(2)}</span>
      </div>
    </div>
  )
}

interface SubscriptionItemProps {
  name: string
  description: string
  price: number
  frequency: string
  nextBilling: string
  status: "Active" | "Paused" | "Cancelled"
}

function SubscriptionItem({ name, description, price, frequency, nextBilling, status }: SubscriptionItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Paused":
        return "bg-amber-100 text-amber-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{name}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>{status}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex gap-4 mt-2 text-sm">
          <div>
            <span className="text-muted-foreground">Price:</span> ${price.toFixed(2)} / {frequency}
          </div>
          <div>
            <span className="text-muted-foreground">Next billing:</span> {nextBilling}
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="sm">
          Manage
        </Button>
        {status === "Active" && (
          <Button variant="outline" size="sm">
            Pause
          </Button>
        )}
      </div>
    </div>
  )
}

