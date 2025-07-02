import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandlerClient } from '@/lib/supabase'
import { 
  asyncHandler, 
  validateRequestBody, 
  validateMethod,
  successResponse,
  requireAuth,
  requireAdmin,
  getPaginationParams,
  getSearchParams
} from '@/lib/api-utils'

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
})

const updatePostSchema = createPostSchema.partial()

// Get blog posts
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  const url = new URL(request.url)
  const { page, limit, offset } = getPaginationParams(url)
  const { search, sort, order } = getSearchParams(url)
  const tag = url.searchParams.get('tag')
  const published = url.searchParams.get('published')

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      user_profiles!blog_posts_author_id_fkey(
        id,
        full_name,
        avatar_url
      )
    `, { count: 'exact' })

  // Filter by published status (default to published only for public access)
  if (published !== 'false') {
    query = query.eq('published', true)
  }

  // Apply search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
  }

  // Filter by tag
  if (tag) {
    query = query.contains('tags', [tag])
  }

  // Apply sorting
  if (sort === 'published_at') {
    query = query.order('published_at', { ascending: order === 'asc', nullsFirst: false })
  } else {
    query = query.order(sort as any, { ascending: order === 'asc' })
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data: posts, error, count } = await query

  if (error) {
    throw new Error('Failed to fetch blog posts')
  }

  return successResponse({
    data: posts || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    }
  })
})

// Create new blog post
export const POST = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['POST'])
  
  const user = await requireAuth(request)
  const postData = await validateRequestBody(request, createPostSchema)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  // Generate slug from title
  const slug = postData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  // Check if slug already exists
  const { data: existingPost } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', slug)
    .single()

  let finalSlug = slug
  if (existingPost) {
    finalSlug = `${slug}-${Date.now()}`
  }

  const { data: post, error } = await supabase
    .from('blog_posts')
    .insert({
      title: postData.title,
      slug: finalSlug,
      content: postData.content,
      excerpt: postData.excerpt,
      featured_image: postData.featuredImage,
      author_id: user.id,
      tags: postData.tags,
      published: postData.published,
      published_at: postData.published ? new Date().toISOString() : null,
    })
    .select(`
      *,
      user_profiles!blog_posts_author_id_fkey(
        id,
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) {
    throw new Error('Failed to create blog post')
  }

  return successResponse(post, 'Blog post created successfully', 201)
})
