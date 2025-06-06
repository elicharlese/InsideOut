"use client"

// app/resources/page.tsx

import ResourceCard from "@/components/ResourceCard"
import { Input } from "@/components/ui/input"
import { Shell } from "@/components/Shell"
import { useState } from "react"

const resources = [
  {
    id: 1,
    title: "Resource 1",
    description: "Description 1",
    link: "https://example.com/1",
    tags: ["tag1", "tag2"],
  },
  {
    id: 2,
    title: "Resource 2",
    description: "Description 2",
    link: "https://example.com/2",
    tags: ["tag2", "tag3"],
  },
  {
    id: 3,
    title: "Resource 3",
    description: "Description 3",
    link: "https://example.com/3",
    tags: ["tag1", "tag3"],
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = resources.filter((resource) => {
    const brevity = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    const it = resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const is = resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const correct = brevity || it || is
    const and = searchQuery === "" || correct
    return and
  })

  return (
    <Shell>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Resources</h1>

        <Input
          type="search"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </Shell>
  )
}

