import Link from "next/link"
import { Calendar, Check, MessageSquare, Package, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
  // In a real app, this would be fetched from an API
  const notifications = [
    {
      id: "notif_1",
      type: "order",
      title: "Order Delivered",
      description: "Your order #ORD-7829 has been delivered.",
      date: "Today, 10:30 AM",
      read: false,
      link: "/profile/orders/ORD-7829",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      id: "notif_2",
      type: "appointment",
      title: "Appointment Reminder",
      description: "Your therapy session with Dr. Maya Rodriguez is tomorrow at 2:00 PM.",
      date: "Today, 9:15 AM",
      read: false,
      link: "/profile/appointments/APT-4523",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "notif_3",
      type: "message",
      title: "New Message",
      description: "Dr. Maya Rodriguez sent you a message.",
      date: "Yesterday, 3:20 PM",
      read: true,
      link: "/profile/messages?provider=dr-maya-rodriguez",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "notif_4",
      type: "order",
      title: "Order Shipped",
      description: "Your order #ORD-6547 has been shipped.",
      date: "June 5, 2023",
      read: true,
      link: "/profile/orders/ORD-6547",
      icon: <Package className="h-5 w-5" />,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with your orders, appointments, and messages</p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Your latest updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">All caught up!</h3>
              <p className="text-sm text-muted-foreground">You have no new notifications.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <Link
                    href={notification.link}
                    className={`block p-4 rounded-lg transition-colors ${
                      notification.read ? "hover:bg-muted" : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.read ? "bg-muted" : "bg-primary/10"
                        }`}
                      >
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${!notification.read && "text-primary"}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    </div>
                  </Link>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

