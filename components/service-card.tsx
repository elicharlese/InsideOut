"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Heart, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  id: string
  name: string
  image: string
  specialty: string
  description: string
  rating: number
  reviewCount: number
  price: string
  location: string
  availability: string
  tags: string[]
  category: string
}

export function ServiceCard({
  id,
  name,
  image,
  specialty,
  description,
  rating,
  reviewCount,
  price,
  location,
  availability,
  tags,
  category,
}: ServiceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <Link href={`/services/${category}/${id}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <button
            onClick={toggleFavorite}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-white"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </button>
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-medium">{name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{specialty}</CardDescription>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-background/80 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{availability}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="font-medium">{price}</div>
          <Button size="sm" className="gap-1.5">
            <Calendar className="h-4 w-4" />
            Book Now
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

