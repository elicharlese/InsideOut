import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandlerClient } from '@/lib/supabase'
import { 
  asyncHandler, 
  validateRequestBody, 
  validateMethod,
  successResponse,
  requireAuth,
} from '@/lib/api-utils'

const dataExportSchema = z.object({
  includeOrders: z.boolean().default(true),
  includeBlogPosts: z.boolean().default(true),
  includeMessages: z.boolean().default(true),
  includeTransactions: z.boolean().default(true),
})

const dataDeletionSchema = z.object({
  confirmDeletion: z.boolean(),
  password: z.string().min(1),
})

// Export user data (GDPR compliance)
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  const user = await requireAuth(request)
  const url = new URL(request.url)
  const options = {
    includeOrders: url.searchParams.get('includeOrders') !== 'false',
    includeBlogPosts: url.searchParams.get('includeBlogPosts') !== 'false',
    includeMessages: url.searchParams.get('includeMessages') !== 'false',
    includeTransactions: url.searchParams.get('includeTransactions') !== 'false',
  }

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  const exportData: any = {}

  // Export user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  exportData.profile = profile

  // Export orders if requested
  if (options.includeOrders) {
    const { data: orders } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(name, description)
        )
      `)
      .eq('user_id', user.id)

    exportData.orders = orders
  }

  // Export blog posts if requested
  if (options.includeBlogPosts) {
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author_id', user.id)

    exportData.blogPosts = blogPosts
  }

  // Export messages if requested
  if (options.includeMessages) {
    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)

    exportData.messages = messages
  }

  // Export blockchain transactions if requested
  if (options.includeTransactions) {
    const { data: transactions } = await supabase
      .from('blockchain_transactions')
      .select('*')
      .eq('user_id', user.id)

    exportData.transactions = transactions
  }

  // Add metadata
  exportData.metadata = {
    exportDate: new Date().toISOString(),
    userId: user.id,
    dataTypes: Object.keys(exportData).filter(key => key !== 'metadata'),
  }

  return NextResponse.json(exportData, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="user-data-export-${user.id}.json"`,
    },
  })
})

// Request account deletion (GDPR compliance)
export const DELETE = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['DELETE'])
  
  const user = await requireAuth(request)
  const { confirmDeletion, password } = await validateRequestBody(request, dataDeletionSchema)

  if (!confirmDeletion) {
    throw new Error('Deletion confirmation is required')
  }

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  // Verify password before deletion
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: user.email || '',
    password,
  })

  if (authError) {
    throw new Error('Invalid password')
  }

  // Anonymize or delete user data based on legal requirements
  // For orders and financial data, we may need to keep for legal reasons but anonymize
  
  // 1. Anonymize orders (keep for accounting/legal reasons)
  await supabase
    .from('orders')
    .update({
      shipping_address: {
        line1: '[DELETED]',
        city: '[DELETED]',
        state: '[DELETED]',
        postalCode: '[DELETED]',
        country: '[DELETED]',
      }
    })
    .eq('user_id', user.id)

  // 2. Delete blog posts (user content)
  await supabase
    .from('blog_posts')
    .delete()
    .eq('author_id', user.id)

  // 3. Delete messages
  await supabase
    .from('messages')
    .delete()
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)

  // 4. Delete cart items
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)

  // 5. Delete user profile (this will cascade to other user-specific data)
  await supabase
    .from('user_profiles')
    .delete()
    .eq('id', user.id)

  // 6. Delete auth user (final step)
  const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

  if (deleteError) {
    throw new Error('Failed to complete account deletion')
  }

  return successResponse(null, 'Account successfully deleted')
})
