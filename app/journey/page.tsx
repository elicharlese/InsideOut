import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle2, CircleDashed, CircleDot, Heart, HelpCircle, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JourneyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Journey</h1>
        <p className="text-muted-foreground">Personalized support for every step of your path</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Journey Progress</CardTitle>
              <CardDescription>Track your milestones and next steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} />
                </div>

                <div className="space-y-6">
                  <JourneyStep
                    title="Exploration & Learning"
                    description="Understand your identity and options"
                    status="completed"
                    progress={100}
                  />
                  <JourneyStep
                    title="Support Network"
                    description="Build connections with community and allies"
                    status="in-progress"
                    progress={65}
                  />
                  <JourneyStep
                    title="Healthcare Planning"
                    description="Explore healthcare options and providers"
                    status="in-progress"
                    progress={30}
                  />
                  <JourneyStep
                    title="Legal Considerations"
                    description="Understand legal protections and documentation"
                    status="not-started"
                    progress={0}
                  />
                  <JourneyStep
                    title="Living Authentically"
                    description="Resources for daily life and long-term wellbeing"
                    status="not-started"
                    progress={0}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/journey/next-steps">
                  Continue Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AppointmentCard
                      title="Therapy Session with Maya Rodriguez"
                      date="March 21, 2023"
                      time="2:00 PM"
                      location="Virtual"
                      type="Therapy"
                    />
                    <AppointmentCard
                      title="Healthcare Consultation with Dr. Johnson"
                      date="April 3, 2023"
                      time="10:30 AM"
                      location="123 Medical Center"
                      type="Healthcare"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommended">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RecommendationCard
                      title="Legal Name Change Consultation"
                      description="Based on your journey progress, you might benefit from a legal consultation about name change procedures."
                      type="Legal"
                    />
                    <RecommendationCard
                      title="Support Group: Coming Out"
                      description="Weekly virtual support group for individuals navigating the coming out process."
                      type="Community"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CompletedCard
                      title="Initial Consultation with Dr. Lee"
                      date="February 15, 2023"
                      type="Healthcare"
                    />
                    <CompletedCard title="Identity Workshop" date="January 28, 2023" type="Education" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources For You</CardTitle>
              <CardDescription>Personalized to your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/resources/coming-out-guide" className="block p-3 rounded-lg border hover:bg-muted">
                  <div className="font-medium">Coming Out Guide</div>
                  <div className="text-sm text-muted-foreground">Strategies and support for sharing your identity</div>
                </Link>
                <Link href="/resources/healthcare-checklist" className="block p-3 rounded-lg border hover:bg-muted">
                  <div className="font-medium">Healthcare Checklist</div>
                  <div className="text-sm text-muted-foreground">Questions to ask potential healthcare providers</div>
                </Link>
                <Link href="/resources/financial-planning" className="block p-3 rounded-lg border hover:bg-muted">
                  <div className="font-medium">Financial Planning</div>
                  <div className="text-sm text-muted-foreground">
                    Resources for planning transition-related expenses
                  </div>
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/resources">View All Resources</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Our support team is here to help you navigate your journey and answer any questions you may have.
              </p>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/support/chat">
                    <HelpCircle className="mr-2 h-4 w-4" /> Chat with Support
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/support/faq">Frequently Asked Questions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function JourneyStep({ title, description, status, progress }) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        {status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />}
        {status === "in-progress" && <CircleDot className="h-5 w-5 text-blue-500 mt-0.5" />}
        {status === "not-started" && <CircleDashed className="h-5 w-5 text-muted-foreground mt-0.5" />}
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="font-medium">{title}</div>
            <div className="text-sm">{progress}%</div>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Progress value={progress} className="mt-2 h-2" />
        </div>
      </div>
    </div>
  )
}

function AppointmentCard({ title, date, time, location, type }) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="bg-primary/10 p-3 rounded-full">
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" /> {date}, {time}
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" /> {location}
          </div>
        </div>
      </div>
      <Badge type={type} />
    </div>
  )
}

function RecommendationCard({ title, description, type }) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="bg-primary/10 p-3 rounded-full">
        <Heart className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <Button size="sm" className="mt-3" asChild>
          <Link href="/services">Learn More</Link>
        </Button>
      </div>
      <Badge type={type} />
    </div>
  )
}

function CompletedCard({ title, date, type }) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="bg-green-100 p-3 rounded-full">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">Completed on {date}</p>
      </div>
      <Badge type={type} />
    </div>
  )
}

function Badge({ type }) {
  const getColor = () => {
    switch (type) {
      case "Therapy":
        return "bg-purple-100 text-purple-800"
      case "Healthcare":
        return "bg-blue-100 text-blue-800"
      case "Legal":
        return "bg-amber-100 text-amber-800"
      case "Community":
        return "bg-green-100 text-green-800"
      case "Education":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getColor()}`}>{type}</span>
}

