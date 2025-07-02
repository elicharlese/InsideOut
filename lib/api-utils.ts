import { NextRequest, NextResponse } from 'next/server'
import { ZodError, ZodSchema } from 'zod'
import { ApiResponse } from './types'

// Custom API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Success response helper
export function successResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: statusCode }
  )
}

// Error response helper
export function errorResponse(
  error: string | Error,
  statusCode: number = 500,
  code?: string
): NextResponse<ApiResponse> {
  const message = error instanceof Error ? error.message : error

  return NextResponse.json(
    {
      success: false,
      error: message,
      code,
    },
    { status: statusCode }
  )
}

// Validation error response helper
export function validationErrorResponse(
  error: ZodError
): NextResponse<ApiResponse> {
  const message = error.errors.map((err) => 
    `${err.path.join('.')}: ${err.message}`
  ).join(', ')

  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      message,
      code: 'VALIDATION_ERROR'
    },
    { status: 400 }
  )
}

// Async handler wrapper with error handling
export function asyncHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      console.error('API Error:', error)

      if (error instanceof ApiError) {
        return errorResponse(error.message, error.statusCode, error.code)
      }

      if (error instanceof ZodError) {
        return validationErrorResponse(error)
      }

      return errorResponse('Internal server error', 500)
    }
  }
}

// Request body validation helper
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      throw error
    }
    throw new ApiError('Invalid JSON in request body', 400)
  }
}

// Query parameters validation helper
export function validateQueryParams<T>(
  url: URL,
  schema: ZodSchema<T>
): T {
  const params = Object.fromEntries(url.searchParams.entries())
  return schema.parse(params)
}

// HTTP method validation
export function validateMethod(
  request: NextRequest,
  allowedMethods: string[]
): void {
  if (!allowedMethods.includes(request.method)) {
    throw new ApiError(
      `Method ${request.method} not allowed`,
      405,
      'METHOD_NOT_ALLOWED'
    )
  }
}

// Pagination helper
export function getPaginationParams(url: URL) {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '10')))
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

// Search and filter helpers
export function getSearchParams(url: URL) {
  return {
    search: url.searchParams.get('search') || '',
    category: url.searchParams.get('category') || '',
    sort: url.searchParams.get('sort') || 'created_at',
    order: url.searchParams.get('order') === 'asc' ? 'asc' : 'desc',
  }
}

// Rate limiting helper (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  request: NextRequest,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const ip = request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'unknown'
  const now = Date.now()
  
  const clientData = requestCounts.get(ip)
  
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (clientData.count >= maxRequests) {
    return false
  }
  
  clientData.count++
  return true
}

// CORS headers helper
export function setCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  return response
}

// Authentication helper
export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('Authentication required', 401, 'AUTH_REQUIRED')
  }
  
  const token = authHeader.substring(7)
  
  // Verify JWT token with Supabase
  const { createRouteHandlerClient } = await import('./supabase')
  const response = new NextResponse()
  const supabase = createRouteHandlerClient(request, response)
  
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    throw new ApiError('Invalid or expired token', 401, 'INVALID_TOKEN')
  }
  
  return user
}

// Admin role check
export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request)
  
  const { createRouteHandlerClient } = await import('./supabase')
  const response = new NextResponse()
  const supabase = createRouteHandlerClient(request, response)
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    throw new ApiError('Admin access required', 403, 'ADMIN_REQUIRED')
  }
  
  return user
}
