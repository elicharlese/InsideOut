import { ServiceCategoryLayout } from "@/components/service-category-layout"
import { ServiceCard } from "@/components/service-card"

export default function TherapyPage() {
  // In a real app, this data would come from a database or API
  const therapists = [
    {
      id: "therapy-1",
      name: "Dr. Alex Morgan",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "LGBTQ+ Affirming Therapy",
      description:
        "Specializing in gender identity, coming out, and relationship issues with over 10 years of experience working with the LGBTQ+ community.",
      rating: 4.9,
      reviewCount: 127,
      price: "$120-180 / session",
      location: "Virtual & In-Person",
      availability: "Mon-Fri, Evenings available",
      tags: ["Gender Identity", "Trauma", "Anxiety", "Depression"],
      category: "therapy",
    },
    {
      id: "therapy-2",
      name: "Sam Rivera, LMFT",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Family & Couples Therapy",
      description:
        "Creating a safe space for LGBTQ+ individuals and their families to navigate relationships, transitions, and communication challenges.",
      rating: 4.7,
      reviewCount: 89,
      price: "$100-150 / session",
      location: "Virtual Only",
      availability: "Tues-Sat, Flexible hours",
      tags: ["Couples", "Family", "Relationships", "Coming Out"],
      category: "therapy",
    },
    {
      id: "therapy-3",
      name: "Dr. Jamie Chen",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Trans & Non-Binary Care",
      description:
        "Dedicated to supporting transgender and non-binary individuals through all stages of transition and self-discovery.",
      rating: 5.0,
      reviewCount: 64,
      price: "$140-200 / session",
      location: "Virtual & In-Person",
      availability: "Mon, Wed, Fri, Weekends",
      tags: ["Transition Support", "Gender Dysphoria", "Identity", "Youth"],
      category: "therapy",
    },
    {
      id: "therapy-4",
      name: "Taylor Williams, LCSW",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Trauma & PTSD Specialist",
      description:
        "Trauma-informed care for LGBTQ+ individuals who have experienced discrimination, violence, or childhood trauma.",
      rating: 4.8,
      reviewCount: 112,
      price: "$110-170 / session",
      location: "In-Person Only",
      availability: "Weekdays, 9am-5pm",
      tags: ["Trauma", "PTSD", "Anxiety", "Stress Management"],
      category: "therapy",
    },
    {
      id: "therapy-5",
      name: "Jordan Lee, PhD",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Youth & Adolescent Therapy",
      description:
        "Supporting LGBTQ+ youth and their families through identity exploration, bullying, and school challenges.",
      rating: 4.9,
      reviewCount: 78,
      price: "$130-160 / session",
      location: "Virtual & In-Person",
      availability: "Afternoons & Weekends",
      tags: ["Youth", "Adolescents", "Bullying", "School Issues"],
      category: "therapy",
    },
    {
      id: "therapy-6",
      name: "Dr. Robin Patel",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Intersectional Therapy",
      description:
        "Addressing the unique challenges faced by LGBTQ+ individuals with intersecting marginalized identities.",
      rating: 4.8,
      reviewCount: 93,
      price: "$125-175 / session",
      location: "Virtual Only",
      availability: "Flexible Schedule",
      tags: ["Intersectionality", "Cultural Issues", "Identity", "Discrimination"],
      category: "therapy",
    },
  ]

  return (
    <ServiceCategoryLayout
      title="LGBTQ+ Affirming Therapy"
      description="Connect with licensed therapists who specialize in supporting the unique needs of the LGBTQ+ community."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {therapists.map((therapist) => (
          <ServiceCard key={therapist.id} {...therapist} />
        ))}
      </div>
    </ServiceCategoryLayout>
  )
}

