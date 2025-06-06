import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Shipping & Returns | InsideOut",
  description: "Information about our shipping policies, delivery times, and return process",
}

export default function ShippingReturnsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Shipping & Returns</h1>

      <Tabs defaultValue="shipping" className="mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
          <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
        </TabsList>

        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Processing Time</h3>
                <p className="text-muted-foreground">
                  We process all orders within 1-2 business days (Monday-Friday, excluding holidays). Orders placed
                  after 2:00 PM ET will be processed the next business day.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Methods & Delivery Times</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="font-medium">Shipping Method</div>
                    <div className="font-medium">Estimated Delivery Time</div>
                    <div className="font-medium">Cost</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-b pb-4">
                    <div>Standard Shipping</div>
                    <div>5-7 business days</div>
                    <div>$5.99 (Free on orders over $50)</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-b pb-4">
                    <div>Expedited Shipping</div>
                    <div>2-3 business days</div>
                    <div>$12.99</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>Express Shipping</div>
                    <div>1-2 business days</div>
                    <div>$19.99</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">International Shipping</h3>
                <p className="text-muted-foreground mb-4">
                  We ship to most countries worldwide. International shipping times typically range from 7-14 business
                  days, depending on your location and customs processing.
                </p>
                <p className="text-muted-foreground">
                  Please note that international orders may be subject to import duties and taxes, which are the
                  responsibility of the recipient.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Tracking Your Order</h3>
                <p className="text-muted-foreground">
                  Once your order ships, you'll receive a confirmation email with tracking information. You can also
                  track your order by logging into your account and viewing your order history.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="returns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Returns & Exchanges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
                <p className="text-muted-foreground">
                  We accept returns within 30 days of delivery. Items must be in their original condition with tags
                  attached and in the original packaging.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Items Not Eligible for Return</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Intimate apparel and undergarments</li>
                  <li>Items marked as final sale</li>
                  <li>Gift cards</li>
                  <li>Items that have been worn, washed, or altered</li>
                  <li>Items without original tags and packaging</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">How to Initiate a Return</h3>
                <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                  <li>Log into your account and go to your order history</li>
                  <li>Select the order containing the item(s) you wish to return</li>
                  <li>Click on "Return Items" and follow the prompts</li>
                  <li>Print the return label and packing slip</li>
                  <li>Pack the item(s) securely with the packing slip</li>
                  <li>Attach the return label to the outside of the package</li>
                  <li>Drop off the package at the designated carrier location</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Refund Process</h3>
                <p className="text-muted-foreground">
                  Once we receive and inspect your return, we'll process your refund. Refunds are issued to the original
                  payment method and typically take 5-10 business days to appear on your statement, depending on your
                  financial institution.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Exchanges</h3>
                <p className="text-muted-foreground">
                  We offer free exchanges for size or color variations of the same item. To request an exchange, follow
                  the same process as returns but select "Exchange" instead of "Return" when initiating the process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Return Shipping Costs</h3>
                <p className="text-muted-foreground">
                  For standard returns, a shipping fee of $5.99 will be deducted from your refund. Exchanges and returns
                  due to our error (damaged, defective, or incorrect items) ship free.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Need More Help?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          If you have any questions about shipping, returns, or exchanges, our customer service team is here to help.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Customer Service</Link>
        </Button>
      </div>
    </div>
  )
}

