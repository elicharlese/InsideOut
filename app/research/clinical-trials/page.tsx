import { Filter, Search, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClinicalTrialCard } from "@/components/clinical-trial-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClinicalTrialsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinical Trials</h1>
          <p className="text-muted-foreground">Find and participate in research studies focused on LGBTQA+ health</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input placeholder="Search trials..." className="pr-8" />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Trials</TabsTrigger>
                <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="location">Nearest Location</SelectItem>
                  <SelectItem value="az">A-Z</SelectItem>
                  <SelectItem value="za">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            {clinicalTrials.map((trial) => (
              <ClinicalTrialCard key={trial.id} trial={trial} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Trials</Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Trials Near You</CardTitle>
              <CardDescription>Search for trials by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Input placeholder="Enter city or zip code" className="pl-10" />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button className="w-full">Search Location</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter by Focus Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="cursor-pointer">Mental Health</Badge>
                <Badge className="cursor-pointer">HIV/AIDS</Badge>
                <Badge className="cursor-pointer">Gender-Affirming Care</Badge>
                <Badge className="cursor-pointer">Sexual Health</Badge>
                <Badge className="cursor-pointer">Substance Use</Badge>
                <Badge className="cursor-pointer">Aging</Badge>
                <Badge className="cursor-pointer">Youth</Badge>
                <Badge className="cursor-pointer">Family Planning</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Participate?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Advance Knowledge</span>
                    <p className="text-muted-foreground">Help researchers better understand LGBTQA+ health needs</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Access Treatments</span>
                    <p className="text-muted-foreground">Potential access to new treatments or interventions</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Compensation</span>
                    <p className="text-muted-foreground">Many studies offer compensation for your time</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Community Impact</span>
                    <p className="text-muted-foreground">Help improve health outcomes for the entire community</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const clinicalTrials = [
  {
    id: 1,
    title: "Mental Health Interventions for LGBTQ+ Youth",
    status: "Recruiting",
    phase: "Phase 2",
    focus: "Mental Health",
    description:
      "This study evaluates the effectiveness of a specialized cognitive-behavioral therapy program designed for LGBTQ+ youth experiencing depression and anxiety.",
    locations: [
      "University of California, San Francisco",
      "Boston Children's Hospital",
      "Children's National Hospital, Washington DC",
    ],
    eligibility: "LGBTQ+ youth ages 14-24 experiencing symptoms of depression or anxiety",
    startDate: "January 2023",
    endDate: "December 2024",
    contactEmail: "lgbtqyouthstudy@ucsf.edu",
    contactPhone: "(415) 555-7890",
  },
  {
    id: 2,
    title: "Gender-Affirming Hormone Therapy Outcomes Study",
    status: "Active",
    phase: "Phase 3",
    focus: "Gender-Affirming Care",
    description:
      "A longitudinal study examining the physical and psychological outcomes of gender-affirming hormone therapy in transgender and non-binary adults.",
    locations: ["NYU Langone Medical Center", "Fenway Health, Boston", "Howard Brown Health Center, Chicago"],
    eligibility: "Transgender and non-binary adults ages 18+ starting or currently on hormone therapy",
    startDate: "March 2022",
    endDate: "March 2027",
    contactEmail: "gaht.study@nyulangone.org",
    contactPhone: "(212) 555-1234",
  },
  {
    id: 3,
    title: "PrEP Adherence Strategies for LGBTQ+ Communities",
    status: "Recruiting",
    phase: "Phase 2",
    focus: "HIV Prevention",
    description:
      "This study tests different support strategies to improve adherence to Pre-Exposure Prophylaxis (PrEP) among high-risk LGBTQ+ populations.",
    locations: ["University of Washington, Seattle", "Emory University, Atlanta", "University of Miami"],
    eligibility: "LGBTQ+ individuals ages 18+ who are eligible for PrEP",
    startDate: "September 2023",
    contactEmail: "prep.strategies@uw.edu",
    contactPhone: "(206) 555-6789",
  },
  {
    id: 4,
    title: "Minority Stress and Cardiovascular Health in Lesbian and Bisexual Women",
    status: "Recruiting",
    phase: "Observational",
    focus: "Cardiovascular Health",
    description:
      "This study examines the relationship between minority stress experiences and cardiovascular health outcomes in lesbian and bisexual women.",
    locations: ["Mayo Clinic, Rochester", "UCLA Medical Center", "University of Pittsburgh Medical Center"],
    eligibility: "Lesbian and bisexual women ages 30-65 with no history of cardiovascular disease",
    startDate: "May 2023",
    endDate: "May 2025",
    contactEmail: "lbwomen.heart@mayo.edu",
    contactPhone: "(507) 555-4321",
  },
  {
    id: 5,
    title: "Aging with Pride: Health Interventions for LGBTQ+ Older Adults",
    status: "Active",
    phase: "Phase 2",
    focus: "Aging",
    description:
      "A clinical trial testing a multi-component intervention designed to address the unique health needs of LGBTQ+ older adults, including social isolation, healthcare access, and chronic disease management.",
    locations: ["University of Washington, Seattle", "UCSF Medical Center", "Rush University Medical Center, Chicago"],
    eligibility: "LGBTQ+ adults ages 60+ with at least one chronic health condition",
    startDate: "January 2022",
    endDate: "December 2024",
    contactEmail: "agingwithpride@uw.edu",
    contactPhone: "(206) 555-9876",
  },
  {
    id: 6,
    title: "Family Building Options for LGBTQ+ Individuals and Couples",
    status: "Recruiting",
    phase: "Observational",
    focus: "Reproductive Health",
    description:
      "This study examines experiences, outcomes, and satisfaction with various family building options among LGBTQ+ individuals and couples, including adoption, surrogacy, and assisted reproductive technologies.",
    locations: ["Cornell University Medical Center, New York", "University of California, San Francisco", "Boston IVF"],
    eligibility: "LGBTQ+ individuals and couples ages 18-45 considering or pursuing family building",
    startDate: "April 2023",
    endDate: "April 2026",
    contactEmail: "lgbtq.family.study@cornell.edu",
    contactPhone: "(212) 555-5678",
  },
]

