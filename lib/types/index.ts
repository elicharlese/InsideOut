import { z } from 'zod'

// User Types
export const UserRole = z.enum(['user', 'admin', 'moderator'])
export type UserRole = z.infer<typeof UserRole>

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  role: UserRole.default('user'),
  email_verified: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type User = z.infer<typeof UserSchema>

// Product Types
export const ProductCategorySchema = z.enum([
  'clothing',
  'accessories', 
  'gender-affirming',
  'wellness'
])
export type ProductCategory = z.infer<typeof ProductCategorySchema>

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  category: ProductCategorySchema,
  images: z.array(z.string().url()),
  inventory_count: z.number().int().min(0),
  is_active: z.boolean().default(true),
  metadata: z.record(z.any()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type Product = z.infer<typeof ProductSchema>

// Order Types
export const OrderStatusSchema = z.enum([
  'pending',
  'processing', 
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
])
export type OrderStatus = z.infer<typeof OrderStatusSchema>

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  price_at_time: z.number().positive(),
})
export type OrderItem = z.infer<typeof OrderItemSchema>

export const OrderSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema),
  total_amount: z.number().positive(),
  shipping_address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postal_code: z.string(),
    country: z.string(),
  }),
  stripe_payment_intent_id: z.string().optional(),
  tracking_number: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type Order = z.infer<typeof OrderSchema>

// Blog Types
export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string(),
  excerpt: z.string().optional(),
  featured_image: z.string().url().optional(),
  author_id: z.string().uuid(),
  published: z.boolean().default(false),
  published_at: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type BlogPost = z.infer<typeof BlogPostSchema>

// Event Types
export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  location: z.string().optional(),
  virtual_link: z.string().url().optional(),
  max_attendees: z.number().int().positive().optional(),
  current_attendees: z.number().int().min(0).default(0),
  is_public: z.boolean().default(true),
  registration_required: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type Event = z.infer<typeof EventSchema>

// Resource Types
export const ResourceCategorySchema = z.enum([
  'community',
  'education', 
  'financial',
  'housing'
])
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>

export const ResourceSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  category: ResourceCategorySchema,
  url: z.string().url().optional(),
  contact_info: z.string().optional(),
  location: z.string().optional(),
  is_verified: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type Resource = z.infer<typeof ResourceSchema>

// Service Types
export const ServiceCategorySchema = z.enum([
  'healthcare',
  'legal',
  'support-groups',
  'therapy'
])
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>

export const ServiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  category: ServiceCategorySchema,
  provider_name: z.string(),
  contact_info: z.string(),
  location: z.string().optional(),
  is_virtual: z.boolean().default(false),
  pricing_info: z.string().optional(),
  availability: z.string().optional(),
  is_verified: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type Service = z.infer<typeof ServiceSchema>

// Research Types
export const ClinicalTrialSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  phase: z.string(),
  status: z.enum(['recruiting', 'active', 'completed', 'suspended']),
  location: z.string(),
  eligibility_criteria: z.string(),
  contact_info: z.string(),
  nct_number: z.string().optional(),
  sponsor: z.string(),
  start_date: z.string().datetime().optional(),
  completion_date: z.string().datetime().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type ClinicalTrial = z.infer<typeof ClinicalTrialSchema>

export const PublicationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  authors: z.array(z.string()),
  abstract: z.string(),
  journal: z.string(),
  publication_date: z.string().datetime(),
  doi: z.string().optional(),
  pdf_url: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type Publication = z.infer<typeof PublicationSchema>

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
})
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pagination Types
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
})
export type Pagination = z.infer<typeof PaginationSchema>

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(itemSchema),
    pagination: PaginationSchema,
    error: z.string().optional(),
  })

export type PaginatedResponse<T> = {
  success: boolean
  data: T[]
  pagination: Pagination
  error?: string
}

// Blockchain Types
export const BlockchainTransactionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  transaction_hash: z.string(),
  transaction_type: z.enum(['mint', 'transfer', 'burn', 'stake']),
  amount: z.number().optional(),
  token_address: z.string().optional(),
  from_address: z.string().optional(),
  to_address: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'failed']),
  block_number: z.number().int().optional(),
  gas_used: z.number().optional(),
  gas_price: z.number().optional(),
  metadata: z.record(z.any()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type BlockchainTransaction = z.infer<typeof BlockchainTransactionSchema>
