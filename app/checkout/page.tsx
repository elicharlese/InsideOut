"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, CreditCard, Info, Lock, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("stripe")

  // In a real app, this would be fetched from a cart state or API
  const cartItems = [
    {
      id: 1,
      type: "product",
      name: "Pride T-Shirt",
      price: 24.99,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      type: "product",
      name: "Chest Binder",
      price: 34.99,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      type: "service",
      name: "Therapy Session",
      price: 120.0,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      // Submit order
      window.location.href = "/checkout/success"
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    } else {
      window.location.href = "/cart"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/cart"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Lock className="h-4 w-4 mr-1" /> Secure Checkout
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <StepIndicator step={1} currentStep={step} label="Shipping" />
          <StepDivider active={step >= 2} />
          <StepIndicator step={2} currentStep={step} label="Payment" />
          <StepDivider active={step >= 3} />
          <StepIndicator step={3} currentStep={step} label="Review" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          {/* Add more states */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        {/* Add more countries */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-info" />
                    <Label htmlFor="save-info">Save this information for next time</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleContinue}>Continue to Payment</Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stripe" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="stripe">
                      <CreditCard className="h-4 w-4 mr-2" /> Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="crypto">
                      <Wallet className="h-4 w-4 mr-2" /> Cryptocurrency
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="stripe" className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input id="card-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="save-card" />
                        <Label htmlFor="save-card">Save this card for future purchases</Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="crypto" className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-type">Select Cryptocurrency</Label>
                        <RadioGroup defaultValue="btc">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="btc" id="btc" />
                            <Label htmlFor="btc">Bitcoin (BTC)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="eth" id="eth" />
                            <Label htmlFor="eth">Ethereum (ETH)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="usdc" id="usdc" />
                            <Label htmlFor="usdc">USD Coin (USDC)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">
                          <Info className="h-4 w-4 inline mr-1" />
                          When you click "Complete Order", you'll be redirected to our secure crypto payment gateway.
                        </div>
                        <div className="text-sm text-muted-foreground">
                          The current exchange rate will be applied at the time of payment.
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleContinue}>Review Order</Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
                <CardDescription>Please review your order details before completing your purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="p-4 bg-muted rounded-lg">
                      <p>Jane Doe</p>
                      <p>123 Main Street</p>
                      <p>Apt 4B</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                      <p>jane.doe@example.com</p>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <div className="p-4 bg-muted rounded-lg flex items-center">
                      {paymentMethod === "stripe" ? (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          <span>Credit Card ending in 3456</span>
                        </>
                      ) : (
                        <>
                          <Wallet className="h-5 w-5 mr-2" />
                          <span>Cryptocurrency (Bitcoin)</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-12 h-12 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{item.name}</h4>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleContinue}>Complete Order</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
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
            <CardFooter className="flex flex-col gap-4">
              <div className="text-sm text-muted-foreground">
                <Lock className="h-4 w-4 inline mr-1" />
                Your personal data will be used to process your order, support your experience, and for other purposes
                described in our privacy policy.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StepIndicator({ step, currentStep, label }) {
  const isActive = currentStep >= step
  const isComplete = currentStep > step

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground text-muted-foreground"
        }`}
      >
        {isComplete ? <Check className="h-5 w-5" /> : step}
      </div>
      <span className={`mt-2 text-sm ${isActive ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
    </div>
  )
}

function StepDivider({ active }) {
  return <div className={`h-[2px] w-16 sm:w-24 md:w-32 ${active ? "bg-primary" : "bg-muted-foreground"}`} />
}

