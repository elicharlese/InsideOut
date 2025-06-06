import type React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { Bell, CreditCard, Heart, MessageSquare, Package, Settings, ShoppingBag, User, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileMobileNav } from "@/components/profile-mobile-nav"

interface ProfileLayoutProps {
  children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">My Account</h2>
              <p className="text-muted-foreground text-sm">Manage your account settings and preferences</p>
            </div>

            <nav className="space-y-1">
              <NavItem href="/profile" icon={<User size={18} />} label="Overview" />
              <NavItem href="/profile/orders" icon={<ShoppingBag size={18} />} label="Orders & Purchases" />
              <NavItem href="/profile/appointments" icon={<Calendar size={18} />} label="Appointments" />
              <NavItem href="/profile/wishlist" icon={<Heart size={18} />} label="Wishlist" />
              <NavItem href="/profile/messages" icon={<MessageSquare size={18} />} label="Messages" />
              <NavItem href="/profile/notifications" icon={<Bell size={18} />} label="Notifications" />
              <NavItem href="/profile/payment" icon={<CreditCard size={18} />} label="Payment Methods" />
              <NavItem href="/profile/settings" icon={<Settings size={18} />} label="Account Settings" />
            </nav>

            <Separator />

            <div className="pt-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/support">
                  <Package className="mr-2 h-4 w-4" />
                  Get Support
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mb-6">
          <ProfileMobileNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center py-2 px-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <span className="mr-3 text-muted-foreground">{icon}</span>
      {label}
    </Link>
  )
}

