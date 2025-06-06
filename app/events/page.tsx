import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | InsideOut",
  description: "Find LGBTQA+ events, workshops, and gatherings in your area",
}

export default function EventsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Events</h1>
      <p className="text-xl text-muted-foreground">
        Discover LGBTQA+ events, workshops, and gatherings happening in your area and online.
      </p>

      {/* Add events content here */}
      <div className="mt-12">
        <p>Coming soon! Check back for our upcoming events.</p>
      </div>
    </div>
  )
}

