import { ProductCard } from "@/components/product-card"
import { ProductCategoryLayout } from "@/components/product-category-layout"
import { ProductFilterPanel } from "@/components/product-filter-panel"

// Sample wellness products data
const wellnessProducts = [
  {
    id: "w1",
    name: "LGBTQ+ Affirmation Cards",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mental Health",
    rating: 4.9,
    reviewCount: 187,
    isNew: true,
    slug: "lgbtq-affirmation-cards",
  },
  {
    id: "w2",
    name: "Pride Self-Care Kit",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Self-Care",
    rating: 4.8,
    reviewCount: 142,
    slug: "pride-self-care-kit",
  },
  {
    id: "w3",
    name: "Gender-Affirming Skincare Set",
    price: 39.99,
    originalPrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Skincare",
    rating: 4.7,
    reviewCount: 124,
    isSale: true,
    slug: "gender-affirming-skincare-set",
  },
  {
    id: "w4",
    name: "Queer-Owned Bath Bombs",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bath & Body",
    rating: 4.6,
    reviewCount: 156,
    slug: "queer-owned-bath-bombs",
  },
  {
    id: "w5",
    name: "LGBTQ+ Meditation Guide",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mental Health",
    rating: 4.8,
    reviewCount: 98,
    slug: "lgbtq-meditation-guide",
  },
  {
    id: "w6",
    name: "Pride Yoga Mat",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fitness",
    rating: 4.7,
    reviewCount: 112,
    slug: "pride-yoga-mat",
  },
  {
    id: "w7",
    name: "Queer-Friendly Massage Oil",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bath & Body",
    rating: 4.5,
    reviewCount: 87,
    slug: "queer-friendly-massage-oil",
  },
  {
    id: "w8",
    name: "LGBTQ+ Journal",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mental Health",
    rating: 4.9,
    reviewCount: 203,
    slug: "lgbtq-journal",
  },
  {
    id: "w9",
    name: "Pride Aromatherapy Candle",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Aromatherapy",
    rating: 4.6,
    reviewCount: 134,
    slug: "pride-aromatherapy-candle",
  },
  {
    id: "w10",
    name: "Gender-Affirming Facial Roller",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Skincare",
    rating: 4.7,
    reviewCount: 76,
    slug: "gender-affirming-facial-roller",
  },
  {
    id: "w11",
    name: "LGBTQ+ Nutritional Supplements",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Supplements",
    rating: 4.5,
    reviewCount: 92,
    slug: "lgbtq-nutritional-supplements",
  },
  {
    id: "w12",
    name: "Pride Resistance Bands",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fitness",
    rating: 4.6,
    reviewCount: 108,
    slug: "pride-resistance-bands",
  },
  {
    id: "w13",
    name: "Queer-Owned Essential Oils Set",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Aromatherapy",
    rating: 4.8,
    reviewCount: 124,
    slug: "queer-owned-essential-oils-set",
  },
  {
    id: "w14",
    name: "LGBTQ+ Sleep Aid",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Supplements",
    rating: 4.7,
    reviewCount: 87,
    slug: "lgbtq-sleep-aid",
  },
  {
    id: "w15",
    name: "Pride Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fitness",
    rating: 4.6,
    reviewCount: 142,
    slug: "pride-water-bottle",
  },
  {
    id: "w16",
    name: "Gender-Affirming Body Lotion",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bath & Body",
    rating: 4.8,
    reviewCount: 156,
    slug: "gender-affirming-body-lotion",
  },
  {
    id: "w17",
    name: "LGBTQ+ Stress Relief Kit",
    price: 44.99,
    originalPrice: 54.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mental Health",
    rating: 4.9,
    reviewCount: 178,
    isSale: true,
    slug: "lgbtq-stress-relief-kit",
  },
  {
    id: "w18",
    name: "Pride Fitness Tracker",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fitness",
    rating: 4.7,
    reviewCount: 98,
    isNew: true,
    slug: "pride-fitness-tracker",
  },
  {
    id: "w19",
    name: "Queer-Owned Face Mask Set",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Skincare",
    rating: 4.8,
    reviewCount: 112,
    slug: "queer-owned-face-mask-set",
  },
  {
    id: "w20",
    name: "LGBTQ+ Herbal Tea Collection",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Supplements",
    rating: 4.6,
    reviewCount: 134,
    slug: "lgbtq-herbal-tea-collection",
  },
]

export default function WellnessPage() {
  const filterPanel = (
    <ProductFilterPanel
      categories={[
        { id: "mental-health", label: "Mental Health", count: 4 },
        { id: "self-care", label: "Self-Care", count: 1 },
        { id: "skincare", label: "Skincare", count: 3 },
        { id: "bath-body", label: "Bath & Body", count: 3 },
        { id: "fitness", label: "Fitness", count: 4 },
        { id: "aromatherapy", label: "Aromatherapy", count: 2 },
        { id: "supplements", label: "Supplements", count: 3 },
      ]}
      brands={[
        { id: "queerhealth", label: "Queer Health" },
        { id: "pridewellness", label: "Pride Wellness" },
        { id: "inclusivecare", label: "Inclusive Care" },
        { id: "affirmingbeauty", label: "Affirming Beauty" },
        { id: "queerfitness", label: "Queer Fitness" },
      ]}
      priceRange={{ min: 0, max: 80 }}
      features={[
        { id: "vegan", label: "Vegan" },
        { id: "cruelty-free", label: "Cruelty-Free" },
        { id: "organic", label: "Organic" },
        { id: "queer-owned", label: "Queer-Owned Business" },
        { id: "eco-friendly", label: "Eco-Friendly" },
      ]}
    />
  )

  return (
    <ProductCategoryLayout
      title="Wellness"
      description="Discover wellness products designed specifically for the unique needs of the LGBTQ+ community."
      filterPanel={filterPanel}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wellnessProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </ProductCategoryLayout>
  )
}

