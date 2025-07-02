import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandlerClient } from '@/lib/supabase'
import { 
  asyncHandler, 
  validateRequestBody, 
  validateMethod,
  successResponse,
  requireAdmin,
  getPaginationParams,
  getSearchParams
} from '@/lib/api-utils'

const updateUserSchema = z.object({
  role: z.enum(['user', 'admin', 'moderator']).optional(),
  emailVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

// Get all users (admin only)
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  await requireAdmin(request)
  const url = new URL(request.url)
  const { page, limit, offset } = getPaginationParams(url)
  const { search, sort, order } = getSearchParams(url)
  const role = url.searchParams.get('role')

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  let query = supabase
    .from('user_profiles')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  // Filter by role
  if (role) {
    query = query.eq('role', role)
  }

  // Apply sorting
  query = query.order(sort as any, { ascending: order === 'asc' })

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data: users, error, count } = await query

  if (error) {
    throw new Error('Failed to fetch users')
  }

  return successResponse({
    data: users || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    }
  })
})

// Update user (admin only)
export const PUT = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['PUT'])
  
  await requireAdmin(request)
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  
  if (!userId) {
    throw new Error('User ID is required')
  }

  const updates = await validateRequestBody(request, updateUserSchema)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  const { data: user, error } = await supabase
    .from('user_profiles')
    .update({
      ...(updates.role && { role: updates.role }),
      ...(updates.emailVerified !== undefined && { email_verified: updates.emailVerified }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error('Failed to update user')
  }

  return successResponse(user, 'User updated successfully')
})

// Delete user (admin only)
export const DELETE = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['DELETE'])
  
  await requireAdmin(request)
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  
  if (!userId) {
    throw new Error('User ID is required')
  }

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  // Delete user profile (this will cascade to delete related data)
  const { error } = await supabase
    .from('user_profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    throw new Error('Failed to delete user')
  }

  return successResponse(null, 'User deleted successfully')
})
