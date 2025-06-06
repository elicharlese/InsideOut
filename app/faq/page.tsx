import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | InsideOut",
  description: "Find answers to common questions about InsideOut's products, services, and policies",
}

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Shopping & Orders",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "You can place an order by browsing our store, adding items to your cart, and proceeding to checkout. You'll need to create an account or log in to complete your purchase.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and cryptocurrency payments including Bitcoin and Ethereum.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team, and we'll do our best to accommodate your request if the order hasn't shipped yet.",
        },
        {
          question: "Do you offer gift wrapping?",
          answer: "Yes, we offer gift wrapping for a small additional fee. You can select this option during checkout.",
        },
        {
          question: "How can I check the status of my order?",
          answer:
            "You can check the status of your order by logging into your account and viewing your order history. You'll also receive email updates when your order is processed and shipped.",
        },
      ],
    },
    {
      title: "Shipping & Returns",
      questions: [
        {
          question: "What are your shipping times?",
          answer:
            "We typically process orders within 1-2 business days. Shipping times vary depending on your location, but most domestic orders arrive within 3-5 business days.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping times typically range from 7-14 business days, depending on your location and customs processing.",
        },
        {
          question: "How much does shipping cost?",
          answer:
            "Shipping costs vary based on your location and the weight of your order. We offer free shipping on domestic orders over $50. You can calculate shipping costs during checkout before completing your purchase.",
        },
        {
          question: "What is your return policy?",
          answer:
            "We accept returns within 30 days of delivery. Items must be in their original condition with tags attached. Please visit our Shipping & Returns page for more details.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "To initiate a return, log into your account, go to your order history, and select the order containing the item(s) you wish to return. Follow the prompts to generate a return label and instructions.",
        },
      ],
    },
    {
      title: "Products & Services",
      questions: [
        {
          question: "Are your products ethically sourced?",
          answer:
            "Yes, we are committed to ethical sourcing. We work with suppliers who share our values of inclusivity, sustainability, and fair labor practices.",
        },
        {
          question: "How do I book a service appointment?",
          answer:
            "You can book service appointments through our Services section. Browse available providers, select your preferred date and time, and complete the booking process.",
        },
        {
          question: "Can I cancel or reschedule a service appointment?",
          answer:
            "Yes, you can cancel or reschedule service appointments up to 24 hours before the scheduled time without any penalty. Changes made with less notice may incur a fee.",
        },
        {
          question: "Do you offer size exchanges?",
          answer:
            "Yes, we offer size exchanges within 30 days of purchase. The item must be in its original condition with tags attached. Shipping for exchanges is free.",
        },
        {
          question: "How can I provide feedback on a product or service?",
          answer:
            "We welcome your feedback! You can leave reviews on product pages, provide feedback after service appointments, or contact us directly through our Contact page.",
        },
      ],
    },
    {
      title: "Account & Privacy",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address and create a password.",
        },
        {
          question: "How is my personal information protected?",
          answer:
            "We take data privacy seriously. Your personal information is encrypted and stored securely. We never share your information with third parties without your consent. Please see our Privacy Policy for more details.",
        },
        {
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account at any time. Go to Account Settings and select 'Delete Account'. Please note that this action is permanent and will remove all your data from our system.",
        },
        {
          question: "How do I update my payment information?",
          answer:
            "You can update your payment information by going to Account Settings > Payment Methods. From there, you can add, edit, or remove payment methods.",
        },
        {
          question: "How do I subscribe or unsubscribe from emails?",
          answer:
            "You can manage your email preferences in Account Settings > Communication Preferences. You can also unsubscribe from marketing emails by clicking the 'Unsubscribe' link at the bottom of any email we send.",
        },
      ],
    },
  ]

  return (
    <div className="container max-w-7xl py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about our products, services, shipping, returns, and more.
        </p>
      </section>

      {/* FAQ Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {faqCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>Common questions about {category.title.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Still Have Questions Section */}
      <section className="bg-muted/30 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Still Have Questions?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          If you couldn't find the answer you were looking for, our support team is here to help.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  )
}

