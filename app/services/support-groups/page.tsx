import { ServiceCategoryLayout } from "@/components/service-category-layout"
import { ServiceCard } from "@/components/service-card"

export default function SupportGroupsPage() {
  // In a real app, this data would come from a database or API
  const supportGroups = [
    {
      id: "group-1",
      name: "Coming Out Circle",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Coming Out Support",
      description:
        "A safe, confidential space for individuals at any stage of the coming out process to share experiences and receive support from peers and facilitators.",
      rating: 4.9,
      reviewCount: 87,
      price: "Free (Donations Welcome)",
      location: "Virtual & In-Person",
      availability: "Weekly, Tuesday Evenings",
      tags: ["Coming Out", "Identity", "Peer Support", "All Ages"],
      category: "support-groups",
    },
    {
      id: "group-2",
      name: "Trans Connection",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Transgender & Non-Binary Support",
      description:
        "Supportive community for transgender, non-binary, and gender-questioning individuals to discuss transition, identity, and daily challenges.",
      rating: 5.0,
      reviewCount: 64,
      price: "Free",
      location: "Virtual & In-Person",
      availability: "Bi-weekly, Saturday Afternoons",
      tags: ["Transgender", "Non-Binary", "Transition", "Gender Identity"],
      category: "support-groups",
    },
    {
      id: "group-3",
      name: "Rainbow Families",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "LGBTQ+ Parents & Families",
      description:
        "Support group for LGBTQ+ parents, prospective parents, and their children to connect, share resources, and build community.",
      rating: 4.8,
      reviewCount: 42,
      price: "Free (Activity Fees May Apply)",
      location: "In-Person Only",
      availability: "Monthly, Family-Friendly Hours",
      tags: ["Parents", "Children", "Families", "Parenting"],
      category: "support-groups",
    },
    {
      id: "group-4",
      name: "Proud Seniors",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "LGBTQ+ Elders (55+)",
      description:
        "Community group for LGBTQ+ seniors to combat isolation, share life experiences, and access age-specific resources and support.",
      rating: 4.9,
      reviewCount: 56,
      price: "Free",
      location: "Virtual & In-Person",
      availability: "Weekly, Daytime Hours",
      tags: ["Seniors", "Elders", "Aging", "Community"],
      category: "support-groups",
    },
    {
      id: "group-5",
      name: "Spectrum Youth",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "LGBTQ+ Youth (13-24)",
      description:
        "A supportive environment for LGBTQ+ youth to connect with peers, access resources, and develop leadership skills in a safe, affirming space.",
      rating: 4.7,
      reviewCount: 78,
      price: "Free",
      location: "Virtual & In-Person",
      availability: "Weekly, After School & Weekends",
      tags: ["Youth", "Teens", "Young Adults", "Peer Support"],
      category: "support-groups",
    },
    {
      id: "group-6",
      name: "Bi/Pan Alliance",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Bisexual & Pansexual Support",
      description:
        "Discussion and support group addressing the unique experiences and challenges of bisexual, pansexual, and fluid-identifying individuals.",
      rating: 4.8,
      reviewCount: 39,
      price: "Free",
      location: "Virtual Only",
      availability: "Bi-weekly, Evening Hours",
      tags: ["Bisexual", "Pansexual", "Fluid", "Visibility"],
      category: "support-groups",
    },
  ]

  return (
    <ServiceCategoryLayout
      title="LGBTQ+ Support Groups"
      description="Find community, connection, and understanding through our diverse range of support groups specifically designed for members of the LGBTQ+ community."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportGroups.map((group) => (
          <ServiceCard key={group.id} {...group} />
        ))}
      </div>
    </ServiceCategoryLayout>
  )
}

