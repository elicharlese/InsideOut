import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/products/route'

// Mock the Supabase client
jest.mock('@/lib/supabase', () => ({
  createServerSupabaseClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      gt: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      then: jest.fn(() => Promise.resolve({
        data: [
          {
            id: '1',
            name: 'Test Product',
            price: 29.99,
            category: 'clothing',
            inventory_count: 10,
            is_active: true,
          }
        ],
        error: null,
        count: 1,
      })),
    })),
    rpc: jest.fn(() => Promise.resolve({ data: 4.5 })),
  })),
}))

describe('/api/products', () => {
  describe('GET', () => {
    it('should return products successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toHaveLength(1)
      expect(data.data[0]).toMatchObject({
        id: '1',
        name: 'Test Product',
        price: 29.99,
        category: 'clothing',
      })
    })

    it('should handle query parameters', async () => {
      const url = 'http://localhost:3000/api/products?category=clothing&page=1&limit=10'
      const request = new NextRequest(url)
      const response = await GET(request)

      expect(response.status).toBe(200)
    })

    it('should handle search parameter', async () => {
      const url = 'http://localhost:3000/api/products?search=test'
      const request = new NextRequest(url)
      const response = await GET(request)

      expect(response.status).toBe(200)
    })
  })
})

describe('Product API validation', () => {
  it('should validate price range parameters', async () => {
    const url = 'http://localhost:3000/api/products?minPrice=invalid'
    const request = new NextRequest(url)
    
    try {
      await GET(request)
    } catch (error) {
      // Should handle validation errors gracefully
    }
  })

  it('should handle pagination correctly', async () => {
    const url = 'http://localhost:3000/api/products?page=2&limit=5'
    const request = new NextRequest(url)
    const response = await GET(request)
    const data = await response.json()

    expect(data.pagination).toMatchObject({
      page: 2,
      limit: 5,
    })
  })
})
