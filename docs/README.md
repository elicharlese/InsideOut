# InsideOut Backend Documentation

## Overview

InsideOut is a comprehensive platform for transgender healthcare, resources, and community support. This documentation covers the backend architecture, API endpoints, database schema, and deployment procedures.

## Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Blockchain**: Rust Solana SDK
- **Payment**: Stripe
- **Email**: Resend
- **File Storage**: UploadThing
- **Deployment**: Vercel
- **Monitoring**: Sentry

### System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Next.js API    │    │   Supabase      │
│   (Next.js)     │◄──►│   Routes         │◄──►│   (PostgreSQL)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Rust Solana    │
                       │   Service        │
                       └──────────────────┘
```

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL (via Supabase)
- Rust 1.70+ (for blockchain service)

### Environment Setup

1. Copy environment variables:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your credentials:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Other services...
```

3. Install dependencies:
```bash
pnpm install
```

4. Run database migrations:
```bash
npx supabase db reset
```

5. Start development servers:
```bash
# Frontend/API
pnpm dev

# Rust Solana Service (separate terminal)
cd rust-solana-service
cargo run
```

## API Documentation

See [API Reference](./api/README.md) for detailed endpoint documentation.

### Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <supabase_jwt_token>
```

### Response Format

All API responses follow this structure:

```typescript
{
  success: boolean
  data?: any
  error?: string
  message?: string
}
```

### Pagination

List endpoints support pagination:

```
GET /api/products?page=1&limit=20
```

Response includes pagination metadata:

```typescript
{
  success: true,
  data: [...],
  pagination: {
    page: 1,
    limit: 20,
    total: 100,
    totalPages: 5
  }
}
```

## Database Schema

See [Database Schema](./database/README.md) for complete schema documentation.

### Key Tables

- `user_profiles` - User account information
- `products` - E-commerce products
- `orders` - Order history
- `blog_posts` - Blog content
- `events` - Community events
- `services` - Healthcare services
- `resources` - Community resources
- `blockchain_transactions` - Blockchain activity

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Rust Service Deployment

The Rust Solana service can be deployed to:

- **Fly.io** (recommended)
- **Railway**
- **AWS ECS**
- **Digital Ocean App Platform**

Example Fly.io deployment:

```bash
cd rust-solana-service
flyctl launch
flyctl deploy
```

## Testing

### Unit Tests
```bash
pnpm test
```

### API Tests
```bash
pnpm test:api
```

### E2E Tests
```bash
pnpm test:e2e
```

### Coverage
```bash
pnpm test:coverage
```

## Monitoring & Logging

### Error Tracking
- Sentry for error monitoring
- Custom error handlers in API routes

### Performance Monitoring
- Vercel Analytics
- Database query optimization
- API response time tracking

### Logging
- Structured logging with timestamps
- Log levels: ERROR, WARN, INFO, DEBUG
- Sensitive data exclusion

## Security

### Authentication & Authorization
- JWT-based authentication via Supabase
- Row Level Security (RLS) policies
- Role-based access control (RBAC)

### Data Protection
- HTTPS everywhere
- Input validation with Zod
- SQL injection prevention
- XSS protection
- CORS configuration

### API Security
- Rate limiting
- Request/response sanitization
- Audit logging for sensitive operations

## Contributing

See [Contributing Guide](./CONTRIBUTING.md) for development guidelines.

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Test coverage > 80%

### Pull Request Process
1. Create feature branch
2. Write tests
3. Update documentation
4. Submit PR for review
5. Pass CI/CD checks

## Support

For technical support or questions:

- Create an issue on GitHub
- Contact: tech@insideout.com
- Documentation: [docs.insideout.com](https://docs.insideout.com)
