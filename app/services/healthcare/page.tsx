import { ServiceCategoryLayout } from "@/components/service-category-layout"
import { ServiceCard } from "@/components/service-card"

export default function HealthcarePage() {
  // In a real app, this data would come from a database or API
  const healthcareServices = [
    {
      id: "healthcare-1",
      name: "Dr. Morgan Chen",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Primary Care Physician",
      description:
        "LGBTQ+ affirming primary care with a focus on preventative health, hormone management, and comprehensive wellness for all identities.",
      rating: 4.9,
      reviewCount: 132,
      price: "Insurance & Sliding Scale",
      location: "In-Person Only",
      availability: "Mon-Thurs, 8am-5pm",
      tags: ["Primary Care", "Preventative", "Hormone Management", "General Health"],
      category: "healthcare",
    },
    {
      id: "healthcare-2",
      name: "Rainbow Health Clinic",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Gender-Affirming Care",
      description:
        "Comprehensive gender-affirming healthcare services including hormone therapy, surgical referrals, and ongoing support throughout transition.",
      rating: 5.0,
      reviewCount: 89,
      price: "Insurance & Financial Assistance",
      location: "Virtual & In-Person",
      availability: "Weekdays, Extended Hours",
      tags: ["Transgender Care", "Hormone Therapy", "Transition Support", "Referrals"],
      category: "healthcare",
    },
    {
      id: "healthcare-3",
      name: "Dr. Jamie Rivera",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Sexual Health Specialist",
      description:
        "Judgment-free sexual health services including STI testing, PrEP/PEP, and comprehensive education tailored to LGBTQ+ individuals.",
      rating: 4.8,
      reviewCount: 76,
      price: "Insurance & Free Services",
      location: "In-Person Only",
      availability: "Tues-Sat, Walk-ins Welcome",
      tags: ["Sexual Health", "STI Testing", "PrEP/PEP", "Education"],
      category: "healthcare",
    },
    {
      id: "healthcare-4",
      name: "Affirm Mental Health",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Psychiatric Services",
      description:
        "LGBTQ+ affirming psychiatric care including medication management, gender dysphoria assessment, and treatment for co-occurring conditions.",
      rating: 4.7,
      reviewCount: 58,
      price: "Insurance & Sliding Scale",
      location: "Virtual & In-Person",
      availability: "Mon-Fri, Evening Hours",
      tags: ["Psychiatry", "Medication", "Assessment", "Mental Health"],
      category: "healthcare",
    },
    {
      id: "healthcare-5",
      name: "Inclusive Family Planning",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Reproductive Health",
      description:
        "Family planning and reproductive health services for LGBTQ+ individuals and couples, including fertility options and pregnancy care.",
      rating: 4.9,
      reviewCount: 47,
      price: "Insurance & Financial Counseling",
      location: "In-Person Only",
      availability: "Mon-Fri, By Appointment",
      tags: ["Fertility", "Family Planning", "Reproductive Health", "Pregnancy"],
      category: "healthcare",
    },
    {
      id: "healthcare-6",
      name: "Dr. Alex Washington",
      image: "/placeholder.svg?height=300&width=400",
      specialty: "Adolescent Medicine",
      description:
        "Specialized healthcare for LGBTQ+ youth and adolescents, providing affirming care during crucial developmental stages.",
      rating: 5.0,
      reviewCount: 63,
      price: "Insurance & Youth Programs",
      location: "Virtual & In-Person",
      availability: "Afternoons & Weekends",
      tags: ["Youth", "Adolescent", "Development", "Puberty Support"],
      category: "healthcare",
    },
  ]

  return (
    <ServiceCategoryLayout
      title="LGBTQ+ Affirming Healthcare"
      description="Connect with healthcare providers who offer inclusive, affirming care specifically designed for the unique health needs of the LGBTQ+ community."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {healthcareServices.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </ServiceCategoryLayout>
  )
}

