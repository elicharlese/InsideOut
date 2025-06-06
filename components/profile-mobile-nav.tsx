"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  CreditCard,
  Heart,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  User,
  Calendar,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"

export function ProfileMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    { href: "/profile", icon: <User size={16} />, label: "Overview" },
    { href: "/profile/orders", icon: <ShoppingBag size={16} />, label: "Orders & Purchases" },
    { href: "/profile/appointments", icon: <Calendar size={16} />, label: "Appointments" },
    { href: "/profile/wishlist", icon: <Heart size={16} />, label: "Wishlist" },
    { href: "/profile/messages", icon: <MessageSquare size={16} />, label: "Messages" },
    { href: "/profile/notifications", icon: <Bell size={16} />, label: "Notifications" },
    { href: "/profile/payment", icon: <CreditCard size={16} />, label: "Payment Methods" },
    { href: "/profile/settings", icon: <Settings size={16} />, label: "Account Settings" },
  ]

  const currentRoute = routes.find((route) => pathname === route.href) || routes[0]

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">{currentRoute.label}</h1>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {currentRoute.icon}
            <span className="ml-2">{currentRoute.label}</span>
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {routes.map((route) => (
            <DropdownMenuItem key={route.href} asChild>
              <Link href={route.href} className="flex items-center gap-2" onClick={() => setOpen(false)}>
                {route.icon}
                {route.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild>
            <Link href="/support" className="flex items-center gap-2">
              <Package size={16} />
              Get Support
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

