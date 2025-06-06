import Link from "next/link"
import { BookOpen, ExternalLink, FileText, Video, Database, Presentation } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function ResearchResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Research Resources</h1>
        <p className="text-muted-foreground">Tools, datasets, and educational materials to support LGBTQA+ research</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input placeholder="Search resources..." className="pl-10" />
          <ExternalLink className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue="tools" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="tools">Research Tools</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="methods">Methodologies</TabsTrigger>
          <TabsTrigger value="education">Educational</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchTools.map((tool, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {getToolIcon(tool.type)}
                      <span className="ml-2">{tool.name}</span>
                    </CardTitle>
                    <Badge variant="outline">{tool.type}</Badge>
                  </div>
                  <CardDescription>{tool.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{tool.description}</p>
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Access:</span>
                      <span className={tool.access === "Free" ? "text-green-600" : ""}>{tool.access}</span>
                    </div>
                    {tool.compatibility && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Compatibility:</span> {tool.compatibility}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/research/resources/tools/${index + 1}`}>Access Tool</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    <Badge variant="outline">{dataset.type}</Badge>
                  </div>
                  <CardDescription>{dataset.source}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{dataset.description}</p>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sample Size:</span> {dataset.sampleSize}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Year:</span> {dataset.year}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Format:</span> {dataset.format}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">License:</span> {dataset.license}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/research/resources/datasets/${index + 1}`}>Access Dataset</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methods" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologies.map((method, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                  <CardDescription>{method.approach}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{method.description}</p>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Best For:</span> {method.bestFor}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Complexity:</span> {method.complexity}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {method.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/research/resources/methods/${index + 1}`}>View Methodology Guide</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalResources.map((resource, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {getResourceIcon(resource.format)}
                      <span className="ml-2">{resource.title}</span>
                    </CardTitle>
                    <Badge variant="outline">{resource.format}</Badge>
                  </div>
                  <CardDescription>{resource.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{resource.description}</p>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Level:</span> {resource.level}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Duration:</span> {resource.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Access:</span>
                      <span className={resource.access === "Free" ? "text-green-600" : ""}>{resource.access}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/research/resources/education/${index + 1}`}>Access Resource</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getToolIcon(type: string) {
  switch (type) {
    case "Survey":
      return <FileText className="h-5 w-5" />
    case "Analysis":
      return <Database className="h-5 w-5" />
    case "Visualization":
      return <Presentation className="h-5 w-5" />
    default:
      return <BookOpen className="h-5 w-5" />
  }
}

function getResourceIcon(format: string) {
  switch (format) {
    case "Video":
      return <Video className="h-5 w-5" />
    case "PDF":
      return <FileText className="h-5 w-5" />
    case "Course":
      return <BookOpen className="h-5 w-5" />
    default:
      return <ExternalLink className="h-5 w-5" />
  }
}

const researchTools = [
  {
    name: "LGBTQ+ Survey Builder",
    provider: "Queer Research Collective",
    type: "Survey",
    description:
      "A specialized survey tool with inclusive question templates and language guidelines for LGBTQ+ research.",
    access: "Free",
    compatibility: "Web-based, mobile-friendly",
  },
  {
    name: "Gender & Sexuality Data Analyzer",
    provider: "Inclusive Research Tools",
    type: "Analysis",
    description:
      "Statistical analysis software specifically designed for analyzing gender and sexuality data with appropriate categories and variables.",
    access: "Subscription ($15/month, free for students)",
    compatibility: "Windows, Mac, Linux",
  },
  {
    name: "Intersectionality Visualization Tool",
    provider: "Diversity in Research Initiative",
    type: "Visualization",
    description:
      "Create interactive visualizations that highlight intersectional experiences and outcomes in LGBTQ+ communities.",
    access: "Free with registration",
    compatibility: "Web-based",
  },
  {
    name: "Inclusive Language Checker",
    provider: "LGBTQ+ Research Alliance",
    type: "Writing",
    description:
      "A tool that reviews research writing for inclusive and affirming language related to LGBTQ+ identities and experiences.",
    access: "Free",
    compatibility: "Browser extension, Word plugin",
  },
  {
    name: "Community-Based Research Toolkit",
    provider: "Participatory Research Network",
    type: "Methodology",
    description:
      "A comprehensive toolkit for conducting community-based participatory research with LGBTQ+ communities.",
    access: "Free",
    compatibility: "PDF download with supplementary materials",
  },
  {
    name: "Queer Theory Citation Manager",
    provider: "Critical Studies Consortium",
    type: "Reference",
    description:
      "A specialized citation manager with a curated database of queer theory and LGBTQ+ studies publications.",
    access: "Subscription ($10/month, free for students)",
    compatibility: "Web-based, desktop application",
  },
]

const datasets = [
  {
    name: "National LGBTQ+ Health Survey",
    source: "Center for LGBTQ+ Health Research",
    type: "Health Data",
    description:
      "Comprehensive health data from a nationally representative sample of LGBTQ+ individuals, including physical and mental health outcomes.",
    sampleSize: "15,000 participants",
    year: "2020-2022",
    format: "CSV, SPSS, Stata",
    license: "CC BY-NC 4.0",
  },
  {
    name: "Transgender Experience Longitudinal Study",
    source: "Gender Identity Research Consortium",
    type: "Longitudinal",
    description:
      "A 5-year longitudinal study tracking experiences, health outcomes, and quality of life for transgender and non-binary individuals.",
    sampleSize: "3,200 participants",
    year: "2018-2023",
    format: "CSV, R data files",
    license: "Research use with attribution",
  },
  {
    name: "LGBTQ+ Youth in Schools Dataset",
    source: "Educational Equity Institute",
    type: "Education",
    description:
      "Data on experiences, outcomes, and support systems for LGBTQ+ youth in K-12 educational settings across multiple states.",
    sampleSize: "8,500 students, 1,200 educators",
    year: "2021",
    format: "CSV, Excel, SPSS",
    license: "CC BY 4.0",
  },
  {
    name: "Global LGBTQ+ Rights Index",
    source: "International Equality Foundation",
    type: "Policy & Legal",
    description:
      "Comprehensive dataset on legal protections, policies, and social acceptance of LGBTQ+ people across 195 countries.",
    sampleSize: "195 countries",
    year: "2023 (updated annually)",
    format: "CSV, JSON, interactive database",
    license: "Open Data Commons",
  },
  {
    name: "Queer Families Census",
    source: "Family Diversity Research Center",
    type: "Demographic",
    description:
      "Demographic data on LGBTQ+ families, including family formation, parenting experiences, and outcomes for children.",
    sampleSize: "5,800 families",
    year: "2019-2020",
    format: "CSV, SPSS",
    license: "Research use with approval",
  },
  {
    name: "LGBTQ+ Workplace Experiences",
    source: "Workplace Equity Project",
    type: "Employment",
    description:
      "Data on workplace experiences, discrimination, policies, and outcomes for LGBTQ+ employees across various industries.",
    sampleSize: "12,000 participants, 500 companies",
    year: "2022",
    format: "CSV, Excel, Tableau data extract",
    license: "CC BY-NC-SA 4.0",
  },
]

const methodologies = [
  {
    name: "Community-Based Participatory Research for LGBTQ+ Communities",
    approach: "Participatory",
    description:
      "A methodology that actively involves community members in all phases of the research process, from question development to dissemination.",
    bestFor: "Projects seeking to address community-identified needs and ensure research benefits the community",
    complexity: "High",
    tags: ["participatory", "community-centered", "collaborative", "ethical"],
  },
  {
    name: "Intersectional Analysis Framework",
    approach: "Analytical",
    description:
      "A framework for analyzing how multiple identities and forms of discrimination overlap and interact in LGBTQ+ experiences.",
    bestFor: "Research examining disparities and diverse experiences within LGBTQ+ communities",
    complexity: "Medium",
    tags: ["intersectionality", "critical theory", "qualitative", "quantitative"],
  },
  {
    name: "Narrative Inquiry for LGBTQ+ Life Stories",
    approach: "Qualitative",
    description:
      "Methods for collecting, analyzing, and presenting personal narratives and life stories of LGBTQ+ individuals.",
    bestFor: "Understanding lived experiences, identity development, and personal journeys",
    complexity: "Medium",
    tags: ["storytelling", "qualitative", "interviews", "life history"],
  },
  {
    name: "Inclusive Survey Design for Gender and Sexuality",
    approach: "Quantitative",
    description:
      "Guidelines and best practices for creating surveys that accurately and respectfully capture gender identity, sexual orientation, and related experiences.",
    bestFor: "Large-scale data collection on LGBTQ+ populations",
    complexity: "Low to Medium",
    tags: ["survey", "quantitative", "inclusive language", "measurement"],
  },
  {
    name: "Mixed Methods for LGBTQ+ Health Research",
    approach: "Mixed",
    description:
      "Approaches that combine qualitative and quantitative methods to provide comprehensive understanding of LGBTQ+ health issues.",
    bestFor: "Health disparities research, intervention development and evaluation",
    complexity: "High",
    tags: ["mixed methods", "health", "integration", "comprehensive"],
  },
  {
    name: "Photovoice and Visual Methods",
    approach: "Participatory Visual",
    description:
      "Methodology that puts cameras in the hands of community members to document their realities and spark dialogue about important issues.",
    bestFor: "Community engagement, advocacy, and capturing lived experiences visually",
    complexity: "Medium",
    tags: ["visual", "participatory", "advocacy", "empowerment"],
  },
]

const educationalResources = [
  {
    title: "Introduction to LGBTQ+ Research Methods",
    author: "Dr. Jamie Rodriguez, University of California",
    format: "Course",
    description:
      "A comprehensive introduction to research methods specifically tailored for LGBTQ+ studies, covering ethical considerations, inclusive practices, and methodological approaches.",
    level: "Beginner",
    duration: "8 weeks, self-paced",
    access: "Free",
  },
  {
    title: "Analyzing Gender and Sexuality Data: Advanced Techniques",
    author: "Statistical Approaches for Inclusive Research",
    format: "Video",
    description:
      "A series of video tutorials on advanced statistical techniques for analyzing data related to gender identity and sexual orientation.",
    level: "Advanced",
    duration: "12 hours total",
    access: "Subscription ($25/month)",
  },
  {
    title: "Ethical Guidelines for Research with LGBTQ+ Participants",
    author: "Research Ethics Consortium",
    format: "PDF",
    description:
      "Comprehensive guidelines for conducting ethical research with LGBTQ+ participants, including consent processes, privacy considerations, and community engagement.",
    level: "All levels",
    duration: "Self-paced reading",
    access: "Free",
  },
  {
    title: "Intersectionality in LGBTQ+ Research: Theory and Practice",
    author: "Dr. Alex Chen, Columbia University",
    format: "Webinar",
    description:
      "A recorded webinar exploring how to apply intersectional frameworks in research design, analysis, and interpretation.",
    level: "Intermediate",
    duration: "2 hours",
    access: "Free",
  },
  {
    title: "Writing and Publishing LGBTQ+ Research",
    author: "Academic Publishing Alliance",
    format: "Course",
    description:
      "A course on effectively writing and publishing research on LGBTQ+ topics, including journal selection, responding to reviewers, and navigating potential biases.",
    level: "Graduate students and researchers",
    duration: "4 weeks",
    access: "Free with institutional affiliation",
  },
  {
    title: "Community-Based Participatory Research with LGBTQ+ Communities",
    author: "Participatory Research Network",
    format: "Toolkit",
    description:
      "A comprehensive toolkit with guides, templates, and case studies for conducting community-based participatory research with LGBTQ+ communities.",
    level: "Intermediate to Advanced",
    duration: "Self-paced",
    access: "Free",
  },
]

