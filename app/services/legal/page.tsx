import { ServiceCategoryLayout } from "@/components/service-category-layout"
import { ServiceCard } from "@/components/service-card"

export default function LegalSupportPage() {
  // In a real app, this data would come from a database or API
  const legalServices = [
    {
      id: "legal-1",
      name: "Quinn & Associates",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Name & Gender Marker Changes",
      description:
        "Specialized legal support for name changes and gender marker updates on official documents, with a streamlined process for LGBTQ+ clients.",
      rating: 4.9,
      reviewCount: 87,
      price: "$200-500 / service",
      location: "Virtual & In-Person",
      availability: "Mon-Fri, 9am-5pm",
      tags: ["Name Change", "Gender Marker", "Documentation", "Identity"],
      category: "legal",
    },
    {
      id: "legal-2",
      name: "Justice Collective",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Discrimination & Employment Law",
      description:
        "Fighting workplace discrimination and harassment based on sexual orientation and gender identity with a team of dedicated civil rights attorneys.",
      rating: 4.8,
      reviewCount: 64,
      price: "Contingency & Sliding Scale",
      location: "Virtual & In-Person",
      availability: "Weekdays, Flexible hours",
      tags: ["Workplace", "Discrimination", "Harassment", "Civil Rights"],
      category: "legal",
    },
    {
      id: "legal-3",
      name: "Family First Legal",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Family Formation & Adoption",
      description:
        "Helping LGBTQ+ individuals and couples navigate adoption, surrogacy, and other family formation legal processes with compassion and expertise.",
      rating: 5.0,
      reviewCount: 42,
      price: "$250-400 / hour",
      location: "Virtual & In-Person",
      availability: "By Appointment",
      tags: ["Adoption", "Surrogacy", "Family Law", "Parental Rights"],
      category: "legal",
    },
    {
      id: "legal-4",
      name: "Trans Legal Defense",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Transgender Rights",
      description:
        "Dedicated legal advocacy for transgender and non-binary individuals facing discrimination in healthcare, housing, and public accommodations.",
      rating: 4.9,
      reviewCount: 56,
      price: "Pro Bono & Sliding Scale",
      location: "Virtual Only",
      availability: "Flexible Schedule",
      tags: ["Trans Rights", "Healthcare Access", "Housing", "Advocacy"],
      category: "legal",
    },
    {
      id: "legal-5",
      name: "Equality Law Group",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Immigration & Asylum",
      description:
        "Specialized legal support for LGBTQ+ immigrants and asylum seekers fleeing persecution based on sexual orientation or gender identity.",
      rating: 4.7,
      reviewCount: 38,
      price: "Sliding Scale Available",
      location: "Virtual & In-Person",
      availability: "Mon-Fri, Interpreters Available",
      tags: ["Immigration", "Asylum", "International", "Refugee Status"],
      category: "legal",
    },
    {
      id: "legal-6",
      name: "Elder Pride Legal",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Estate Planning & Elder Law",
      description:
        "Comprehensive estate planning, healthcare directives, and elder law services tailored to the unique needs of LGBTQ+ seniors.",
      rating: 4.8,
      reviewCount: 71,
      price: "$175-350 / hour",
      location: "In-Person & Home Visits",
      availability: "Weekdays, Senior-friendly hours",
      tags: ["Estate Planning", "Wills", "Healthcare Directives", "Elder Care"],
      category: "legal",
    },
  ]

  return (
    <ServiceCategoryLayout
      title="LGBTQ+ Legal Support"
      description="Connect with legal professionals who specialize in the unique legal needs and challenges faced by the LGBTQ+ community."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {legalServices.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </ServiceCategoryLayout>
  )
}

