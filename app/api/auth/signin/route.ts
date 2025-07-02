import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { email, password } = signInSchema.parse(json)

    const response = NextResponse.next()
    const supabase = createRouteHandlerClient(request, response)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    // Update last sign in time in profile
    if (data.user) {
      await supabase
        .from('user_profiles')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', data.user.id)
    }

    return NextResponse.json(
      {
        message: 'Signed in successfully',
        user: data.user,
        session: data.session,
      },
      { 
        status: 200,
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error('Sign in error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
