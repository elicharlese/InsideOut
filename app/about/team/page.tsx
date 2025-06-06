import type { Metadata } from "next"
import Image from "next/image"
import { Mail, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Our Team | InsideOut",
  description: "Meet the dedicated team behind InsideOut",
}

// Team member data
const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    bio: "Alex founded InsideOut with a vision to create a platform that truly serves the LGBTQA+ community. With over 15 years of experience in retail and community organizing, Alex brings passion and expertise to the team.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "alex@insideout.example",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Jordan Taylor",
    role: "Chief Operations Officer",
    bio: "Jordan oversees the day-to-day operations of InsideOut, ensuring that we deliver on our promises to our community. With a background in non-profit management, Jordan is committed to ethical business practices.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "jordan@insideout.example",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sam Rivera",
    role: "Head of Product",
    bio: "Sam leads our product team, focusing on sourcing and developing products that meet the unique needs of our community. Sam's background in inclusive design ensures our products work for everyone.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "sam@insideout.example",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Riley Chen",
    role: "Director of Services",
    bio: "Riley manages our services division, connecting our community with healthcare providers, legal support, and other essential services. With a background in social work, Riley understands the importance of accessible services.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "riley@insideout.example",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Taylor Johnson",
    role: "Research Director",
    bio: "Taylor leads our research initiatives, ensuring that our platform is informed by the latest research on LGBTQA+ health and wellbeing. With a PhD in Public Health, Taylor brings academic rigor to our work.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "taylor@insideout.example",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Casey Williams",
    role: "Community Manager",
    bio: "Casey builds and nurtures our community, both online and offline. With experience in event planning and community organizing, Casey ensures that InsideOut is more than just a platform—it's a community.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "casey@insideout.example",
      linkedin: "#",
      twitter: "#",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="container max-w-7xl py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Team</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet the passionate individuals behind InsideOut who are dedicated to serving the LGBTQA+ community.
        </p>
      </section>

      {/* Team Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-muted/30 rounded-lg overflow-hidden">
              <div className="relative h-80 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`mailto:${member.social.email}`} aria-label={`Email ${member.name}`}>
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="bg-muted/30 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Join Our Team</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          We're always looking for passionate individuals to join our mission. Check out our current openings.
        </p>
        <Button asChild size="lg">
          <a href="/about/careers">View Open Positions</a>
        </Button>
      </section>
    </div>
  )
}

