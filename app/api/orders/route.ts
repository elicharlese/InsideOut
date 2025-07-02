import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandlerClient, supabaseAdmin } from '@/lib/supabase'
import { 
  asyncHandler, 
  validateRequestBody, 
  validateMethod,
  successResponse,
  errorResponse,
  requireAuth,
  getPaginationParams,
  getSearchParams
} from '@/lib/api-utils'

// Note: Stripe integration will be added when stripe package is properly installed

const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })),
  shippingAddress: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  paymentMethodId: z.string().min(1),
})

// Get user's orders
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  const user = await requireAuth(request)
  const url = new URL(request.url)
  const { page, limit, offset } = getPaginationParams(url)
  const { search, sort, order } = getSearchParams(url)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  let query = supabase
    .from('orders')
    .select(`
      *,
      order_items(
        *,
        products(id, name, price, images)
      )
    `, { count: 'exact' })
    .eq('user_id', user.id)

  // Apply search filter
  if (search) {
    query = query.ilike('id', `%${search}%`)
  }

  // Apply sorting
  query = query.order(sort as any, { ascending: order === 'asc' })

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data: orders, error, count } = await query

  if (error) {
    throw new Error('Failed to fetch orders')
  }

  return successResponse({
    data: orders || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    }
  })
})

// Create new order
export const POST = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['POST'])
  
  const user = await requireAuth(request)
  const { items, shippingAddress, paymentMethodId } = await validateRequestBody(
    request, 
    createOrderSchema
  )

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  // Start transaction by getting product details and checking inventory
  const productIds = items.map(item => item.productId)
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)
    .eq('is_active', true)

  if (productsError || !products || products.length !== items.length) {
    throw new Error('Some products are not available')
  }

  // Calculate total and validate inventory
  let totalAmount = 0
  const orderItems = []

  for (const item of items) {
    const product = products.find((p: any) => p.id === item.productId)
    if (!product) {
      throw new Error(`Product ${item.productId} not found`)
    }

    if (product.inventory_count < item.quantity) {
      throw new Error(`Insufficient inventory for ${product.name}`)
    }

    const itemTotal = product.price * item.quantity
    totalAmount += itemTotal

    orderItems.push({
      product_id: item.productId,
      quantity: item.quantity,
      price_at_time: product.price,
    })
  }

  // Note: Stripe payment processing will be implemented when stripe is properly configured
  // For now, we'll create the order with pending status
  
  // Create order using admin client to bypass RLS
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending', // Will be updated after payment processing
      total_amount: totalAmount,
      shipping_address: shippingAddress,
    })
    .select()
    .single()

  if (orderError) {
    throw new Error('Failed to create order')
  }

  // Create order items
  const orderItemsWithOrderId = orderItems.map(item => ({
    ...item,
    order_id: order.id,
  }))

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItemsWithOrderId)

  if (itemsError) {
    // Rollback order
    await supabaseAdmin.from('orders').delete().eq('id', order.id)
    throw new Error('Failed to create order items')
  }

  // Update inventory
  for (const item of items) {
    const product = products.find((p: any) => p.id === item.productId)
    await supabaseAdmin
      .from('products')
      .update({ 
        inventory_count: product!.inventory_count - item.quantity 
      })
      .eq('id', item.productId)
  }

  // Clear cart items for purchased products
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)
    .in('product_id', productIds)

  // Send confirmation email (implement with Resend)
  // await sendOrderConfirmationEmail(user.email, order)

  return successResponse(
    {
      orderId: order.id,
      status: order.status,
      totalAmount: order.total_amount,
    },
    'Order created successfully',
    201
  )
})
