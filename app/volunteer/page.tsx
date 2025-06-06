import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Volunteer | InsideOut",
  description: "Find opportunities to volunteer and support the InsideOut mission",
}

export default function VolunteerPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Volunteer</h1>
      <p className="text-xl text-muted-foreground">
        Find opportunities to volunteer your time and skills to support the InsideOut mission.
      </p>

      {/* Add volunteer content here */}
      <div className="mt-12">
        <p>Coming soon! Check back for volunteer opportunities.</p>
      </div>
    </div>
  )
}

