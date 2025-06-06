import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Heart, Users, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | InsideOut",
  description: "Learn about our mission, values, and the team behind InsideOut",
}

export default function AboutPage() {
  return (
    <div className="container max-w-7xl py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Mission</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          InsideOut is dedicated to creating a safe, inclusive space where the LGBTQA+ community can find products,
          services, and resources that affirm their identities and support their wellbeing.
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-display font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
            <p className="text-muted-foreground">
              We create spaces and products that welcome everyone, regardless of how they identify.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              We foster connections and support networks within the LGBTQA+ community.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safety</h3>
            <p className="text-muted-foreground">
              We prioritize creating safe spaces, both online and offline, for our community.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-muted-foreground">We strive to make our products and services accessible to everyone.</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              InsideOut was founded in 2020 by a group of LGBTQA+ individuals who recognized the need for a
              comprehensive platform that addresses the unique needs of our community.
            </p>
            <p className="text-muted-foreground mb-4">
              What started as a small online store has grown into a platform that offers not just products, but also
              services, resources, and a space for research and education.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to grow and evolve, always guided by our commitment to serving the LGBTQA+ community
              with dignity, respect, and understanding.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="The InsideOut team" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're looking for products, services, or just a supportive community, InsideOut is here for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/store">Shop Our Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

