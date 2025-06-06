import Link from "next/link"
import Image from "next/image"
import { CircleEqual, ShoppingBag, Calendar, BookOpen, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-sand-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                A Space for Everyone
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                InsideOut is a platform designed to support and empower the LGBTQA+ community through inclusive
                products, services, and resources.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-sand-600 hover:bg-sand-700">
                <Link href="/store">Explore Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-sand-300 hover:bg-sand-100 hover:text-sand-900"
              >
                <Link href="/resources">Find Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Platform</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                InsideOut offers a comprehensive suite of services designed to support the LGBTQA+ community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="bg-sand-50 border-sand-200">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 rounded-full bg-sand-100">
                  <ShoppingBag className="h-6 w-6 text-sand-700" />
                </div>
                <h3 className="text-xl font-bold">Shop</h3>
                <p className="text-muted-foreground">
                  Discover gender-neutral products designed for everyone in our community.
                </p>
                <Button asChild variant="link" className="text-sand-700 hover:text-sand-900">
                  <Link href="/store" className="flex items-center">
                    Browse Store <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-clay-50 border-clay-200">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 rounded-full bg-clay-100">
                  <Calendar className="h-6 w-6 text-clay-700" />
                </div>
                <h3 className="text-xl font-bold">Services</h3>
                <p className="text-muted-foreground">Access specialized services from healthcare to legal support.</p>
                <Button asChild variant="link" className="text-clay-700 hover:text-clay-900">
                  <Link href="/services" className="flex items-center">
                    Explore Services <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-olive-50 border-olive-200">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-2 rounded-full bg-olive-100">
                  <BookOpen className="h-6 w-6 text-olive-700" />
                </div>
                <h3 className="text-xl font-bold">Resources</h3>
                <p className="text-muted-foreground">
                  Find valuable information and community resources to support your journey.
                </p>
                <Button asChild variant="link" className="text-olive-700 hover:text-olive-900">
                  <Link href="/resources" className="flex items-center">
                    View Resources <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Discover our curated selection of gender-neutral products.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Product+${i}`}
                    alt={`Product ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Gender-Neutral Product {i}</h3>
                  <p className="text-sm text-muted-foreground">$49.99</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild className="bg-sand-600 hover:bg-sand-700">
              <Link href="/store">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Community Voices</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Hear from members of our community about their experiences with InsideOut.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "InsideOut has been a lifeline for me. The resources and community support have made all the difference in my journey.",
                name: "Alex",
                role: "Community Member",
              },
              {
                quote:
                  "Finding gender-affirming products that actually work for me used to be so difficult. InsideOut changed that completely.",
                name: "Jordan",
                role: "Customer",
              },
              {
                quote:
                  "The therapy services connected me with a provider who truly understands my experiences. I'm so grateful.",
                name: "Taylor",
                role: "Service User",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="bg-sand-50 border-sand-200">
                <CardContent className="p-6 flex flex-col space-y-4">
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-stone-100 border-t border-stone-200">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <CircleEqual className="h-5 w-5 text-primary" />
                <span className="font-bold">InsideOut</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A platform designed to support and empower the LGBTQA+ community.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/store/clothing" className="text-muted-foreground hover:text-primary">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link href="/store/wellness" className="text-muted-foreground hover:text-primary">
                    Wellness
                  </Link>
                </li>
                <li>
                  <Link href="/store/accessories" className="text-muted-foreground hover:text-primary">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/store/gender-affirming" className="text-muted-foreground hover:text-primary">
                    Gender-Affirming
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services/therapy" className="text-muted-foreground hover:text-primary">
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link href="/services/healthcare" className="text-muted-foreground hover:text-primary">
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="/services/legal" className="text-muted-foreground hover:text-primary">
                    Legal Support
                  </Link>
                </li>
                <li>
                  <Link href="/services/support-groups" className="text-muted-foreground hover:text-primary">
                    Support Groups
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/resources/housing" className="text-muted-foreground hover:text-primary">
                    Housing
                  </Link>
                </li>
                <li>
                  <Link href="/resources/financial" className="text-muted-foreground hover:text-primary">
                    Financial
                  </Link>
                </li>
                <li>
                  <Link href="/resources/community" className="text-muted-foreground hover:text-primary">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/resources/education" className="text-muted-foreground hover:text-primary">
                    Education
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-stone-200 pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InsideOut. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

