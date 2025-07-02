import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Basic health checks
    const checks = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      status: 'healthy',
      checks: {
        database: 'unknown',
        rust_service: 'unknown',
        external_services: 'unknown',
      }
    }

    // Check database connection
    try {
      const { createServerSupabaseClient } = await import('@/lib/supabase')
      const supabase = await createServerSupabaseClient()
      
      // Simple query to check DB connection
      const { error } = await supabase
        .from('user_profiles')
        .select('id')
        .limit(1)
        .single()
      
      checks.checks.database = error && error.code !== 'PGRST116' ? 'unhealthy' : 'healthy'
    } catch (error) {
      checks.checks.database = 'unhealthy'
    }

    // Check Rust service connection
    try {
      const rustServiceUrl = process.env.RUST_SERVICE_URL || 'http://localhost:8080'
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch(`${rustServiceUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      checks.checks.rust_service = response.ok ? 'healthy' : 'unhealthy'
    } catch (error) {
      checks.checks.rust_service = 'unhealthy'
    }

    // Check external services (simplified)
    try {
      // Check if environment variables are set
      const requiredEnvVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'STRIPE_SECRET_KEY',
        'RESEND_API_KEY',
      ]
      
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
      checks.checks.external_services = missingVars.length === 0 ? 'healthy' : 'degraded'
    } catch (error) {
      checks.checks.external_services = 'unhealthy'
    }

    // Determine overall status
    const hasUnhealthy = Object.values(checks.checks).some(status => status === 'unhealthy')
    const hasDegraded = Object.values(checks.checks).some(status => status === 'degraded')
    
    if (hasUnhealthy) {
      checks.status = 'unhealthy'
    } else if (hasDegraded) {
      checks.status = 'degraded'
    }

    const statusCode = checks.status === 'healthy' ? 200 : 
                      checks.status === 'degraded' ? 200 : 503

    return NextResponse.json(checks, { status: statusCode })
    
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}
