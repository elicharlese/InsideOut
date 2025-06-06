import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PaymentMethodsPage() {
  // In a real app, this would be fetched from an API
  const paymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2024,
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "card",
      brand: "mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2025,
      isDefault: false,
    },
  ]

  const billingHistory = [
    {
      id: "inv_1",
      date: "July 12, 2023",
      description: "Order #ORD-7829",
      amount: 92.36,
      status: "Paid",
    },
    {
      id: "inv_2",
      date: "June 15, 2023",
      description: "Therapy Session - Dr. Maya Rodriguez",
      amount: 25.0,
      status: "Paid",
    },
    {
      id: "inv_3",
      date: "June 3, 2023",
      description: "Order #ORD-6547",
      amount: 54.99,
      status: "Paid",
    },
    {
      id: "sub_1",
      date: "June 1, 2023",
      description: "Monthly Subscription - Therapy Sessions",
      amount: 240.0,
      status: "Paid",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Methods</h1>
        <p className="text-muted-foreground">Manage your payment methods and billing history</p>
      </div>

      <Tabs defaultValue="payment-methods">
        <TabsList>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    {method.brand === "visa" && <span className="font-bold text-blue-600">VISA</span>}
                    {method.brand === "mastercard" && <span className="font-bold text-red-600">MC</span>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">•••• {method.last4}</h3>
                      {method.isDefault && <Badge variant="outline">Default</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      Set as Default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past transactions and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold">Date</th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold">Description</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Amount</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Status</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {billingHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">{item.date}</td>
                      <td className="px-4 py-4 text-sm">{item.description}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-right">${item.amount.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="#">Download</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Therapy Sessions</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Bi-weekly sessions with Dr. Maya Rodriguez</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span> $240.00 / Monthly
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next billing:</span> August 1, 2023
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  Pause
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Self-Care Box</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Monthly delivery of self-care products</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span> $34.99 / Monthly
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next billing:</span> July 25, 2023
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  Pause
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

