"use client"

import type React from "react"

import { useState } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface ServiceCategoryLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function ServiceCategoryLayout({ title, description, children }: ServiceCategoryLayoutProps) {
  const [sortOption, setSortOption] = useState("recommended")
  const [priceRange, setPriceRange] = useState([0, 300])

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle>Filter Services</SheetTitle>
                <SheetDescription>Narrow down services based on your preferences</SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Service Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-person" />
                      <Label htmlFor="in-person">In-Person</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="virtual" />
                      <Label htmlFor="virtual">Virtual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 300]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
                      <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Rating</h3>
                  <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">Any rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4plus" id="4plus" />
                      <Label htmlFor="4plus">4+ stars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3plus" id="3plus" />
                      <Label htmlFor="3plus">3+ stars</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekdays" />
                      <Label htmlFor="weekdays">Weekdays</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekends" />
                      <Label htmlFor="weekends">Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="evenings" />
                      <Label htmlFor="evenings">Evenings</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1 md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle>Sort Services</SheetTitle>
                <SheetDescription>Choose how to sort the services</SheetDescription>
              </SheetHeader>

              <RadioGroup value={sortOption} onValueChange={setSortOption} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recommended" id="mobile-recommended" />
                  <Label htmlFor="mobile-recommended">Recommended</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="highest-rated" id="mobile-highest-rated" />
                  <Label htmlFor="mobile-highest-rated">Highest Rated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-low" id="mobile-price-low" />
                  <Label htmlFor="mobile-price-low">Price: Low to High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-high" id="mobile-price-high" />
                  <Label htmlFor="mobile-price-high">Price: High to Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="availability" id="mobile-availability" />
                  <Label htmlFor="mobile-availability">Availability</Label>
                </div>
              </RadioGroup>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:block">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="highest-rated">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {children}
    </div>
  )
}

