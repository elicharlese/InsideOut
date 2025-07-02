import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.next()
    const supabase = createRouteHandlerClient(request, response)

    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Signed out successfully' },
      { 
        status: 200,
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
