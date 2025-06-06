import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Edit, MessageSquare, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  // This would come from authentication in a real app
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    pronouns: "they/them",
    memberSince: "January 2023",
    completionPercentage: 85,
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
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
            <span className="sr-only">Edit profile picture</span>
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{user.pronouns}</Badge>
                <span className="text-xs text-muted-foreground">Member since {user.memberSince}</span>
              </div>
            </div>
            <Button asChild>
              <Link href="/profile/settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your profile to get the most out of InsideOut</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Profile completion</span>
              <span>{user.completionPercentage}%</span>
            </div>
            <Progress value={user.completionPercentage} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <CompletionItem
                title="Add payment method"
                description="Add a payment method for faster checkout"
                href="/profile/payment"
                completed={true}
              />
              <CompletionItem
                title="Complete health questionnaire"
                description="Help us personalize your experience"
                href="/profile/health"
                completed={false}
              />
              <CompletionItem
                title="Set communication preferences"
                description="Choose how you want to hear from us"
                href="/profile/settings/communications"
                completed={true}
              />
              <CompletionItem
                title="Connect with a provider"
                description="Schedule your first appointment"
                href="/services"
                completed={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAccessCard
          title="Recent Orders"
          icon={<ShoppingBag className="h-5 w-5" />}
          items={[
            { id: "ORD-7829", label: "Pride T-Shirt + 2 more", date: "July 12, 2023" },
            { id: "ORD-6547", label: "Self-Care Kit", date: "June 3, 2023" },
          ]}
          viewAllHref="/profile/orders"
        />

        <QuickAccessCard
          title="Upcoming Appointments"
          icon={<Calendar className="h-5 w-5" />}
          items={[
            { id: "APT-4523", label: "Therapy with Dr. Maya", date: "Tomorrow, 2:00 PM" },
            { id: "APT-4892", label: "Healthcare Consultation", date: "July 28, 2023, 10:30 AM" },
          ]}
          viewAllHref="/profile/appointments"
        />

        <QuickAccessCard
          title="Recent Messages"
          icon={<MessageSquare className="h-5 w-5" />}
          items={[
            { id: "MSG-9283", label: "Dr. Maya Rodriguez", date: "2 hours ago" },
            { id: "MSG-9127", label: "Support Team", date: "Yesterday" },
          ]}
          viewAllHref="/profile/messages"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Journey Progress</CardTitle>
            <CardDescription>Track your personal journey milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/journey" className="block">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>42%</span>
                </div>
                <Progress value={42} />
                <div className="text-sm text-muted-foreground">
                  You're making great progress on your journey. Continue exploring resources and connecting with
                  providers.
                </div>
              </div>
            </Link>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/journey">View Journey</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
            <CardDescription>Items you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative bg-muted rounded">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Chest Binder"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">Chest Binder</h4>
                  <p className="text-sm text-muted-foreground">$34.99</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative bg-muted rounded">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Affirmation Journal"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">Affirmation Journal</h4>
                  <p className="text-sm text-muted-foreground">$18.99</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/profile/wishlist">View All</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

interface CompletionItemProps {
  title: string
  description: string
  href: string
  completed: boolean
}

function CompletionItem({ title, description, href, completed }: CompletionItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
          completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
        }`}
      >
        {completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <span className="text-xs">!</span>
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Button size="sm" variant={completed ? "outline" : "default"} asChild>
        <Link href={href}>{completed ? "Update" : "Complete"}</Link>
      </Button>
    </div>
  )
}

interface QuickAccessCardProps {
  title: string
  icon: React.ReactNode
  items: { id: string; label: string; date: string }[]
  viewAllHref: string
}

function QuickAccessCard({ title, icon, items, viewAllHref }: QuickAccessCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            <span className="mr-2 text-primary">{icon}</span>
            {title}
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
            <Link href={viewAllHref}>View all</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          {items.map((item) => (
            <Link key={item.id} href={`${viewAllHref}/${item.id}`} className="block">
              <div className="flex justify-between items-center py-1 group">
                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Button>
              </div>
            </Link>
          ))}

          {items.length === 0 && (
            <div className="text-center py-3">
              <p className="text-sm text-muted-foreground">No {title.toLowerCase()} yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

