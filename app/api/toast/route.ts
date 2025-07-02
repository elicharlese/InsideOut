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

const triggerToastSchema = z.object({
  type: z.enum(['success', 'error', 'warning', 'info']),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  duration: z.number().min(1000).max(10000).default(5000),
  action: z.object({
    label: z.string(),
    url: z.string().url(),
  }).optional(),
  persistent: z.boolean().default(false),
})

// Trigger toast notification for user
export const POST = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['POST'])
  
  const user = await requireAuth(request)
  const toastData = await validateRequestBody(request, triggerToastSchema)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  // Create notification record
  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: user.id,
      title: toastData.title,
      message: toastData.message,
      type: toastData.type,
      action_url: toastData.action?.url,
      action_text: toastData.action?.label,
      is_read: !toastData.persistent, // Auto-mark as read if not persistent
    })
    .select()
    .single()

  if (error) {
    throw new Error('Failed to create toast notification')
  }

  // Trigger real-time notification via Supabase
  await supabase
    .channel(`user-${user.id}`)
    .send({
      type: 'broadcast',
      event: 'toast',
      payload: {
        id: notification.id,
        type: toastData.type,
        title: toastData.title,
        message: toastData.message,
        duration: toastData.duration,
        action: toastData.action,
        persistent: toastData.persistent,
        timestamp: new Date().toISOString(),
      }
    })

  return successResponse(notification, 'Toast notification triggered')
})
