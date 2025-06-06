"use client"

import type React from "react"

import { useState } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductCategoryLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  filterPanel: React.ReactNode
}

export function ProductCategoryLayout({ title, description, children, filterPanel }: ProductCategoryLayoutProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <Input placeholder="Search products..." className="max-w-xs" />
        </div>
        <div className="flex items-center gap-2">
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="px-1 py-6">{filterPanel}</div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Popularity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="hidden w-[250px] shrink-0 md:block">{filterPanel}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

export function ProductCategorySkeleton() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Skeleton className="mb-2 h-10 w-[250px]" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="hidden w-[250px] shrink-0 md:block">
          <Skeleton className="h-[600px] w-full" />
        </div>
        <div className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full" />
            ))}
        </div>
      </div>
    </div>
  )
}

