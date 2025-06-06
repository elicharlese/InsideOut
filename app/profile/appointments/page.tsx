import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Filter, MapPin, MessageSquare, Search, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search appointments..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <Select defaultValue="all-time">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="all-time">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>You have 2 upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <AppointmentItem
              id="APT-4523"
              provider={{
                name: "Dr. Maya Rodriguez",
                specialty: "Therapist",
                image: "/placeholder.svg?height=80&width=80",
              }}
              type="Therapy Session"
              date="July 21, 2023"
              time="2:00 PM - 3:00 PM"
              format="Virtual"
              status="Confirmed"
            />

            <Separator />

            <AppointmentItem
              id="APT-4892"
              provider={{
                name: "Dr. Alex Johnson",
                specialty: "Healthcare Provider",
                image: "/placeholder.svg?height=80&width=80",
              }}
              type="Healthcare Consultation"
              date="July 28, 2023"
              time="10:30 AM - 11:15 AM"
              format="In-Person"
              location="123 Medical Center, Suite 4B, New York, NY 10001"
              status="Confirmed"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
          <CardDescription>Your appointment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <AppointmentItem
              id="APT-3781"
              provider={{
                name: "Dr. Maya Rodriguez",
                specialty: "Therapist",
                image: "/placeholder.svg?height=80&width=80",
              }}
              type="Therapy Session"
              date="July 7, 2023"
              time="2:00 PM - 3:00 PM"
              format="Virtual"
              status="Completed"
            />

            <Separator />

            <AppointmentItem
              id="APT-3542"
              provider={{
                name: "Dr. Maya Rodriguez",
                specialty: "Therapist",
                image: "/placeholder.svg?height=80&width=80",
              }}
              type="Therapy Session"
              date="June 23, 2023"
              time="2:00 PM - 3:00 PM"
              format="Virtual"
              status="Completed"
            />

            <Separator />

            <AppointmentItem
              id="APT-3127"
              provider={{
                name: "Dr. Alex Johnson",
                specialty: "Healthcare Provider",
                image: "/placeholder.svg?height=80&width=80",
              }}
              type="Initial Consultation"
              date="June 15, 2023"
              time="10:30 AM - 11:30 AM"
              format="In-Person"
              location="123 Medical Center, Suite 4B, New York, NY 10001"
              status="Completed"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AppointmentItemProps {
  id: string
  provider: {
    name: string
    specialty: string
    image: string
  }
  type: string
  date: string
  time: string
  format: "Virtual" | "In-Person" | "Phone"
  location?: string
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed"
}

function AppointmentItem({ id, provider, type, date, time, format, location, status }: AppointmentItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-amber-100 text-amber-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isPast = status === "Completed" || status === "Cancelled"
  const isUpcoming = status === "Confirmed" || status === "Pending"

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{type}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>{status}</span>
          </div>
          <p className="text-sm text-muted-foreground">Appointment #{id}</p>
        </div>
        <div className="flex items-center gap-2">
          {isUpcoming && (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/profile/appointments/${id}`}>Details</Link>
              </Button>
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              {format === "Virtual" && (
                <Button size="sm">
                  <Video className="mr-2 h-3 w-3" />
                  Join
                </Button>
              )}
            </>
          )}

          {isPast && (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/profile/appointments/${id}`}>Details</Link>
              </Button>
              <Button variant="outline" size="sm">
                Book Again
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative bg-muted rounded-full overflow-hidden flex-shrink-0">
            <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{provider.name}</h4>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            {format === "Virtual" ? (
              <Video className="mr-1.5 h-4 w-4 text-muted-foreground" />
            ) : (
              <MapPin className="mr-1.5 h-4 w-4 text-muted-foreground" />
            )}
            <span>{format}</span>
          </div>
        </div>
      </div>

      {location && (
        <div className="flex items-start gap-1.5 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span>{location}</span>
        </div>
      )}

      {isUpcoming && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/profile/messages?provider=${provider.name.replace(/\s+/g, "-").toLowerCase()}`}>
              <MessageSquare className="mr-2 h-3 w-3" />
              Message Provider
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

