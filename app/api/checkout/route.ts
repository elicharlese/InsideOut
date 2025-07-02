import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'
import Stripe from 'stripe'
import { z } from 'zod'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

const checkoutSchema = z.object({
  shippingAddress: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  billingAddress: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentMethodId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { shippingAddress, billingAddress, paymentMethodId } = checkoutSchema.parse(json)

    const response = NextResponse.next()
    const supabase = createRouteHandlerClient(request, response)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get cart items
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', user.id)

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = cartItems.reduce((total: number, item: any) => {
      const price = item.products?.is_sale ? item.products?.sale_price : item.products?.price
      return total + (price * item.quantity)
    }, 0)

    const taxRate = 0.08 // 8% tax
    const taxAmount = subtotal * taxRate
    const shippingAmount = subtotal > 50 ? 0 : 9.99 // Free shipping over $50
    const totalAmount = subtotal + taxAmount + shippingAmount

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        subtotal: Math.round(subtotal * 100) / 100,
        tax_amount: Math.round(taxAmount * 100) / 100,
        shipping_amount: Math.round(shippingAmount * 100) / 100,
        total_amount: Math.round(totalAmount * 100) / 100,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        payment_method_id: paymentMethodId,
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.products?.is_sale ? item.products?.sale_price : item.products?.price,
      total_price: (item.products?.is_sale ? item.products?.sale_price : item.products?.price) * item.quantity,
      product_snapshot: item.products,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      // Rollback order
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      )
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: `${request.nextUrl.origin}/checkout/success?order_id=${order.id}`,
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
    })

    // Update order with payment intent ID
    await supabase
      .from('orders')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', order.id)

    if (paymentIntent.status === 'succeeded') {
      // Payment succeeded, update order status
      await supabase
        .from('orders')
        .update({ 
          payment_status: 'completed',
          status: 'processing'
        })
        .eq('id', order.id)

      // Clear cart
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      // Update inventory
      for (const item of cartItems) {
        await supabase
          .from('products')
          .update({ 
            inventory_count: item.products.inventory_count - item.quantity 
          })
          .eq('id', item.product_id)
      }

      return NextResponse.json({
        success: true,
        order_id: order.id,
        payment_intent: paymentIntent,
      })
    } else if (paymentIntent.status === 'requires_action') {
      return NextResponse.json({
        requires_action: true,
        payment_intent: {
          id: paymentIntent.id,
          client_secret: paymentIntent.client_secret,
        },
        order_id: order.id,
      })
    } else {
      // Payment failed
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('id', order.id)

      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Checkout error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
