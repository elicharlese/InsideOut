import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().default('1').transform(Number),
  limit: z.string().default('20').transform(Number),
  category: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['created_at', 'price', 'name', 'rating']).default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
  minPrice: z.string().optional().transform(val => val ? Number(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? Number(val) : undefined),
  inStock: z.string().optional().transform(val => val === 'true'),
  featured: z.string().optional().transform(val => val === 'true'),
  onSale: z.string().optional().transform(val => val === 'true'),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries())
    const {
      page,
      limit,
      category,
      search,
      sort,
      order,
      minPrice,
      maxPrice,
      inStock,
      featured,
      onSale,
    } = querySchema.parse(params)

    const supabase = await createServerSupabaseClient()
    
    let query = supabase
      .from('products')
      .select(`
        *,
        product_reviews!inner(rating)
      `)
      .eq('is_active', true)

    // Apply filters
    if (category) {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`)
    }

    if (minPrice !== undefined) {
      query = query.gte('price', minPrice)
    }

    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice)
    }

    if (inStock) {
      query = query.gt('inventory_count', 0)
    }

    if (featured) {
      query = query.eq('is_featured', true)
    }

    if (onSale) {
      query = query.eq('is_sale', true)
    }

    // Apply sorting
    if (sort === 'rating') {
      // For rating sort, we'll need to calculate average rating
      query = query.order('created_at', { ascending: order === 'asc' })
    } else {
      query = query.order(sort, { ascending: order === 'asc' })
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: products, error, count } = await query

    if (error) {
      console.error('Products fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    // Calculate rating and review count for each product
    const productsWithRatings = await Promise.all(
      (products || []).map(async (product: any) => {
        const { data: ratingData } = await supabase
          .rpc('get_product_rating', { product_uuid: product.id })
        
        const { data: reviewCount } = await supabase
          .rpc('get_product_review_count', { product_uuid: product.id })

        return {
          ...product,
          rating: ratingData || 0,
          reviews: reviewCount || 0,
        }
      })
    )

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    return NextResponse.json({
      data: productsWithRatings,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        pages: Math.ceil((totalCount || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Products API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
