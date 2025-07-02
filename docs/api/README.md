# API Reference

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://insideout.com/api`

## Authentication

### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "preferredPronouns": "they/them"
}
```

### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Sign Out
```http
POST /api/auth/signout
Authorization: Bearer <token>
```

## Products

### List Products
```http
GET /api/products?page=1&limit=20&category=clothing&search=shirt
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `category` (string): Filter by category (clothing, accessories, gender-affirming, wellness)
- `search` (string): Search in name and description
- `sort` (string): Sort by field (created_at, price, name)
- `order` (string): Sort order (asc, desc)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `inStock` (boolean): Only show in-stock items

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "clothing",
      "images": ["url1", "url2"],
      "inventory_count": 10,
      "is_active": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Get Product by ID
```http
GET /api/products/{id}
```

## Cart

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /api/cart/{itemId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/{itemId}
Authorization: Bearer <token>
```

## Orders

### Get Orders
```http
GET /api/orders?page=1&limit=10
Authorization: Bearer <token>
```

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "US"
  },
  "paymentMethodId": "stripe_payment_method_id"
}
```

### Get Order by ID
```http
GET /api/orders/{id}
Authorization: Bearer <token>
```

## Blog

### List Blog Posts
```http
GET /api/blog?page=1&limit=10&published=true&tag=health
```

**Query Parameters:**
- `page`, `limit`: Pagination
- `published` (boolean): Filter by published status
- `tag` (string): Filter by tag
- `search` (string): Search in title and content

### Get Blog Post
```http
GET /api/blog/{id}
```

### Create Blog Post
```http
POST /api/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content in markdown",
  "excerpt": "Short description",
  "featuredImage": "https://example.com/image.jpg",
  "tags": ["health", "tips"],
  "published": true
}
```

### Update Blog Post
```http
PUT /api/blog/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

## Events

### List Events
```http
GET /api/events?upcoming=true&page=1&limit=10
```

### Get Event
```http
GET /api/events/{id}
```

### Create Event (Admin)
```http
POST /api/events
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Community Meetup",
  "description": "Monthly community gathering",
  "startDate": "2023-12-01T18:00:00Z",
  "endDate": "2023-12-01T20:00:00Z",
  "location": "Community Center",
  "maxAttendees": 50,
  "registrationRequired": true
}
```

### Register for Event
```http
POST /api/events/{id}/register
Authorization: Bearer <token>
```

## Services

### List Services
```http
GET /api/services?category=healthcare&page=1&limit=10
```

### Get Service
```http
GET /api/services/{id}
```

## Resources

### List Resources
```http
GET /api/resources?category=financial&page=1&limit=10
```

### Get Resource
```http
GET /api/resources/{id}
```

## Blockchain

### Get User Transactions
```http
GET /api/blockchain?limit=50&offset=0
Authorization: Bearer <token>
```

### Mint Tokens
```http
POST /api/blockchain
Authorization: Bearer <token>
Content-Type: application/json

{
  "mintAddress": "solana_mint_address",
  "destinationAddress": "user_wallet_address",
  "amount": 1000,
  "authority": "mint_authority_address"
}
```

### Transfer Tokens
```http
POST /api/blockchain/transfer
Authorization: Bearer <token>
Content-Type: application/json

{
  "mintAddress": "solana_mint_address",
  "fromAddress": "sender_wallet_address",
  "toAddress": "recipient_wallet_address",
  "amount": 500,
  "owner": "owner_address"
}
```

## User Profile

### Get Profile
```http
GET /api/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Updated Name",
  "bio": "My bio",
  "preferredPronouns": "she/her"
}
```

### Upload Avatar
```http
POST /api/profile/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image_file>
```

## Appointments

### List Appointments
```http
GET /api/appointments?page=1&limit=10
Authorization: Bearer <token>
```

### Create Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "uuid",
  "title": "Consultation",
  "appointmentDate": "2023-12-01T14:00:00Z",
  "durationMinutes": 60,
  "notes": "First consultation"
}
```

### Update Appointment
```http
PUT /api/appointments/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Updated notes"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `AUTH_REQUIRED` (401): Authentication required
- `INVALID_TOKEN` (401): Invalid or expired token
- `ADMIN_REQUIRED` (403): Admin access required
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Input validation failed
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Internal server error

## Rate Limiting

API endpoints are rate limited:

- **General endpoints**: 100 requests per 15 minutes
- **Authentication endpoints**: 10 requests per 15 minutes
- **File upload endpoints**: 20 requests per 15 minutes

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```
