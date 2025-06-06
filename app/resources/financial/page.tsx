import Link from "next/link"
import { ArrowRight, Calculator, Calendar, DollarSign, FileText, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FinancialResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Financial Resources</h1>
        <p className="text-muted-foreground">Support for your financial journey and transition-related expenses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="grants" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="grants">Grants & Scholarships</TabsTrigger>
              <TabsTrigger value="loans">Loans & Financing</TabsTrigger>
              <TabsTrigger value="insurance">Insurance Information</TabsTrigger>
            </TabsList>
            <TabsContent value="grants">
              <Card>
                <CardHeader>
                  <CardTitle>Grants & Scholarships</CardTitle>
                  <CardDescription>Financial assistance that doesn't need to be repaid</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {grants.map((grant) => (
                      <div key={grant.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{grant.name}</h3>
                          <div className="bg-primary/10 text-primary text-sm px-2 py-1 rounded">{grant.type}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{grant.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount:</span> {grant.amount}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Deadline:</span> {grant.deadline}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Eligibility:</span> {grant.eligibility}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Application:</span> {grant.application}
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={grant.link}>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="loans">
              <Card>
                <CardHeader>
                  <CardTitle>Loans & Financing</CardTitle>
                  <CardDescription>Options for financing transition-related expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {loans.map((loan) => (
                      <div key={loan.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{loan.name}</h3>
                          <div className="bg-primary/10 text-primary text-sm px-2 py-1 rounded">{loan.type}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{loan.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount:</span> {loan.amount}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Interest Rate:</span> {loan.interestRate}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Term:</span> {loan.term}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Requirements:</span> {loan.requirements}
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={loan.link}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="insurance">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                  <CardDescription>Understanding coverage for transition-related care</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        What transition-related care is typically covered by insurance?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Coverage varies widely by insurance provider and plan, but may include:</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Hormone therapy</li>
                          <li>Mental health services</li>
                          <li>Gender-affirming surgeries (with pre-authorization)</li>
                          <li>Lab work and monitoring</li>
                        </ul>
                        <p className="mt-2 text-sm">
                          Always check with your specific insurance provider for details about your coverage.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I appeal an insurance denial?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">If your insurance denies coverage for transition-related care:</p>
                        <ol className="list-decimal pl-6 space-y-1 text-sm">
                          <li>Request the denial in writing with the specific reason</li>
                          <li>Review your policy for covered services</li>
                          <li>Gather supporting documentation from your healthcare providers</li>
                          <li>Submit a formal appeal within the timeframe specified by your insurer</li>
                          <li>Consider seeking assistance from a patient advocate or legal resource</li>
                        </ol>
                        <Button size="sm" className="mt-4" asChild>
                          <Link href="/resources/legal/insurance-appeals">Insurance Appeals Guide</Link>
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What are my options if I don't have insurance?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">If you don't have insurance, consider these options:</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Community health centers with sliding scale fees</li>
                          <li>Patient assistance programs from pharmaceutical companies</li>
                          <li>State Medicaid programs (eligibility varies by state)</li>
                          <li>Healthcare marketplace plans (with potential subsidies)</li>
                          <li>Nonprofit organizations offering financial assistance</li>
                        </ul>
                        <Button size="sm" className="mt-4" asChild>
                          <Link href="/resources/financial/uninsured-options">Resources for Uninsured</Link>
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Financial Planning Resources</CardTitle>
              <CardDescription>Tools and guides to help you plan for transition-related expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Calculator className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">Transition Expense Calculator</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Estimate the costs of various transition-related expenses and create a personalized savings plan.
                  </p>
                  <Button asChild>
                    <Link href="/resources/financial/calculator">Use Calculator</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">Financial Planning Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive guide to budgeting, saving, and planning for transition-related expenses.
                  </p>
                  <Button asChild>
                    <Link href="/resources/financial/planning-guide">Download Guide</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">Fundraising Resources</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tips and platforms for crowdfunding transition-related expenses with sample campaigns.
                  </p>
                  <Button asChild>
                    <Link href="/resources/financial/fundraising">View Resources</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">Financial Counseling</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a session with a financial counselor who understands LGBTQA+ specific needs.
                  </p>
                  <Button asChild>
                    <Link href="/services/book/financial-counseling">Book Session</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Assistance Application</CardTitle>
              <CardDescription>Apply for help with transition-related expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Our financial assistance program helps cover costs related to transition, healthcare, housing, and more.
              </p>
              <Button className="w-full" asChild>
                <Link href="/resources/financial/apply">Apply Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm">Financial Planning for Transition</h3>
                  <p className="text-xs text-muted-foreground mb-2">April 15, 2023 • 6:00 PM • Virtual</p>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/events/financial-planning-workshop">Register</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm">Insurance Navigation Workshop</h3>
                  <p className="text-xs text-muted-foreground mb-2">April 22, 2023 • 5:30 PM • Virtual</p>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/events/insurance-workshop">Register</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-sm">Debt Management Strategies</h3>
                  <p className="text-xs text-muted-foreground mb-2">May 5, 2023 • 7:00 PM • Virtual</p>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/events/debt-management-workshop">Register</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Have questions about financial resources or need personalized assistance?</p>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/support/financial">
                    <HelpCircle className="mr-2 h-4 w-4" /> Speak with a Financial Advisor
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/resources/financial/faq">Frequently Asked Questions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const grants = [
  {
    id: 1,
    name: "Transition Support Fund",
    type: "Healthcare Grant",
    description:
      "Financial assistance for gender-affirming surgeries, hormone therapy, and related healthcare expenses.",
    amount: "$500 - $5,000",
    deadline: "Rolling applications",
    eligibility: "LGBTQA+ individuals with demonstrated financial need",
    application: "Online application with supporting documentation",
    link: "/resources/financial/apply/transition-fund",
  },
  {
    id: 2,
    name: "Emergency Relief Grant",
    type: "Crisis Assistance",
    description:
      "Immediate financial support for LGBTQA+ individuals facing housing insecurity, medical emergencies, or other crises.",
    amount: "Up to $1,000",
    deadline: "Ongoing",
    eligibility: "LGBTQA+ individuals in crisis situations",
    application: "Expedited application process",
    link: "/resources/financial/apply/emergency-relief",
  },
  {
    id: 3,
    name: "Education Scholarship",
    type: "Academic Scholarship",
    description: "Financial support for LGBTQA+ students pursuing higher education in any field of study.",
    amount: "$2,500 per academic year",
    deadline: "March 31 and September 30",
    eligibility: "LGBTQA+ students enrolled in accredited institutions",
    application: "Application with essays and recommendations",
    link: "/resources/financial/apply/education-scholarship",
  },
]

const loans = [
  {
    id: 1,
    name: "Affirming Care Loan Program",
    type: "Healthcare Financing",
    description: "Low-interest loans specifically for gender-affirming surgeries and related procedures.",
    amount: "$5,000 - $30,000",
    interestRate: "5-8% APR",
    term: "3-7 years",
    requirements: "Credit score 600+, income verification",
    link: "/resources/financial/loans/affirming-care",
  },
  {
    id: 2,
    name: "Community Credit Union Partnership",
    type: "Personal Loan",
    description: "Personal loans with flexible terms through our partnership with LGBTQA+ friendly credit unions.",
    amount: "$1,000 - $15,000",
    interestRate: "7-12% APR",
    term: "1-5 years",
    requirements: "Membership in partner credit union",
    link: "/resources/financial/loans/credit-union",
  },
  {
    id: 3,
    name: "Relocation Assistance Loan",
    type: "Housing Loan",
    description: "Financing for relocation expenses to move to a more affirming community or safer environment.",
    amount: "$2,000 - $7,500",
    interestRate: "6-9% APR",
    term: "1-3 years",
    requirements: "Proof of new housing arrangement",
    link: "/resources/financial/loans/relocation",
  },
]

