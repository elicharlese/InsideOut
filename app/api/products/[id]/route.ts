import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .eq('is_active', true)
      .single()

    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get product rating and reviews
    const { data: ratingData } = await supabase
      .rpc('get_product_rating', { product_uuid: product.id })
    
    const { data: reviewCount } = await supabase
      .rpc('get_product_review_count', { product_uuid: product.id })

    // Get recent reviews
    const { data: reviews } = await supabase
      .from('product_reviews')
      .select(`
        *,
        user_profiles(full_name, avatar_url)
      `)
      .eq('product_id', product.id)
      .order('created_at', { ascending: false })
      .limit(10)

    const productWithDetails = {
      ...product,
      rating: ratingData || 0,
      reviews: reviewCount || 0,
      recent_reviews: reviews || [],
    }

    return NextResponse.json(productWithDetails)
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
