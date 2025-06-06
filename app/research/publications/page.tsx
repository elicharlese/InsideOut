import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationCard } from "@/components/publication-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PublicationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Research Publications</h1>
          <p className="text-muted-foreground">
            Explore peer-reviewed research on LGBTQA+ health, social issues, and more
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input placeholder="Search publications..." className="pr-8" />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="cited">Most Cited</SelectItem>
                  <SelectItem value="az">A-Z</SelectItem>
                  <SelectItem value="za">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Publications</Button>
      </div>
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
    journal: "Journal of LGBTQ+ Mental Health",
    doi: "10.1234/jlgbtq.2023.001",
    abstract:
      "This study examines the positive mental health outcomes for transgender youth who have access to gender-affirming healthcare services compared to those without access.",
    tags: ["transgender", "youth", "mental health", "gender-affirming care"],
  },
  {
    id: 2,
    title: "The Impact of Inclusive Housing Policies on LGBTQA+ Homelessness Rates",
    authors: ["Dr. Jamie Rodriguez", "Alex Thompson, MSW"],
    date: "January 2023",
    category: "Social",
    journal: "Housing Policy Review",
    doi: "10.5678/hpr.2023.002",
    abstract:
      "An analysis of how inclusive housing policies in various cities have affected homelessness rates among LGBTQA+ individuals, particularly youth and seniors.",
    tags: ["housing", "homelessness", "policy", "youth", "seniors"],
  },
  {
    id: 3,
    title: "Legal Protections for LGBTQA+ Families: A Comparative Analysis",
    authors: ["Prof. Taylor Williams", "Jordan Lee, J.D."],
    date: "November 2022",
    category: "Legal",
    journal: "Family Law Quarterly",
    doi: "10.9012/flq.2022.003",
    abstract:
      "This paper compares legal protections for LGBTQA+ families across different jurisdictions and analyzes their effectiveness in providing equal rights.",
    tags: ["family law", "legal protections", "comparative analysis"],
  },
  {
    id: 4,
    title: "Inclusive Education Practices and Their Effect on LGBTQA+ Student Outcomes",
    authors: ["Dr. Robin Garcia", "Sam Patel, Ed.D."],
    date: "October 2022",
    category: "Education",
    journal: "Journal of Inclusive Education",
    doi: "10.3456/jie.2022.004",
    abstract:
      "A longitudinal study examining how inclusive education practices affect academic performance, attendance, and well-being of LGBTQA+ students.",
    tags: ["education", "student outcomes", "inclusion", "academic performance"],
  },
  {
    id: 5,
    title: "Healthcare Provider Knowledge and Attitudes Toward LGBTQA+ Patients",
    authors: ["Dr. Morgan Smith", "Dr. Casey Johnson"],
    date: "August 2022",
    category: "Health",
    journal: "Healthcare Equity Research",
    doi: "10.7890/her.2022.005",
    abstract:
      "This study assesses knowledge, attitudes, and practices of healthcare providers when treating LGBTQA+ patients and identifies areas for improvement in medical education.",
    tags: ["healthcare", "medical education", "provider attitudes", "patient care"],
  },
  {
    id: 6,
    title: "The Role of Community Centers in Supporting LGBTQA+ Elders",
    authors: ["Dr. Alex Rivera", "Jordan Taylor, MSW"],
    date: "July 2022",
    category: "Social",
    journal: "Journal of Gerontological Social Work",
    doi: "10.2345/jgsw.2022.006",
    abstract:
      "An examination of how LGBTQA+ community centers provide support services to older adults and help combat isolation and discrimination.",
    tags: ["elders", "community centers", "social support", "isolation"],
  },
]

