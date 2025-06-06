import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Heart, ShoppingBag, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductDetailPage({ params }) {
  // In a real app, we would fetch the product data based on the productId
  const productId = params.productId
  const product = products.find((p) => p.id.toString() === productId) || products[0]

  // Get related products based on category
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  // Get recently viewed products (would normally be from user session/cookies)
  const recentlyViewed = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/shop"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.mainImage || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer border hover:border-primary"
              >
                <Image
                  src={image || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <Button variant="ghost" size="icon" aria-label="Add to wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            </div>
            <div className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="flex items-center mt-1">
                <span className="text-sm line-through text-muted-foreground mr-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <Badge variant="destructive" className="text-xs">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.colors && (
              <div className="space-y-2">
                <h3 className="font-medium">Color</h3>
                <RadioGroup defaultValue={product.colors[0]} className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {product.sizes && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Size</h3>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Size Guide
                  </Button>
                </div>
                <RadioGroup defaultValue={product.sizes[2]} className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div className="flex items-center space-x-4 mt-6">
              <div className="flex border rounded-md">
                <Button variant="ghost" className="rounded-r-none">
                  -
                </Button>
                <div className="flex items-center justify-center w-12 border-x">1</div>
                <Button variant="ghost" className="rounded-l-none">
                  +
                </Button>
              </div>
              <Button className="flex-1">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex items-center text-sm">
              <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>In stock and ready to ship</span>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {product.details?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>
                    Free standard shipping on orders over $50. Expedited and international shipping options available at
                    checkout.
                  </p>
                  <p>We accept returns within 30 days of delivery. Items must be unworn and in original packaging.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>
                    {product.careInstructions || "Machine wash cold with like colors. Tumble dry low. Do not bleach."}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="reviews">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Based on {product.reviewCount} reviews</div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center">
                        <div className="w-8 text-sm text-muted-foreground">{star} star</div>
                        <div className="w-full mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-sm text-right text-muted-foreground">
                          {Math.floor(Math.random() * product.reviewCount)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Write a Review</Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <h4 className="font-medium mt-1">{review.title}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <span>{review.author}</span>
                        <span className="mx-2">•</span>
                        <span>Verified Purchase</span>
                      </div>
                      <p className="mt-2 text-sm">{review.content}</p>
                      {review.images && (
                        <div className="flex mt-3 space-x-2">
                          {review.images.map((image, index) => (
                            <div key={index} className="h-16 w-16 relative bg-gray-100 rounded-md overflow-hidden">
                              <Image
                                src={image || "/placeholder.svg?height=64&width=64"}
                                alt={`Review image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="questions" className="pt-6">
            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      Q
                    </div>
                    <div>
                      <h4 className="font-medium">{question.question}</h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        Asked by {question.author} on {question.date}
                      </div>
                    </div>
                  </div>
                  {question.answer && (
                    <div className="flex items-start mt-4 ml-6">
                      <div className="bg-green-100 text-green-700 font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        A
                      </div>
                      <div>
                        <p className="text-sm">{question.answer}</p>
                        <div className="text-sm text-muted-foreground mt-1">
                          Answered by {question.answerAuthor} on {question.answerDate}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                <h3 className="font-medium mb-2">Have a question about this product?</h3>
                <Button>Ask a Question</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recommendations */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-6 mt-12">
          <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
          <p className="text-muted-foreground mb-4">
            Based on your journey and preferences, we think these items might be helpful:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalizedRecommendations.map((rec) => (
              <div key={rec.id} className="bg-background rounded-lg p-4 border">
                <h3 className="font-medium">{rec.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                <Button variant="link" className="p-0 h-auto mt-2" asChild>
                  <Link href={rec.link}>Learn more</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden h-full">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={product.mainImage || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {product.badge && <Badge className="absolute top-2 left-2">{product.badge}</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">{product.category}</div>
          <h3 className="font-medium mt-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="font-medium">${product.price.toFixed(2)}</div>
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xs">{product.rating}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

// Sample data
const products = [
  {
    id: 1,
    name: "Pride T-Shirt",
    category: "Clothing",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 127,
    description:
      "Show your pride with this comfortable and stylish t-shirt. Made from 100% organic cotton with a modern fit that's perfect for everyday wear.",
    mainImage: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    colors: ["Rainbow", "Black", "White", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    details: [
      "100% organic cotton",
      "Gender-neutral fit",
      "Pre-shrunk fabric",
      "Screen-printed design",
      "Machine washable",
      "Made in a fair trade certified facility",
    ],
    careInstructions:
      "Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on reverse side if needed.",
  },
  {
    id: 2,
    name: "Chest Binder",
    category: "Clothing",
    price: 34.99,
    rating: 4.9,
    reviewCount: 215,
    description:
      "A comfortable, breathable chest binder designed for all-day wear. Features moisture-wicking fabric and reinforced seams for durability and support.",
    mainImage: "/placeholder.svg?height=600&width=600",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Self-Care Kit",
    category: "Wellness",
    price: 49.99,
    rating: 4.7,
    reviewCount: 89,
    description:
      "A curated collection of self-care essentials to help you relax and recharge. Includes bath salts, aromatherapy candle, journal, and more.",
    mainImage: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 4,
    name: "Pride Flag",
    category: "Accessories",
    price: 19.99,
    rating: 4.8,
    reviewCount: 156,
    description:
      "High-quality pride flag made from durable polyester. Perfect for pride events, home display, or as a meaningful gift.",
    mainImage: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 5,
    name: "Pronoun Pin Set",
    category: "Accessories",
    price: 12.99,
    rating: 4.6,
    reviewCount: 72,
    description:
      "Set of 3 enamel pins featuring different pronouns. Wear them on your jacket, bag, or lanyard to help communicate your pronouns.",
    mainImage: "/placeholder.svg?height=600&width=600",
    badge: "New",
  },
  {
    id: 6,
    name: "Compression Socks",
    category: "Clothing",
    price: 14.99,
    rating: 4.5,
    reviewCount: 63,
    description:
      "Comfortable compression socks designed for all-day support. Perfect for travel, long periods of standing, or post-surgery recovery.",
    mainImage: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 7,
    name: "Affirmation Journal",
    category: "Wellness",
    price: 18.99,
    rating: 4.7,
    reviewCount: 94,
    description:
      "A guided journal with prompts designed to foster self-acceptance, explore identity, and celebrate your authentic self.",
    mainImage: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 8,
    name: "Rainbow Bracelet",
    category: "Accessories",
    price: 9.99,
    rating: 4.4,
    reviewCount: 47,
    description: "Handcrafted rainbow bracelet made from recycled materials. Adjustable size fits most wrists.",
    mainImage: "/placeholder.svg?height=600&width=600",
  },
]

const reviews = [
  {
    id: 1,
    author: "Alex T.",
    date: "March 15, 2023",
    rating: 5,
    title: "Exactly what I needed",
    content:
      "This product exceeded my expectations. The quality is excellent and it's exactly as described. I've already received several compliments when wearing it. Will definitely purchase more items from this store!",
    images: ["/placeholder.svg?height=64&width=64", "/placeholder.svg?height=64&width=64"],
  },
  {
    id: 2,
    author: "Jordan M.",
    date: "February 28, 2023",
    rating: 4,
    title: "Great quality, runs small",
    content:
      "The material and construction are excellent. My only issue is that it runs a bit smaller than expected. I'd recommend sizing up if you're between sizes. Otherwise, very happy with my purchase.",
  },
  {
    id: 3,
    author: "Sam K.",
    date: "February 10, 2023",
    rating: 5,
    title: "Life changing product",
    content:
      "I can't express how much this product has improved my daily life. The comfort and quality are outstanding. This is my third purchase from InsideOut and I'm consistently impressed with their products.",
  },
]

const questions = [
  {
    id: 1,
    author: "Riley J.",
    date: "April 2, 2023",
    question: "How does the sizing run compared to standard sizes?",
    answer:
      "Our sizing tends to be true to size, but we recommend checking the size chart for specific measurements. For this particular item, some customers find it helpful to size up if they're between sizes.",
    answerAuthor: "InsideOut Support",
    answerDate: "April 3, 2023",
  },
  {
    id: 2,
    author: "Casey L.",
    date: "March 25, 2023",
    question: "Is this product suitable for sensitive skin?",
    answer:
      "Yes, this product is made with hypoallergenic materials and has been tested for sensitive skin. It's free from common irritants and harsh chemicals. If you have specific allergies, please check the detailed materials list or contact our support team.",
    answerAuthor: "InsideOut Support",
    answerDate: "March 26, 2023",
  },
  {
    id: 3,
    author: "Taylor B.",
    date: "March 18, 2023",
    question: "How long does shipping typically take?",
    answer:
      "Standard shipping usually takes 3-5 business days within the continental US. Expedited shipping options are available at checkout. International shipping times vary by location, typically 7-14 business days.",
    answerAuthor: "InsideOut Support",
    answerDate: "March 19, 2023",
  },
]

const personalizedRecommendations = [
  {
    id: 1,
    title: "Therapy Resources",
    description:
      "Based on your interest in self-care products, you might benefit from our therapy and counseling services.",
    link: "/services/therapy",
  },
  {
    id: 2,
    title: "Community Events",
    description: "Connect with others in your area who share similar interests and experiences.",
    link: "/community/events",
  },
  {
    id: 3,
    title: "Educational Resources",
    description: "Explore our library of articles and guides related to gender expression and identity.",
    link: "/resources/education",
  },
]

