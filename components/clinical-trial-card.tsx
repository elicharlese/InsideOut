import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ClinicalTrialCardProps {
  trial: {
    id: number
    title: string
    status: "Recruiting" | "Active" | "Completed" | "Not yet recruiting"
    phase: string
    focus: string
    description: string
    locations: string[]
    eligibility: string
    startDate: string
    endDate?: string
    contactEmail: string
    contactPhone: string
  }
}

export function ClinicalTrialCard({ trial }: ClinicalTrialCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recruiting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "Not yet recruiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2 flex-wrap">
          <CardTitle className="text-lg">{trial.title}</CardTitle>
          <Badge className={getStatusColor(trial.status)}>{trial.status}</Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{trial.phase}</Badge>
          <Badge variant="secondary">{trial.focus}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <p className="text-sm">{trial.description}</p>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Locations:</p>
              <ul className="list-disc list-inside ml-1">
                {trial.locations.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Eligibility:</p>
              <p>{trial.eligibility}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Timeline:</p>
              <p>
                Start: {trial.startDate}
                {trial.endDate ? ` • End: ${trial.endDate}` : ""}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" asChild>
          <Link href={`/research/clinical-trials/${trial.id}`}>View Trial Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

