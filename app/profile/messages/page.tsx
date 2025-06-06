"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Filter, MessageSquare, Paperclip, Search, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("dr-maya-rodriguez")

  // In a real app, this would be fetched from an API
  const conversations = [
    {
      id: "dr-maya-rodriguez",
      name: "Dr. Maya Rodriguez",
      role: "Therapist",
      image: "/placeholder.svg?height=80&width=80",
      lastMessage: "Looking forward to our session tomorrow!",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: "dr-alex-johnson",
      name: "Dr. Alex Johnson",
      role: "Healthcare Provider",
      image: "/placeholder.svg?height=80&width=80",
      lastMessage: "Your test results look good. We'll discuss more at your next appointment.",
      timestamp: "Yesterday",
      unread: false,
    },
    {
      id: "support-team",
      name: "Support Team",
      role: "Customer Support",
      image: "/placeholder.svg?height=80&width=80",
      lastMessage: "Is there anything else we can help you with?",
      timestamp: "3 days ago",
      unread: false,
    },
  ]

  // In a real app, this would be fetched from an API based on the selected conversation
  const messages = [
    {
      id: 1,
      sender: "user",
      content: "Hi Dr. Rodriguez, I wanted to ask about the resources you mentioned in our last session.",
      timestamp: "July 19, 2023 • 10:15 AM",
    },
    {
      id: 2,
      sender: "provider",
      content:
        "Hello Alex! Of course, I'd be happy to share those resources with you. I'll send you the links to the articles and worksheets we discussed.",
      timestamp: "July 19, 2023 • 11:30 AM",
    },
    {
      id: 3,
      sender: "provider",
      content:
        "Here are the resources:\n\n1. Mindfulness Techniques for Anxiety\n2. CBT Workbook for Identity Exploration\n3. Community Support Groups in Your Area",
      timestamp: "July 19, 2023 • 11:32 AM",
    },
    {
      id: 4,
      sender: "user",
      content:
        "Thank you so much! I'll take a look at these before our next session. Also, is it possible to discuss the mindfulness techniques in more detail during our next appointment?",
      timestamp: "July 19, 2023 • 2:45 PM",
    },
    {
      id: 5,
      sender: "provider",
      content:
        "I'll make sure we allocate time to go through the mindfulness techniques in detail. Feel free to note down any specific questions you have after reviewing the materials.",
      timestamp: "July 19, 2023 • 3:20 PM",
    },
    {
      id: 6,
      sender: "provider",
      content: "Looking forward to our session tomorrow!",
      timestamp: "Today • 10:05 AM",
    },
  ]

  const selectedProvider = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with your providers and support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(80vh-10rem)]">
        <Card className="lg:col-span-1 flex flex-col h-full">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Conversations</CardTitle>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConversation === conversation.id ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 relative bg-muted rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={conversation.image || "/placeholder.svg"}
                            alt={conversation.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {conversation.unread && (
                          <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{conversation.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{conversation.role}</p>
                        <p className="text-sm truncate mt-1">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-3 border-b">
                {selectedProvider && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative bg-muted rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={selectedProvider.image || "/placeholder.svg"}
                        alt={selectedProvider.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{selectedProvider.name}</CardTitle>
                      <CardDescription>{selectedProvider.role}</CardDescription>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/profile/appointments">
                          <Calendar className="mr-2 h-3 w-3" />
                          Schedule
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-4 py-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea placeholder="Type your message..." className="min-h-[80px]" />
                  <div className="flex flex-col gap-2">
                    <Button size="icon" variant="ghost">
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Messages are securely encrypted. Please do not share sensitive personal information.
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Choose a conversation from the list to view your message history and send new messages.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

