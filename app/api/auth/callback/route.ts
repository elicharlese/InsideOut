import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
      const response = NextResponse.redirect(new URL(next, request.url))
      const supabase = createRouteHandlerClient(request, response)

      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        return response
      }
    }

    // Return the user to an error page with some instructions
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  }
}
