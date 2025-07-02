import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'
import { z } from 'zod'

const addToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().min(1).max(10),
})

const updateCartSchema = z.object({
  quantity: z.number().min(0).max(10),
})

// Get user's cart
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.next()
    const supabase = createRouteHandlerClient(request, response)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Cart fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch cart' },
        { status: 500 }
      )
    }

    // Calculate totals
    const subtotal = (cartItems || []).reduce((total: number, item: any) => {
      const price = item.products?.is_sale ? item.products?.sale_price : item.products?.price
      return total + (price * item.quantity)
    }, 0)

    const totalItems = (cartItems || []).reduce((total: number, item: any) => total + item.quantity, 0)

    return NextResponse.json({
      items: cartItems || [],
      subtotal,
      totalItems,
    })
  } catch (error) {
    console.error('Cart API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { productId, quantity } = addToCartSchema.parse(json)

    const response = NextResponse.next()
    const supabase = createRouteHandlerClient(request, response)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if product exists and is active
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check inventory
    if (product.inventory_count < quantity) {
      return NextResponse.json(
        { error: 'Insufficient inventory' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single()

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity
      
      if (newQuantity > product.inventory_count) {
        return NextResponse.json(
          { error: 'Not enough inventory available' },
          { status: 400 }
        )
      }

      const { data: updatedItem, error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (updateError) {
        console.error('Cart update error:', updateError)
        return NextResponse.json(
          { error: 'Failed to update cart' },
          { status: 500 }
        )
      }

      return NextResponse.json(updatedItem)
    } else {
      // Add new item
      const { data: newItem, error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: productId,
          quantity,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Cart insert error:', insertError)
        return NextResponse.json(
          { error: 'Failed to add item to cart' },
          { status: 500 }
        )
      }

      return NextResponse.json(newItem, { status: 201 })
    }
  } catch (error) {
    console.error('Add to cart error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
