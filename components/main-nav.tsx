"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, Menu, ShoppingBag, CircleEqual } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartButton } from "@/components/cart-button"
import { AuthStatus } from "@/components/auth-status"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useMobile()

  const routes = [
    {
      name: "Shop",
      href: "/store",
      icon: <ShoppingBag className="h-4 w-4 mr-2" />,
      active: pathname?.startsWith("/store"),
      children: [
        { name: "All Products", href: "/store" },
        { name: "Clothing", href: "/store/clothing" },
        { name: "Wellness", href: "/store/wellness" },
        { name: "Accessories", href: "/store/accessories" },
        { name: "Gender-Affirming Products", href: "/store/gender-affirming" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      active: pathname?.startsWith("/services"),
      children: [
        { name: "Therapy", href: "/services/therapy" },
        { name: "Healthcare", href: "/services/healthcare" },
        { name: "Legal Support", href: "/services/legal" },
        { name: "Support Groups", href: "/services/support-groups" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      active: pathname?.startsWith("/resources"),
      children: [
        { name: "Housing", href: "/resources/housing" },
        { name: "Financial", href: "/resources/financial" },
        { name: "Community", href: "/resources/community" },
        { name: "Education", href: "/resources/education" },
      ],
    },
    {
      name: "Research",
      href: "/research",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      active: pathname?.startsWith("/research"),
      children: [
        { name: "Publications", href: "/research/publications" },
        { name: "Contribute", href: "/research/contribute" },
        { name: "Resources", href: "/research/resources" },
        { name: "Clinical Trials", href: "/research/clinical-trials" },
      ],
    },
  ]

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex w-full justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <CircleEqual className="h-5 w-5 text-primary" />
              <span className="font-bold">InsideOut</span>
            </Link>
            <div className="flex items-center gap-2">
              <CartButton />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {routes.map((route) => (
                      <div key={route.href} className="space-y-3">
                        <Link
                          href={route.href}
                          className={cn(
                            "flex items-center text-lg font-medium",
                            route.active ? "text-primary" : "text-muted-foreground",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {route.icon}
                          {route.name}
                        </Link>
                        {route.children && (
                          <div className="pl-6 border-l border-border space-y-2">
                            {route.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block text-muted-foreground hover:text-primary"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="absolute bottom-4 left-4 right-4">
                    <AuthStatus />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <CircleEqual className="h-5 w-5 text-primary" />
              <span className="font-bold">InsideOut</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map((route) => (
                  <NavigationMenuItem key={route.href}>
                    <NavigationMenuTrigger className={cn(route.active ? "text-primary" : "text-muted-foreground")}>
                      <div className="flex items-center">
                        {route.icon}
                        {route.name}
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {route.children?.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{child.name}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <CartButton />
            <AuthStatus />
          </div>
        </div>
      </div>
    </header>
  )
}

function useMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}

