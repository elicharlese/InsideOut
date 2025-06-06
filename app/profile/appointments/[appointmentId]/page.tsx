import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Download, MapPin, MessageSquare, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AppointmentDetailPage({ params }: { params: { appointmentId: string } }) {
  const appointmentId = params.appointmentId

  // In a real app, this would be fetched from an API
  const appointment = {
    id: appointmentId,
    type: "Therapy Session",
    provider: {
      name: "Dr. Maya Rodriguez",
      specialty: "Therapist",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Dr. Maya Rodriguez is a licensed therapist specializing in LGBTQA+ issues, with over 10 years of experience helping individuals navigate identity, relationships, and mental health challenges.",
      credentials: [
        "Ph.D. in Clinical Psychology",
        "Licensed Marriage and Family Therapist",
        "Certified in Gender-Affirming Care",
      ],
    },
    date: "July 21, 2023",
    time: "2:00 PM - 3:00 PM",
    format: "Virtual",
    status: "Confirmed",
    notes: "Follow-up session to discuss progress with anxiety management techniques.",
    joinUrl: "https://example.com/video/session/123456",
    price: 120.0,
    insurance: "Blue Cross Blue Shield - In Network",
    copay: 25.0,
    documents: [
      { name: "Pre-Session Questionnaire", url: "#" },
      { name: "Therapy Resources", url: "#" },
    ],
    previousAppointments: [
      { id: "APT-3781", date: "July 7, 2023", type: "Therapy Session" },
      { id: "APT-3542", date: "June 23, 2023", type: "Therapy Session" },
    ],
  }

  const getStatusColor = () => {
    switch (appointment.status) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/profile/appointments"
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Appointments
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{appointment.type}</h1>
          <p className="text-muted-foreground">Appointment #{appointment.id}</p>
        </div>
        <div className="flex gap-2">
          {appointment.status === "Confirmed" && appointment.format === "Virtual" && (
            <Button>
              <Video className="mr-2 h-4 w-4" />
              Join Session
            </Button>
          )}
          <Button variant="outline">Reschedule</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Information about your upcoming appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 relative bg-muted rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={appointment.provider.image || "/placeholder.svg"}
                      alt={appointment.provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{appointment.provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.provider.specialty}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center">
                    {appointment.format === "Virtual" ? (
                      <Video className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{appointment.format}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">About Your Provider</h3>
                <p className="text-sm mb-3">{appointment.provider.bio}</p>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Credentials:</h4>
                  <ul className="text-sm list-disc pl-5">
                    {appointment.provider.credentials.map((credential, index) => (
                      <li key={index}>{credential}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Session Notes</h3>
                <p className="text-sm">{appointment.notes}</p>
              </div>

              {appointment.documents.length > 0 && (
                <>
                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Documents</h3>
                    <div className="space-y-2">
                      {appointment.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{doc.name}</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={doc.url}>
                              <Download className="mr-2 h-3 w-3" />
                              Download
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {appointment.previousAppointments.length > 0 && (
                <>
                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Previous Appointments</h3>
                    <div className="space-y-2">
                      {appointment.previousAppointments.map((apt, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">{apt.type}</span>
                            <span className="text-muted-foreground ml-2">{apt.date}</span>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/profile/appointments/${apt.id}`}>View</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/profile/messages?provider=${appointment.provider.name.replace(/\s+/g, "-").toLowerCase()}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Provider
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                    {appointment.status}
                  </span>
                </div>

                {appointment.format === "Virtual" && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">How to Join</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can join your virtual appointment directly from this page by clicking the "Join Session"
                      button when it's time for your appointment.
                    </p>
                    {appointment.status === "Confirmed" && (
                      <Button className="w-full" disabled={true}>
                        <Video className="mr-2 h-4 w-4" />
                        Join Session
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Fee</span>
                  <span>${appointment.price.toFixed(2)}</span>
                </div>

                {appointment.insurance && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Insurance</span>
                      <span>{appointment.insurance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your Copay</span>
                      <span>${appointment.copay.toFixed(2)}</span>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total Paid</span>
                  <span>${appointment.copay.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you need to cancel or have questions about your appointment, please contact us as soon as possible.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Cancel Appointment
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/support">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

