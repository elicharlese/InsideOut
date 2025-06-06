import Link from "next/link"
import { BookOpen, Filter, Search, FileText, Users, Microscope, Beaker } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationCard } from "@/components/publication-card"

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Research Hub</h1>
          <p className="text-muted-foreground">Access and contribute to LGBTQA+ research and resources</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-[300px]">
            <Input placeholder="Search research..." className="pr-8" />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Publications
            </CardTitle>
            <CardDescription>Explore peer-reviewed research on LGBTQA+ topics</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm">
              Access the latest studies, articles, and papers focused on LGBTQA+ health, social issues, legal matters,
              and more.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/research/publications">Browse Publications</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Contribute
            </CardTitle>
            <CardDescription>Share your research or participate in studies</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm">
              Submit your research, participate in ongoing studies, find funding opportunities, or collaborate with
              other researchers.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/research/contribute">Get Involved</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Resources
            </CardTitle>
            <CardDescription>Tools and materials for researchers</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm">
              Access research tools, datasets, methodological guides, and educational materials to support your LGBTQA+
              research.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/research/resources">Explore Resources</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Beaker className="h-5 w-5 mr-2" />
              Clinical Trials
            </CardTitle>
            <CardDescription>Find and participate in health studies</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm">
              Discover clinical trials and research studies focused on LGBTQA+ health needs and contribute to advancing
              healthcare.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/research/clinical-trials">View Trials</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Latest Publications</CardTitle>
          <CardDescription>Recently published research in the LGBTQA+ community</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
            </TabsList>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publications.slice(0, 3).map((publication) => (
                <PublicationCard key={publication.id} publication={publication} compact />
              ))}
            </div>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/research/publications">View All Publications</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Research Spotlight</CardTitle>
          <CardDescription>Featured research initiatives and opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Microscope className="h-5 w-5 mr-2" />
                  LGBTQA+ Health Equity Initiative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  A multi-institution research initiative focused on addressing health disparities in LGBTQA+
                  communities through evidence-based interventions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/research/spotlight/health-equity">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Community Research Fellowship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  A fellowship program supporting community members in conducting research relevant to their LGBTQA+
                  communities. Applications open now.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/research/spotlight/fellowship">Apply Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Research Methods Workshop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  An upcoming virtual workshop on inclusive research methods for studying LGBTQA+ populations. Open to
                  researchers at all levels.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/research/spotlight/workshop">Register</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const publications = [
  {
    id: 1,
    title: "Mental Health Outcomes in Transgender Youth with Access to Gender-Affirming Care",
    authors: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
    date: "March 2023",
    category: "Health",
    abstract:
      "This study examines the positive mental health outcomes for transgender youth who have access to gender-affirming healthcare services compared to those without access.",
  },
  {
    id: 2,
    title: "The Impact of Inclusive Housing Policies on LGBTQA+ Homelessness Rates",
    authors: ["Dr. Jamie Rodriguez", "Alex Thompson, MSW"],
    date: "January 2023",
    category: "Social",
    abstract:
      "An analysis of how inclusive housing policies in various cities have affected homelessness rates among LGBTQA+ individuals, particularly youth and seniors.",
  },
  {
    id: 3,
    title: "Legal Protections for LGBTQA+ Families: A Comparative Analysis",
    authors: ["Prof. Taylor Williams", "Jordan Lee, J.D."],
    date: "November 2022",
    category: "Legal",
    abstract:
      "This paper compares legal protections for LGBTQA+ families across different jurisdictions and analyzes their effectiveness in providing equal rights.",
  },
]

