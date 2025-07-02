import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { email, password, fullName } = signUpSchema.parse(json)

    const response = NextResponse.next()
    const supabase = createRouteHandlerClient(request, response)

    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // If user is created, create profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          email,
          full_name: fullName || null,
          email_verified: false,
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
        // Don't fail the request, as the auth user was created successfully
      }
    }

    return NextResponse.json(
      {
        message: 'User created successfully. Please check your email to verify your account.',
        user: authData.user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Sign up error:', error)
    
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
