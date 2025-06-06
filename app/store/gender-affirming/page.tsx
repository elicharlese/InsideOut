import { ProductCard } from "@/components/product-card"
import { ProductCategoryLayout } from "@/components/product-category-layout"
import { ProductFilterPanel } from "@/components/product-filter-panel"

// Sample gender-affirming products data
const genderAffirmingProducts = [
  {
    id: "g1",
    name: "Premium Chest Binder",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Binders",
    rating: 4.9,
    reviewCount: 256,
    slug: "premium-chest-binder",
  },
  {
    id: "g2",
    name: "Swim Binder Top",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Binders",
    rating: 4.8,
    reviewCount: 187,
    isNew: true,
    slug: "swim-binder-top",
  },
  {
    id: "g3",
    name: "Silicone Packer - Basic",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Packers",
    rating: 4.7,
    reviewCount: 142,
    slug: "silicone-packer-basic",
  },
  {
    id: "g4",
    name: "STP Packer",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Packers",
    rating: 4.6,
    reviewCount: 124,
    slug: "stp-packer",
  },
  {
    id: "g5",
    name: "Tucking Gaff - 3 Pack",
    price: 34.99,
    originalPrice: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Gaffs",
    rating: 4.8,
    reviewCount: 156,
    isSale: true,
    slug: "tucking-gaff-3-pack",
  },
  {
    id: "g6",
    name: "Silicone Breast Forms - Pair",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Breast Forms",
    rating: 4.7,
    reviewCount: 98,
    slug: "silicone-breast-forms-pair",
  },
  {
    id: "g7",
    name: "Adhesive Silicone Breast Forms",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Breast Forms",
    rating: 4.6,
    reviewCount: 87,
    slug: "adhesive-silicone-breast-forms",
  },
  {
    id: "g8",
    name: "Compression Shorts",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shapewear",
    rating: 4.8,
    reviewCount: 134,
    slug: "compression-shorts",
  },
  {
    id: "g9",
    name: "Hip & Butt Enhancer",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shapewear",
    rating: 4.7,
    reviewCount: 112,
    slug: "hip-butt-enhancer",
  },
  {
    id: "g10",
    name: "Lace Front Wig - Short Style",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wigs",
    rating: 4.9,
    reviewCount: 76,
    slug: "lace-front-wig-short-style",
  },
  {
    id: "g11",
    name: "Lace Front Wig - Long Style",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wigs",
    rating: 4.8,
    reviewCount: 92,
    slug: "lace-front-wig-long-style",
  },
  {
    id: "g12",
    name: "Voice Training Device",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Voice Training",
    rating: 4.6,
    reviewCount: 108,
    slug: "voice-training-device",
  },
  {
    id: "g13",
    name: "Post-Surgery Compression Vest",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Post-Surgery Care",
    rating: 4.9,
    reviewCount: 67,
    slug: "post-surgery-compression-vest",
  },
  {
    id: "g14",
    name: "Scar Care Silicone Sheets",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Post-Surgery Care",
    rating: 4.8,
    reviewCount: 83,
    slug: "scar-care-silicone-sheets",
  },
  {
    id: "g15",
    name: "Packer Harness",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Packers",
    rating: 4.7,
    reviewCount: 124,
    slug: "packer-harness",
  },
  {
    id: "g16",
    name: "Binder Washing Bag Set",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.6,
    reviewCount: 98,
    slug: "binder-washing-bag-set",
  },
  {
    id: "g17",
    name: "Breast Form Adhesive",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.8,
    reviewCount: 76,
    slug: "breast-form-adhesive",
  },
  {
    id: "g18",
    name: "Facial Hair Growth Kit",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grooming",
    rating: 4.5,
    reviewCount: 112,
    isNew: true,
    slug: "facial-hair-growth-kit",
  },
  {
    id: "g19",
    name: "Makeup Starter Kit",
    price: 59.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grooming",
    rating: 4.7,
    reviewCount: 134,
    isSale: true,
    slug: "makeup-starter-kit",
  },
  {
    id: "g20",
    name: "Gender-Affirming Swimwear Bottom",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Swimwear",
    rating: 4.8,
    reviewCount: 156,
    slug: "gender-affirming-swimwear-bottom",
  },
]

export default function GenderAffirmingPage() {
  const filterPanel = (
    <ProductFilterPanel
      categories={[
        { id: "binders", label: "Binders", count: 2 },
        { id: "packers", label: "Packers", count: 3 },
        { id: "gaffs", label: "Gaffs", count: 1 },
        { id: "breast-forms", label: "Breast Forms", count: 2 },
        { id: "shapewear", label: "Shapewear", count: 2 },
        { id: "wigs", label: "Wigs", count: 2 },
        { id: "voice-training", label: "Voice Training", count: 1 },
        { id: "post-surgery", label: "Post-Surgery Care", count: 2 },
        { id: "accessories", label: "Accessories", count: 2 },
        { id: "grooming", label: "Grooming", count: 2 },
        { id: "swimwear", label: "Swimwear", count: 1 },
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
        { id: "beige", label: "Beige" },
        { id: "black", label: "Black" },
        { id: "brown", label: "Brown" },
        { id: "nude", label: "Nude" },
        { id: "white", label: "White" },
      ]}
      brands={[
        { id: "genderaffirm", label: "GenderAffirm" },
        { id: "transessentials", label: "Trans Essentials" },
        { id: "bindersplus", label: "Binders Plus" },
        { id: "affirmingbody", label: "Affirming Body" },
        { id: "gendergear", label: "Gender Gear" },
      ]}
      priceRange={{ min: 0, max: 150 }}
      features={[
        { id: "waterproof", label: "Waterproof" },
        { id: "breathable", label: "Breathable" },
        { id: "hypoallergenic", label: "Hypoallergenic" },
        { id: "medical-grade", label: "Medical Grade" },
        { id: "trans-owned", label: "Trans-Owned Business" },
      ]}
    />
  )

  return (
    <ProductCategoryLayout
      title="Gender-Affirming Products"
      description="Explore our selection of high-quality gender-affirming products designed to help you express your authentic self."
      filterPanel={filterPanel}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {genderAffirmingProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </ProductCategoryLayout>
  )
}

