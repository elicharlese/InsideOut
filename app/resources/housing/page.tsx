import Link from "next/link"
import { Calendar, ExternalLink, Globe, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function HousingResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Housing & Relocation Resources</h1>
        <p className="text-muted-foreground">Find safe housing options and relocation assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Housing Directory</CardTitle>
              <CardDescription>LGBTQA+ friendly housing options and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input placeholder="Search by location..." className="flex-1" />
                <Button>Search</Button>
              </div>

              <Tabs defaultValue="housing">
                <TabsList className="mb-4">
                  <TabsTrigger value="housing">Housing</TabsTrigger>
                  <TabsTrigger value="shelters">Shelters</TabsTrigger>
                  <TabsTrigger value="roommates">Roommate Matching</TabsTrigger>
                </TabsList>
                <TabsContent value="housing">
                  <div className="space-y-4">
                    {housingOptions.map((option) => (
                      <HousingCard key={option.id} housing={option} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="shelters">
                  <div className="space-y-4">
                    {shelters.map((shelter) => (
                      <ShelterCard key={shelter.id} shelter={shelter} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="roommates">
                  <div className="p-8 text-center border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Roommate Matching Service</h3>
                    <p className="text-muted-foreground mb-4">
                      Our secure roommate matching service helps you find compatible LGBTQA+ roommates in your desired
                      area.
                    </p>
                    <Button asChild>
                      <Link href="/resources/housing/roommate-matching">Get Started</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relocation Assistance</CardTitle>
              <CardDescription>Support for moving to a more affirming community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Relocation Grants</h3>
                  <p className="text-muted-foreground mb-4">
                    Financial assistance for individuals needing to relocate for safety or access to affirming services.
                  </p>
                  <Button asChild>
                    <Link href="/resources/financial/relocation-grants">Learn More</Link>
                  </Button>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Moving Assistance</h3>
                  <p className="text-muted-foreground mb-4">
                    Volunteer networks that help with packing, moving, and settling into a new community.
                  </p>
                  <Button asChild>
                    <Link href="/resources/housing/moving-assistance">Find Help</Link>
                  </Button>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Community Guides</h3>
                  <p className="text-muted-foreground mb-4">
                    Resources about LGBTQA+ friendly cities, neighborhoods, and communities across the country.
                  </p>
                  <Button asChild>
                    <Link href="/resources/housing/community-guides">View Guides</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Housing Consultation</CardTitle>
              <CardDescription>Speak with a housing specialist</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Our housing specialists can help you navigate housing options, understand your rights, and connect you
                with resources.
              </p>
              <Button className="w-full" asChild>
                <Link href="/services/book/housing-consultation">
                  <Calendar className="mr-2 h-4 w-4" /> Book Consultation
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Know Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Information about housing discrimination protections and legal resources for LGBTQA+ individuals.
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/resources/legal/housing-discrimination"
                    className="text-primary hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Fair Housing Act and LGBTQA+ Protections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/legal/tenant-rights"
                    className="text-primary hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Tenant Rights Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/legal/discrimination-reporting"
                    className="text-primary hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> How to Report Housing Discrimination
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                If you're experiencing a housing crisis or emergency, these resources can help:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                  <div>
                    <div className="font-medium">LGBTQ+ Housing Hotline</div>
                    <div className="text-muted-foreground">1-800-555-SAFE</div>
                    <div className="text-xs text-muted-foreground">Available 24/7</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Globe className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                  <div>
                    <div className="font-medium">National Runaway Safeline</div>
                    <div className="text-muted-foreground">1-800-RUNAWAY</div>
                    <div className="text-xs text-muted-foreground">Text or call 24/7</div>
                  </div>
                </li>
                <li>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/resources/emergency">View All Emergency Resources</Link>
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function HousingCard({ housing }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            Property Image
          </div>
          <div className="md:w-2/3">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{housing.name}</h3>
              <Badge variant="outline">{housing.type}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" /> {housing.location}
            </div>
            <p className="text-sm mb-3">{housing.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {housing.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium">${housing.price}/month</div>
              <Button size="sm" asChild>
                <Link href={`/resources/housing/${housing.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ShelterCard({ shelter }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{shelter.name}</h3>
          <Badge variant="outline">{shelter.type}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" /> {shelter.location}
        </div>
        <p className="text-sm mb-3">{shelter.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Age Range:</span> {shelter.ageRange}
          </div>
          <div>
            <span className="text-muted-foreground">Capacity:</span> {shelter.capacity}
          </div>
          <div>
            <span className="text-muted-foreground">Stay Length:</span> {shelter.stayLength}
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span> {shelter.phone}
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="sm" asChild>
            <Link href={`/resources/housing/shelters/${shelter.id}`}>Contact</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const housingOptions = [
  {
    id: 1,
    name: "Rainbow Heights Apartments",
    type: "Apartment Complex",
    location: "Seattle, WA",
    description: "LGBTQA+ affirming apartment community with studio, 1 and 2 bedroom units available.",
    features: ["Pet Friendly", "On-site Laundry", "Community Events", "Security"],
    price: 1200,
  },
  {
    id: 2,
    name: "Inclusive Living Co-op",
    type: "Co-op Housing",
    location: "Portland, OR",
    description: "Cooperative living environment with shared spaces and private rooms in a supportive community.",
    features: ["Shared Kitchen", "Gardens", "Community Governance", "Affordable"],
    price: 750,
  },
  {
    id: 3,
    name: "Affirming Homes Network",
    type: "Room Rentals",
    location: "Multiple Cities",
    description: "Network of LGBTQA+ homeowners renting rooms in affirming households across the country.",
    features: ["Flexible Terms", "Vetted Hosts", "Immediate Availability", "Support Network"],
    price: 850,
  },
]

const shelters = [
  {
    id: 1,
    name: "Safe Harbor LGBTQ Youth Center",
    type: "Youth Shelter",
    location: "Chicago, IL",
    description: "Emergency and transitional housing for LGBTQ youth experiencing homelessness or family rejection.",
    ageRange: "16-24",
    capacity: "30 beds",
    stayLength: "Up to 90 days",
    phone: "(312) 555-7890",
  },
  {
    id: 2,
    name: "Transgender Housing Network",
    type: "Emergency Housing",
    location: "Multiple Cities",
    description: "Emergency housing and support services specifically for transgender individuals in crisis.",
    ageRange: "18+",
    capacity: "Varies by location",
    stayLength: "2 weeks to 6 months",
    phone: "(800) 555-4321",
  },
  {
    id: 3,
    name: "Pride Senior Living",
    type: "Senior Housing",
    location: "San Francisco, CA",
    description: "Supportive housing for LGBTQ seniors with various levels of care and community programming.",
    ageRange: "55+",
    capacity: "50 units",
    stayLength: "Permanent",
    phone: "(415) 555-6789",
  },
]

