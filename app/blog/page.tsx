import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | InsideOut",
  description: "Read the latest stories, news, and insights from the LGBTQA+ community",
}

export default function BlogPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Blog</h1>
      <p className="text-xl text-muted-foreground">
        Stay up-to-date with the latest news, stories, and insights from the LGBTQA+ community.
      </p>

      {/* Add blog content here */}
      <div className="mt-12">
        <p>Coming soon! Check back for our latest blog posts.</p>
      </div>
    </div>
  )
}

