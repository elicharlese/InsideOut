import { createServerSupabaseClient, supabaseAdmin } from '@/lib/supabase'

export interface NotificationData {
  userId: string
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  actionUrl?: string
  actionText?: string
  scheduledFor?: string
  triggerToast?: boolean
  toastDuration?: number
  persistent?: boolean
}

export async function createNotification(data: NotificationData) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || 'info',
        action_url: data.actionUrl,
        action_text: data.actionText,
        scheduled_for: data.scheduledFor,
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create notification:', error)
      return null
    }

    // Trigger real-time toast if requested
    if (data.triggerToast) {
      await triggerRealtimeToast(data.userId, {
        id: notification.id,
        type: data.type || 'info',
        title: data.title,
        message: data.message,
        duration: data.toastDuration || 5000,
        persistent: data.persistent || false,
        action: data.actionUrl ? {
          label: data.actionText || 'View',
          url: data.actionUrl
        } : undefined,
      })
    }

    return notification
  } catch (error) {
    console.error('Error creating notification:', error)
    return null
  }
}

export async function triggerRealtimeToast(userId: string, toast: {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  duration?: number
  persistent?: boolean
  action?: {
    label: string
    url: string
  }
}) {
  try {
    // Send real-time notification via Supabase channels
    await supabaseAdmin
      .channel(`user-${userId}`)
      .send({
        type: 'broadcast',
        event: 'toast',
        payload: {
          ...toast,
          timestamp: new Date().toISOString(),
        }
      })

    return true
  } catch (error) {
    console.error('Error triggering real-time toast:', error)
    return false
  }
}

// Predefined notification templates
export const notificationTemplates = {
  orderConfirmed: (orderId: string) => ({
    title: 'Order Confirmed',
    message: `Your order #${orderId} has been confirmed and is being processed.`,
    type: 'success' as const,
    actionUrl: `/profile/orders/${orderId}`,
    actionText: 'View Order',
  }),

  orderShipped: (orderId: string, trackingNumber?: string) => ({
    title: 'Order Shipped',
    message: `Your order #${orderId} has been shipped${trackingNumber ? ` with tracking number ${trackingNumber}` : ''}.`,
    type: 'info' as const,
    actionUrl: `/profile/orders/${orderId}`,
    actionText: 'Track Order',
  }),

  paymentSuccessful: (amount: number) => ({
    title: 'Payment Successful',
    message: `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
    type: 'success' as const,
  }),

  appointmentReminder: (appointmentDate: string, serviceName: string) => ({
    title: 'Appointment Reminder',
    message: `You have an upcoming ${serviceName} appointment on ${appointmentDate}.`,
    type: 'info' as const,
    actionUrl: '/profile/appointments',
    actionText: 'View Appointments',
  }),

  newMessage: (senderName: string) => ({
    title: 'New Message',
    message: `You have received a new message from ${senderName}.`,
    type: 'info' as const,
    actionUrl: '/profile/messages',
    actionText: 'Read Message',
  }),

  tokensReceived: (amount: number, tokenName: string) => ({
    title: 'Tokens Received',
    message: `You have received ${amount} ${tokenName} tokens.`,
    type: 'success' as const,
    actionUrl: '/profile/wallet',
    actionText: 'View Wallet',
  }),

  eventRegistrationConfirmed: (eventTitle: string, eventDate: string) => ({
    title: 'Event Registration Confirmed',
    message: `Your registration for "${eventTitle}" on ${eventDate} has been confirmed.`,
    type: 'success' as const,
    actionUrl: '/events',
    actionText: 'View Events',
  }),
}

// Helper functions for common notification scenarios
export async function notifyOrderUpdate(userId: string, orderId: string, status: string) {
  let template
  
  switch (status) {
    case 'confirmed':
    case 'processing':
      template = notificationTemplates.orderConfirmed(orderId)
      break
    case 'shipped':
      template = notificationTemplates.orderShipped(orderId)
      break
    default:
      return null
  }

  return createNotification({
    userId,
    ...template,
    triggerToast: true,
    toastDuration: 7000,
  })
}

export async function notifyPaymentSuccess(userId: string, amount: number) {
  const template = notificationTemplates.paymentSuccessful(amount)
  return createNotification({
    userId,
    ...template,
    triggerToast: true,
    toastDuration: 5000,
  })
}

export async function notifyTokensReceived(userId: string, amount: number, tokenName: string = 'INSIDE') {
  const template = notificationTemplates.tokensReceived(amount, tokenName)
  return createNotification({
    userId,
    ...template,
    triggerToast: true,
    toastDuration: 6000,
    persistent: true,
  })
}

export async function notifyAppointmentReminder(userId: string, appointmentDate: string, serviceName: string) {
  const template = notificationTemplates.appointmentReminder(appointmentDate, serviceName)
  return createNotification({
    userId,
    ...template,
    scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours before
    triggerToast: true,
    persistent: true,
  })
}

export async function notifyNewMessage(userId: string, senderName: string) {
  const template = notificationTemplates.newMessage(senderName)
  return createNotification({
    userId,
    ...template,
    triggerToast: true,
    toastDuration: 4000,
  })
}

export async function notifyEventRegistration(userId: string, eventTitle: string, eventDate: string) {
  const template = notificationTemplates.eventRegistrationConfirmed(eventTitle, eventDate)
  return createNotification({
    userId,
    ...template,
    triggerToast: true,
    toastDuration: 6000,
  })
}

// System-wide alerts
export async function sendSystemAlert(
  type: 'maintenance' | 'security' | 'update' | 'announcement',
  title: string,
  message: string,
  severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  targetUsers: 'all' | 'admins' | string[] = 'all'
) {
  try {
    let userIds: string[] = []

    if (Array.isArray(targetUsers)) {
      userIds = targetUsers
    } else if (targetUsers === 'all') {
      const { data: users } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .eq('email_verified', true)
      userIds = users?.map((u: any) => u.id) || []
    } else if (targetUsers === 'admins') {
      const { data: admins } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .eq('role', 'admin')
      userIds = admins?.map((u: any) => u.id) || []
    }

    const notificationType = severity === 'critical' ? 'error' : 
                           severity === 'high' ? 'warning' : 'info'

    const promises = userIds.map(userId => 
      createNotification({
        userId,
        title,
        message,
        type: notificationType,
        triggerToast: true,
        persistent: severity === 'critical' || severity === 'high',
        toastDuration: severity === 'critical' ? 10000 : 7000,
      })
    )

    const results = await Promise.allSettled(promises)
    const successful = results.filter(r => r.status === 'fulfilled').length

    console.log(`System alert sent: ${type} - ${successful}/${userIds.length} users notified`)
    
    return { successful, failed: userIds.length - successful, total: userIds.length }
  } catch (error) {
    console.error('Error sending system alert:', error)
    return { successful: 0, failed: 0, total: 0 }
  }
}
