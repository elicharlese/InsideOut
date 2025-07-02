import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { 
  asyncHandler, 
  validateRequestBody, 
  validateMethod,
  successResponse,
  requireAuth,
} from '@/lib/api-utils'

const RUST_SERVICE_URL = process.env.RUST_SERVICE_URL || 'http://localhost:8080'
const RUST_SERVICE_API_KEY = process.env.RUST_SERVICE_API_KEY

const mintTokensSchema = z.object({
  mintAddress: z.string().min(1),
  destinationAddress: z.string().min(1),
  amount: z.number().positive(),
  authority: z.string().min(1),
})

const transferTokensSchema = z.object({
  mintAddress: z.string().min(1),
  fromAddress: z.string().min(1),
  toAddress: z.string().min(1),
  amount: z.number().positive(),
  owner: z.string().min(1),
})

// Helper function to call Rust service
async function callRustService(endpoint: string, method: string = 'GET', body?: any) {
  const url = `${RUST_SERVICE_URL}${endpoint}`
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(RUST_SERVICE_API_KEY && { 'Authorization': `Bearer ${RUST_SERVICE_API_KEY}` })
    },
  }

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `Rust service error: ${response.status}`)
  }

  return response.json()
}

// Get user's blockchain transactions
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  const user = await requireAuth(request)
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '50')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  const response = await callRustService(
    `/transactions?user_id=${user.id}&limit=${limit}&offset=${offset}`
  )

  return successResponse(response.data)
})

// Mint tokens to user's wallet
export const POST = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['POST'])
  
  const user = await requireAuth(request)
  const { mintAddress, destinationAddress, amount, authority } = await validateRequestBody(
    request, 
    mintTokensSchema
  )

  // Call Rust service to mint tokens
  const response = await callRustService('/mint/tokens', 'POST', {
    user_id: user.id,
    mint_address: mintAddress,
    destination_address: destinationAddress,
    amount,
    authority,
  })

  return successResponse(response.data, 'Tokens minted successfully')
})
