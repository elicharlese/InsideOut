import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partnerships | InsideOut",
  description: "Learn about our partnerships and collaborations with other organizations",
}

export default function PartnershipsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Partnerships</h1>
      <p className="text-xl text-muted-foreground">
        Learn about our partnerships and collaborations with organizations that support the LGBTQA+ community.
      </p>

      {/* Add partnerships content here */}
      <div className="mt-12">
        <p>Coming soon! Check back for our list of partners.</p>
      </div>
    </div>
  )
}

