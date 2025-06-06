import Link from "next/link"
import { BookOpen, Download, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PublicationCardProps {
  publication: {
    id: number
    title: string
    authors: string[]
    date: string
    category: string
    abstract: string
    tags?: string[]
    journal?: string
    doi?: string
  }
  compact?: boolean
}

export function PublicationCard({ publication, compact = false }: PublicationCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className={compact ? "text-base" : "text-lg"}>{publication.title}</CardTitle>
          <Badge variant="outline">{publication.category}</Badge>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {publication.authors.join(", ")} • {publication.date}
          {publication.journal && <div className="mt-1 italic">Published in: {publication.journal}</div>}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm">{publication.abstract}</p>
        {publication.tags && publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {publication.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button size="sm" variant="outline" asChild>
          <Link href={`/research/publications/${publication.id}`}>
            <BookOpen className="mr-2 h-4 w-4" /> Read
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href={`/research/publications/${publication.id}/download`}>
            <Download className="mr-2 h-4 w-4" /> PDF
          </Link>
        </Button>
        {publication.doi && (
          <Button size="sm" variant="outline" asChild>
            <Link href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> DOI
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

