import { ProductCard } from "@/components/product-card"
import { ProductCategoryLayout } from "@/components/product-category-layout"
import { ProductFilterPanel } from "@/components/product-filter-panel"

// Sample clothing products data
const clothingProducts = [
  {
    id: "c1",
    name: "Pride Rainbow T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    slug: "pride-rainbow-t-shirt",
  },
  {
    id: "c2",
    name: "Gender Neutral Denim Jacket",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Outerwear",
    rating: 4.6,
    reviewCount: 87,
    isSale: true,
    slug: "gender-neutral-denim-jacket",
  },
  {
    id: "c3",
    name: "Pronoun Hoodie",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Hoodies",
    rating: 4.9,
    reviewCount: 203,
    slug: "pronoun-hoodie",
  },
  {
    id: "c4",
    name: "Inclusive Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bottoms",
    rating: 4.7,
    reviewCount: 156,
    slug: "inclusive-fit-jeans",
  },
  {
    id: "c5",
    name: "Transgender Flag Sweater",
    price: 54.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sweaters",
    rating: 4.5,
    reviewCount: 92,
    slug: "transgender-flag-sweater",
  },
  {
    id: "c6",
    name: "Bisexual Pride Tank Top",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tank Tops",
    rating: 4.4,
    reviewCount: 78,
    slug: "bisexual-pride-tank-top",
  },
  {
    id: "c7",
    name: "Non-Binary Graphic Tee",
    price: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    rating: 4.6,
    reviewCount: 112,
    slug: "non-binary-graphic-tee",
  },
  {
    id: "c8",
    name: "Lesbian Pride Button-Up Shirt",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Button-Ups",
    rating: 4.7,
    reviewCount: 89,
    slug: "lesbian-pride-button-up-shirt",
  },
  {
    id: "c9",
    name: "Inclusive Swimwear Top",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Swimwear",
    rating: 4.8,
    reviewCount: 134,
    slug: "inclusive-swimwear-top",
  },
  {
    id: "c10",
    name: "Inclusive Swimwear Bottom",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Swimwear",
    rating: 4.7,
    reviewCount: 128,
    slug: "inclusive-swimwear-bottom",
  },
  {
    id: "c11",
    name: "Pride Athletic Leggings",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Activewear",
    rating: 4.9,
    reviewCount: 176,
    slug: "pride-athletic-leggings",
  },
  {
    id: "c12",
    name: "Asexual Pride Cardigan",
    price: 64.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cardigans",
    rating: 4.6,
    reviewCount: 82,
    slug: "asexual-pride-cardigan",
  },
  {
    id: "c13",
    name: "Pansexual Flag Scarf",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.7,
    reviewCount: 94,
    slug: "pansexual-flag-scarf",
  },
  {
    id: "c14",
    name: "Gender-Neutral Formal Blazer",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Formal Wear",
    rating: 4.8,
    reviewCount: 67,
    isSale: true,
    slug: "gender-neutral-formal-blazer",
  },
  {
    id: "c15",
    name: "Queer Artist Collaboration Tee",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    rating: 4.9,
    reviewCount: 215,
    isNew: true,
    slug: "queer-artist-collaboration-tee",
  },
  {
    id: "c16",
    name: "Intersex Pride Polo Shirt",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Polo Shirts",
    rating: 4.5,
    reviewCount: 73,
    slug: "intersex-pride-polo-shirt",
  },
  {
    id: "c17",
    name: "Genderfluid Embroidered Sweatshirt",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sweatshirts",
    rating: 4.7,
    reviewCount: 108,
    slug: "genderfluid-embroidered-sweatshirt",
  },
  {
    id: "c18",
    name: "Ally Support T-Shirt",
    price: 27.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    rating: 4.6,
    reviewCount: 142,
    slug: "ally-support-t-shirt",
  },
  {
    id: "c19",
    name: "Pride Parade Outfit Set",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sets",
    rating: 4.8,
    reviewCount: 187,
    isNew: true,
    slug: "pride-parade-outfit-set",
  },
  {
    id: "c20",
    name: "Rainbow Socks 3-Pack",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Socks",
    rating: 4.7,
    reviewCount: 231,
    slug: "rainbow-socks-3-pack",
  },
]

export default function ClothingPage() {
  const filterPanel = (
    <ProductFilterPanel
      categories={[
        { id: "tshirts", label: "T-Shirts", count: 4 },
        { id: "hoodies", label: "Hoodies & Sweatshirts", count: 3 },
        { id: "bottoms", label: "Bottoms", count: 2 },
        { id: "outerwear", label: "Outerwear", count: 2 },
        { id: "swimwear", label: "Swimwear", count: 2 },
        { id: "activewear", label: "Activewear", count: 1 },
        { id: "formalwear", label: "Formal Wear", count: 1 },
        { id: "sets", label: "Sets", count: 1 },
      ]}
      sizes={[
        { id: "xs", label: "XS" },
        { id: "s", label: "S" },
        { id: "m", label: "M" },
        { id: "l", label: "L" },
        { id: "xl", label: "XL" },
        { id: "2xl", label: "2XL" },
        { id: "3xl", label: "3XL" },
        { id: "4xl", label: "4XL" },
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
        { id: "queerclothing", label: "Queer Clothing Co." },
        { id: "inclusivestyle", label: "Inclusive Style" },
        { id: "genderfree", label: "GenderFree" },
        { id: "prideandjoy", label: "Pride & Joy" },
      ]}
      priceRange={{ min: 0, max: 150 }}
    />
  )

  return (
    <ProductCategoryLayout
      title="Clothing"
      description="Explore our inclusive clothing collection designed for all gender expressions and identities."
      filterPanel={filterPanel}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clothingProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </ProductCategoryLayout>
  )
}

