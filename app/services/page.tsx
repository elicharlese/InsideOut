import Link from "next/link"
import Image from "next/image"
import { Calendar, GavelIcon, Heart, ShieldPlus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Therapy",
      description:
        "Connect with licensed therapists who specialize in supporting the unique needs of the LGBTQ+ community.",
      icon: <Heart className="h-10 w-10 text-primary" />,
      href: "/services/therapy",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Healthcare",
      description:
        "Find affirming healthcare providers who understand and respect your identity and specific health needs.",
      icon: <ShieldPlus className="h-10 w-10 text-primary" />,
      href: "/services/healthcare",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Legal Support",
      description:
        "Access legal professionals who specialize in LGBTQ+ rights, discrimination cases, and identity documentation.",
      icon: <GavelIcon className="h-10 w-10 text-primary" />,
      href: "/services/legal",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Support Groups",
      description:
        "Join community groups for peer support, shared experiences, and connection with others who understand.",
      icon: <Users className="h-10 w-10 text-primary" />,
      href: "/services/support-groups",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">LGBTQ+ Affirming Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Connect with professionals and communities who understand and celebrate your identity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category) => (
          <Card key={category.title} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <div className="rounded-full bg-primary/10 p-2">{category.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="line-clamp-3">{category.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={category.href}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse {category.title}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-muted p-6 md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why Choose InsideOut Services?</h2>
          <p className="mt-4 text-muted-foreground">
            Our platform connects you with pre-vetted professionals who are committed to providing affirming, respectful
            care.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-card p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Vetted Providers</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All service providers are screened for LGBTQ+ cultural competency and affirming practices.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Community Reviewed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Read authentic reviews from community members who have used these services.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Sliding Scale Options</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Many providers offer sliding scale fees and insurance options to ensure accessibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

