"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Edit, Lock, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto md:inline-flex">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Profile picture"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute bottom-0 right-0 rounded-full bg-background border shadow-sm h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a new profile picture. JPG, GIF or PNG. 1MB max.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm">Upload</Button>
                      <Button size="sm" variant="outline">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pronouns">Pronouns</Label>
                    <Select defaultValue="they-them">
                      <SelectTrigger id="pronouns">
                        <SelectValue placeholder="Select pronouns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="she-her">She/Her</SelectItem>
                        <SelectItem value="he-him">He/Him</SelectItem>
                        <SelectItem value="they-them">They/Them</SelectItem>
                        <SelectItem value="ze-zir">Ze/Zir</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-of-birth">Date of Birth</Label>
                    <Input id="date-of-birth" type="date" defaultValue="1990-05-15" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                      defaultValue="I'm on a journey of self-discovery and growth. I enjoy reading, hiking, and connecting with like-minded individuals."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Update your shipping and billing addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shipping-address">Address</Label>
                      <Input id="shipping-address" defaultValue="123 Main Street, Apt 4B" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-city">City</Label>
                      <Input id="shipping-city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-state">State</Label>
                      <Select defaultValue="ny">
                        <SelectTrigger id="shipping-state">
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
                      <Label htmlFor="shipping-zip">ZIP Code</Label>
                      <Input id="shipping-zip" defaultValue="10001" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="shipping-country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="shipping-country">
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
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Switch id="same-address" defaultChecked />
                  <Label htmlFor="same-address">Billing address is the same as shipping address</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an additional security layer
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Recovery Codes</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate backup codes to access your account if you lose your device
                    </p>
                  </div>
                  <Button variant="outline">Generate Codes</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active sessions and devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-3.5 text-left text-sm font-semibold">Device</th>
                        <th className="px-4 py-3.5 text-left text-sm font-semibold">Location</th>
                        <th className="px-4 py-3.5 text-left text-sm font-semibold">Last Active</th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <div className="font-medium">Chrome on MacOS</div>
                          <div className="text-muted-foreground">Current session</div>
                        </td>
                        <td className="px-4 py-4 text-sm">New York, USA</td>
                        <td className="px-4 py-4 text-sm">Now</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm" disabled>
                            Current
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <div className="font-medium">Safari on iPhone</div>
                        </td>
                        <td className="px-4 py-4 text-sm">New York, USA</td>
                        <td className="px-4 py-4 text-sm">2 hours ago</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">
                            Sign Out
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <div className="font-medium">Firefox on Windows</div>
                        </td>
                        <td className="px-4 py-4 text-sm">Boston, USA</td>
                        <td className="px-4 py-4 text-sm">Yesterday</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">
                            Sign Out
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Sign Out All Other Sessions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="order-updates">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your orders and shipping updates
                        </p>
                      </div>
                      <Switch id="order-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get reminders about upcoming appointments</p>
                      </div>
                      <Switch id="appointment-reminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="messages">Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications when you get new messages
                        </p>
                      </div>
                      <Switch id="messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing & Promotions</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new products, services, and special offers
                        </p>
                      </div>
                      <Switch id="marketing" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-order-updates">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications about your orders</p>
                      </div>
                      <Switch id="push-order-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-appointment-reminders">Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get push reminders about upcoming appointments</p>
                      </div>
                      <Switch id="push-appointment-reminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-messages">Messages</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                      </div>
                      <Switch id="push-messages" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Frequency</CardTitle>
              <CardDescription>Choose how often you want to hear from us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Frequency</Label>
                  <RadioGroup defaultValue="weekly">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

