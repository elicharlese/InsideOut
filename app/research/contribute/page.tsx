import Link from "next/link"
import { ArrowRight, BookOpen, FileText, Users, Microscope, DollarSign, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contribute to Research</h1>
        <p className="text-muted-foreground">
          Help advance LGBTQA+ research through submissions, participation, and collaboration
        </p>
      </div>

      <Tabs defaultValue="submit" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="submit">Submit Research</TabsTrigger>
          <TabsTrigger value="participate">Participate</TabsTrigger>
          <TabsTrigger value="fund">Funding</TabsTrigger>
          <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="pt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Submission Guidelines
                </CardTitle>
                <CardDescription>Learn how to submit your research for publication on InsideOut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    We welcome submissions from researchers, academics, and community members on topics related to
                    LGBTQA+ health, social issues, legal matters, and more. All submissions undergo a peer review
                    process to ensure quality and accuracy.
                  </p>

                  <h3 className="font-medium text-lg">Submission Requirements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Original research not published elsewhere</li>
                    <li>Clear relevance to LGBTQA+ communities</li>
                    <li>Adherence to ethical research standards</li>
                    <li>Proper citations and references</li>
                    <li>Abstract, keywords, and author information</li>
                  </ul>

                  <h3 className="font-medium text-lg">Submission Process</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Create an account or log in</li>
                    <li>Complete the submission form</li>
                    <li>Upload your manuscript and any supplementary materials</li>
                    <li>Track your submission status in your account dashboard</li>
                    <li>Respond to reviewer feedback if requested</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/research/contribute/submit">
                    Submit Your Research <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Publication Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Original Research</span>
                        <p className="text-sm text-muted-foreground">
                          Empirical studies with methods, results, and discussion
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Review Articles</span>
                        <p className="text-sm text-muted-foreground">Comprehensive analysis of existing research</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Case Studies</span>
                        <p className="text-sm text-muted-foreground">
                          In-depth analysis of specific cases or interventions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Commentaries</span>
                        <p className="text-sm text-muted-foreground">Expert opinions on current issues and research</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Microscope className="h-5 w-5 mr-2" />
                    Research Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Health & Wellbeing</span>
                        <p className="text-sm text-muted-foreground">Physical and mental health research</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Social & Community</span>
                        <p className="text-sm text-muted-foreground">
                          Social dynamics, support systems, and community resources
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Legal & Policy</span>
                        <p className="text-sm text-muted-foreground">Rights, protections, and policy analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Education & Development</span>
                        <p className="text-sm text-muted-foreground">
                          Educational experiences and developmental research
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="participate" className="pt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Research Participation Opportunities
                </CardTitle>
                <CardDescription>Contribute to LGBTQA+ research by participating in studies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Your participation in research studies helps advance our understanding of LGBTQA+ experiences, needs,
                  and effective interventions. Browse current opportunities below.
                </p>

                <div className="space-y-6">
                  {participationOpportunities.map((opportunity, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <CardDescription>{opportunity.institution}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm mb-2">{opportunity.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Format:</span> {opportunity.format}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {opportunity.time}
                          </div>
                          <div>
                            <span className="font-medium">Compensation:</span> {opportunity.compensation}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span> {opportunity.deadline}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/research/participate/${index + 1}`}>View Details & Sign Up</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View All Participation Opportunities</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fund" className="pt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Research Funding Opportunities
                </CardTitle>
                <CardDescription>Find grants and funding for LGBTQA+ research projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Discover funding opportunities to support your LGBTQA+ research initiatives. These grants and
                  fellowships are specifically focused on advancing knowledge in LGBTQA+ health, social issues, and
                  more.
                </p>

                <div className="space-y-6">
                  {fundingOpportunities.map((opportunity, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <CardDescription>{opportunity.organization}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm mb-2">{opportunity.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Amount:</span> {opportunity.amount}
                          </div>
                          <div>
                            <span className="font-medium">Eligibility:</span> {opportunity.eligibility}
                          </div>
                          <div>
                            <span className="font-medium">Focus Areas:</span> {opportunity.focusAreas}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span> {opportunity.deadline}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/research/funding/${index + 1}`}>View Application Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View All Funding Opportunities</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collaborate" className="pt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Research Collaboration Opportunities
                </CardTitle>
                <CardDescription>
                  Connect with other researchers and institutions for collaborative projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Collaboration strengthens research and expands its impact. Find potential research partners or join
                  existing projects focused on LGBTQA+ issues.
                </p>

                <div className="space-y-6">
                  {collaborationOpportunities.map((opportunity, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <CardDescription>{opportunity.institution}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm mb-2">{opportunity.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Seeking:</span> {opportunity.seeking}
                          </div>
                          <div>
                            <span className="font-medium">Timeline:</span> {opportunity.timeline}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {opportunity.location}
                          </div>
                          <div>
                            <span className="font-medium">Contact:</span> {opportunity.contact}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/research/collaborate/${index + 1}`}>Express Interest</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View All Collaboration Opportunities</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const participationOpportunities = [
  {
    title: "LGBTQ+ Mental Health and Resilience Study",
    institution: "University of California, San Francisco",
    description:
      "This study examines factors that contribute to resilience and positive mental health outcomes in LGBTQ+ adults.",
    format: "Online survey and optional video interview",
    time: "30-45 minutes",
    compensation: "$25 gift card",
    deadline: "December 15, 2023",
  },
  {
    title: "Gender-Affirming Care Access and Outcomes Study",
    institution: "Boston University School of Public Health",
    description:
      "This research examines access to gender-affirming care and its impact on quality of life for transgender and non-binary individuals.",
    format: "In-person or virtual interviews",
    time: "60-90 minutes",
    compensation: "$50 compensation",
    deadline: "Ongoing",
  },
  {
    title: "LGBTQ+ Family Formation Experiences",
    institution: "University of Michigan",
    description:
      "Share your experiences with family formation, including adoption, surrogacy, or assisted reproduction as an LGBTQ+ individual or couple.",
    format: "Online survey with optional follow-up interview",
    time: "20-30 minutes (survey), 45-60 minutes (interview)",
    compensation: "Entry into $100 gift card drawing",
    deadline: "January 31, 2024",
  },
]

const fundingOpportunities = [
  {
    title: "LGBTQ+ Health Equity Research Grant",
    organization: "National Institutes of Health (NIH)",
    description:
      "Funding for research addressing health disparities and improving healthcare access for LGBTQ+ populations.",
    amount: "$50,000 - $200,000",
    eligibility: "PhD researchers and institutions",
    focusAreas: "Health disparities, access to care, interventions",
    deadline: "March 15, 2024",
  },
  {
    title: "Rainbow Research Fellowship",
    organization: "Pride Foundation",
    description: "Support for early-career researchers studying LGBTQ+ social issues and community needs.",
    amount: "$25,000",
    eligibility: "Graduate students and postdoctoral researchers",
    focusAreas: "Social sciences, community-based research",
    deadline: "February 1, 2024",
  },
  {
    title: "Transgender Health Research Initiative",
    organization: "Gender Spectrum Research Consortium",
    description: "Funding specifically for research on transgender and non-binary health needs and interventions.",
    amount: "$75,000 - $150,000",
    eligibility: "Researchers with institutional affiliation",
    focusAreas: "Transgender healthcare, mental health, social determinants",
    deadline: "April 30, 2024",
  },
]

const collaborationOpportunities = [
  {
    title: "LGBTQ+ Youth Homelessness Prevention Initiative",
    institution: "Center for LGBTQ+ Youth Studies",
    description: "Seeking partners for a multi-site study on interventions to prevent homelessness among LGBTQ+ youth.",
    seeking: "Community organizations, social service providers, researchers",
    timeline: "2-year project starting June 2024",
    location: "Multiple sites across the US",
    contact: "Dr. Jamie Rodriguez (j.rodriguez@lgbtqyouth.org)",
  },
  {
    title: "International LGBTQ+ Rights Comparative Analysis",
    institution: "Global Equality Institute",
    description: "Collaborative project comparing legal protections and social acceptance across different countries.",
    seeking: "Legal scholars, policy analysts, international partners",
    timeline: "18-month project starting September 2024",
    location: "Remote collaboration with quarterly virtual meetings",
    contact: "Prof. Alex Chen (a.chen@globalequality.org)",
  },
  {
    title: "LGBTQ+ Inclusive Healthcare Training Development",
    institution: "Healthcare Equality Foundation",
    description: "Developing and evaluating training programs for healthcare providers on LGBTQ+ inclusive care.",
    seeking: "Medical educators, healthcare providers, instructional designers",
    timeline: "1-year project with potential extension",
    location: "Hybrid (some in-person workshops required)",
    contact: "Dr. Sam Taylor (s.taylor@healthcareequality.org)",
  },
]

