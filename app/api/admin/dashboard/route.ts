import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase'
import { 
  asyncHandler, 
  validateMethod,
  successResponse,
  requireAdmin,
} from '@/lib/api-utils'

// Get admin dashboard statistics
export const GET = asyncHandler(async (request: NextRequest) => {
  validateMethod(request, ['GET'])
  
  await requireAdmin(request)

  const response = NextResponse.next()
  const supabase = createRouteHandlerClient(request, response)

  // Get user statistics
  const { count: totalUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })

  const { count: newUsersThisMonth } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

  // Get order statistics
  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  const { data: revenueData } = await supabase
    .from('orders')
    .select('total_amount')
    .eq('status', 'delivered')

  const totalRevenue = revenueData?.reduce((sum: number, order: any) => sum + Number(order.total_amount), 0) || 0

  // Get product statistics
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: lowStockProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .lte('inventory_count', 10)
    .eq('is_active', true)

  // Get blog statistics
  const { count: totalBlogPosts } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  // Get event statistics
  const { count: upcomingEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .gte('start_date', new Date().toISOString())
    .eq('is_public', true)

  // Get recent activity (last 10 orders)
  const { data: recentOrders } = await supabase
    .from('orders')
    .select(`
      id,
      total_amount,
      status,
      created_at,
      user_profiles!orders_user_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // Get top products by sales
  const { data: topProducts } = await supabase
    .from('order_items')
    .select(`
      product_id,
      quantity,
      products!order_items_product_id_fkey(name, price)
    `)
    .limit(10)

  const productSales = topProducts?.reduce((acc: any, item: any) => {
    const productId = item.product_id
    if (!acc[productId]) {
      acc[productId] = {
        name: item.products.name,
        price: item.products.price,
        totalSold: 0,
        revenue: 0,
      }
    }
    acc[productId].totalSold += item.quantity
    acc[productId].revenue += item.quantity * item.products.price
    return acc
  }, {})

  const topSellingProducts = Object.values(productSales || {})
    .sort((a: any, b: any) => b.totalSold - a.totalSold)
    .slice(0, 5)

  const stats = {
    users: {
      total: totalUsers || 0,
      newThisMonth: newUsersThisMonth || 0,
    },
    orders: {
      total: totalOrders || 0,
      revenue: totalRevenue,
    },
    products: {
      total: totalProducts || 0,
      lowStock: lowStockProducts || 0,
    },
    content: {
      blogPosts: totalBlogPosts || 0,
      upcomingEvents: upcomingEvents || 0,
    },
    recentActivity: recentOrders || [],
    topProducts: topSellingProducts,
  }

  return successResponse(stats)
})
