import { ProductCard } from "@/components/product-card"
import { ProductCategoryLayout } from "@/components/product-category-layout"
import { ProductFilterPanel } from "@/components/product-filter-panel"

// Sample accessories products data
const accessoriesProducts = [
  {
    id: "a1",
    name: "Pronoun Necklace",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
    slug: "pronoun-necklace",
  },
  {
    id: "a2",
    name: "Rainbow Pride Pin Set",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pins & Patches",
    rating: 4.7,
    reviewCount: 203,
    slug: "rainbow-pride-pin-set",
  },
  {
    id: "a3",
    name: "Transgender Flag Enamel Pin",
    price: 9.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pins & Patches",
    rating: 4.9,
    reviewCount: 178,
    slug: "transgender-flag-enamel-pin",
  },
  {
    id: "a4",
    name: "Pride Rainbow Backpack",
    price: 49.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bags",
    rating: 4.6,
    reviewCount: 124,
    isSale: true,
    slug: "pride-rainbow-backpack",
  },
  {
    id: "a5",
    name: "Pronoun Button Pack",
    price: 7.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pins & Patches",
    rating: 4.8,
    reviewCount: 215,
    slug: "pronoun-button-pack",
  },
  {
    id: "a6",
    name: "Pride Flag Bandana",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Headwear",
    rating: 4.7,
    reviewCount: 142,
    slug: "pride-flag-bandana",
  },
  {
    id: "a7",
    name: "Bisexual Pride Bracelet",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    rating: 4.8,
    reviewCount: 167,
    slug: "bisexual-pride-bracelet",
  },
  {
    id: "a8",
    name: "Non-Binary Flag Tote Bag",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bags",
    rating: 4.6,
    reviewCount: 98,
    slug: "non-binary-flag-tote-bag",
  },
  {
    id: "a9",
    name: "Pride Rainbow Socks",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Socks",
    rating: 4.7,
    reviewCount: 187,
    slug: "pride-rainbow-socks",
  },
  {
    id: "a10",
    name: "Lesbian Pride Flag Scarf",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Scarves",
    rating: 4.8,
    reviewCount: 112,
    slug: "lesbian-pride-flag-scarf",
  },
  {
    id: "a11",
    name: "Pride Phone Case",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Phone Accessories",
    rating: 4.5,
    reviewCount: 143,
    slug: "pride-phone-case",
  },
  {
    id: "a12",
    name: "Asexual Pride Beanie",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Headwear",
    rating: 4.6,
    reviewCount: 87,
    slug: "asexual-pride-beanie",
  },
  {
    id: "a13",
    name: "Pansexual Pride Earrings",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    rating: 4.7,
    reviewCount: 109,
    slug: "pansexual-pride-earrings",
  },
  {
    id: "a14",
    name: "Pride Rainbow Wallet",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wallets",
    rating: 4.5,
    reviewCount: 76,
    slug: "pride-rainbow-wallet",
  },
  {
    id: "a15",
    name: "Intersex Pride Wristband",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    rating: 4.6,
    reviewCount: 92,
    slug: "intersex-pride-wristband",
  },
  {
    id: "a16",
    name: "Genderfluid Pride Keychain",
    price: 7.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Keychains",
    rating: 4.7,
    reviewCount: 118,
    slug: "genderfluid-pride-keychain",
  },
  {
    id: "a17",
    name: "Pride Rainbow Sunglasses",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Eyewear",
    rating: 4.4,
    reviewCount: 83,
    isNew: true,
    slug: "pride-rainbow-sunglasses",
  },
  {
    id: "a18",
    name: "Queer Pride Lapel Pin",
    price: 11.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pins & Patches",
    rating: 4.8,
    reviewCount: 134,
    slug: "queer-pride-lapel-pin",
  },
  {
    id: "a19",
    name: "Pride Flag Watch",
    price: 39.99,
    originalPrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Watches",
    rating: 4.6,
    reviewCount: 67,
    isSale: true,
    slug: "pride-flag-watch",
  },
  {
    id: "a20",
    name: "Ally Support Pin",
    price: 9.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pins & Patches",
    rating: 4.5,
    reviewCount: 102,
    slug: "ally-support-pin",
  },
]

export default function AccessoriesPage() {
  const filterPanel = (
    <ProductFilterPanel
      categories={[
        { id: "jewelry", label: "Jewelry", count: 4 },
        { id: "pins", label: "Pins & Patches", count: 5 },
        { id: "bags", label: "Bags", count: 2 },
        { id: "headwear", label: "Headwear", count: 2 },
        { id: "socks", label: "Socks", count: 1 },
        { id: "scarves", label: "Scarves", count: 1 },
        { id: "phone", label: "Phone Accessories", count: 1 },
        { id: "eyewear", label: "Eyewear", count: 1 },
        { id: "watches", label: "Watches", count: 1 },
      ]}
      colors={[
        { id: "rainbow", label: "Rainbow" },
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "blue", label: "Blue" },
        { id: "pink", label: "Pink" },
        { id: "purple", label: "Purple" },
        { id: "yellow", label: "Yellow" },
      ]}
      brands={[
        { id: "pridewear", label: "PrideWear" },
        { id: "queeraccessories", label: "Queer Accessories" },
        { id: "inclusivestyle", label: "Inclusive Style" },
        { id: "prideandjoy", label: "Pride & Joy" },
      ]}
      priceRange={{ min: 0, max: 50 }}
      materials={[
        { id: "metal", label: "Metal" },
        { id: "fabric", label: "Fabric" },
        { id: "plastic", label: "Plastic" },
        { id: "leather", label: "Vegan Leather" },
        { id: "wood", label: "Wood" },
      ]}
    />
  )

  return (
    <ProductCategoryLayout
      title="Accessories"
      description="Express yourself with our diverse collection of pride accessories for every identity and occasion."
      filterPanel={filterPanel}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {accessoriesProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </ProductCategoryLayout>
  )
}

