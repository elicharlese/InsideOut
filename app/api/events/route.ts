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

const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().optional(),
  virtualLink: z.string().url().optional(),
  maxAttendees: z.number().int().positive().optional(),
  isPublic: z.boolean().default(true),
  registrationRequired: z.boolean().default(false),
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"]
})

// Get events
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  const url = new URL(request.url)
  const { page, limit, offset } = getPaginationParams(url)
  const { search, sort, order } = getSearchParams(url)
  const upcoming = url.searchParams.get('upcoming') === 'true'

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  let query = supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('is_public', true)

  // Filter upcoming events
  if (upcoming) {
    query = query.gte('start_date', new Date().toISOString())
  }

  // Apply search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`)
  }

  // Apply sorting (default to start_date)
  const sortField = sort === 'created_at' ? 'created_at' : 'start_date'
  query = query.order(sortField, { ascending: order === 'asc' })

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data: events, error, count } = await query

  if (error) {
    throw new Error('Failed to fetch events')
  }

  return successResponse({
    data: events || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    }
  })
})

// Create new event (admin only)
export const POST = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['POST'])
  
  await requireAdmin(request)
  const eventData = await validateRequestBody(request, createEventSchema)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  const { data: event, error } = await supabase
    .from('events')
    .insert({
      title: eventData.title,
      description: eventData.description,
      start_date: eventData.startDate,
      end_date: eventData.endDate,
      location: eventData.location,
      virtual_link: eventData.virtualLink,
      max_attendees: eventData.maxAttendees,
      is_public: eventData.isPublic,
      registration_required: eventData.registrationRequired,
    })
    .select()
    .single()

  if (error) {
    throw new Error('Failed to create event')
  }

  return successResponse(event, 'Event created successfully', 201)
})
