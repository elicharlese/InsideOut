import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandlerClient } from '@/lib/supabase'
import { 
  asyncHandler, 
  validateRequestBody, 
  validateMethod,
  successResponse,
  requireAuth,
  getPaginationParams,
} from '@/lib/api-utils'

const createNotificationSchema = z.object({
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  type: z.enum(['info', 'success', 'warning', 'error']).default('info'),
  actionUrl: z.string().url().optional(),
  actionText: z.string().optional(),
  scheduledFor: z.string().datetime().optional(),
})

const markAsReadSchema = z.object({
  notificationIds: z.array(z.string().uuid()),
})

// Get user notifications
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  const user = await requireAuth(request)
  const url = new URL(request.url)
  const { page, limit, offset } = getPaginationParams(url)
  const unreadOnly = url.searchParams.get('unreadOnly') === 'true'

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  let query = supabase
    .from('notifications')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)

  if (unreadOnly) {
    query = query.eq('read', false)
  }

  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data: notifications, error, count } = await query

  if (error) {
    throw new Error('Failed to fetch notifications')
  }

  return successResponse({
    data: notifications || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    }
  })
})

// Create notification (internal use)
export const POST = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['POST'])
  
  const user = await requireAuth(request)
  const notificationData = await validateRequestBody(request, createNotificationSchema)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: user.id,
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type,
      action_url: notificationData.actionUrl,
      action_text: notificationData.actionText,
      scheduled_for: notificationData.scheduledFor,
    })
    .select()
    .single()

  if (error) {
    throw new Error('Failed to create notification')
  }

  return successResponse(notification, 'Notification created successfully', 201)
})

// Mark notifications as read
export const PUT = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['PUT'])
  
  const user = await requireAuth(request)
  const { notificationIds } = await validateRequestBody(request, markAsReadSchema)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  const { data: notifications, error } = await supabase
    .from('notifications')
    .update({ 
      read: true,
      read_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .in('id', notificationIds)
    .select()

  if (error) {
    throw new Error('Failed to mark notifications as read')
  }

  return successResponse(notifications, 'Notifications marked as read')
})

// Delete notifications
export const DELETE = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['DELETE'])
  
  const user = await requireAuth(request)
  const url = new URL(request.url)
  const notificationId = url.searchParams.get('id')

  if (!notificationId) {
    throw new Error('Notification ID is required')
  }

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to delete notification')
  }

  return successResponse(null, 'Notification deleted successfully')
})
