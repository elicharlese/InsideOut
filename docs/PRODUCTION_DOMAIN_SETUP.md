# Production Domain Setup Guide

## Domain Configuration for InsideOut

### 1. Domain Registration & DNS Setup

#### Recommended Domain Registrars
- **Cloudflare** (recommended for security and performance)
- **Namecheap**
- **GoDaddy**
- **Google Domains**

#### Suggested Domains
- `insideout.com` (primary)
- `insideout.org` (redirect to .com)
- `insideout.app` (mobile redirect)

### 2. Vercel Domain Configuration

#### Add Domain to Vercel Project

1. **Via Vercel Dashboard:**
   ```
   1. Go to your project settings
   2. Navigate to "Domains" section
   3. Add custom domain: insideout.com
   4. Add www subdomain: www.insideout.com
   ```

2. **DNS Records Required:**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel's IP)
   TTL: 3600

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

#### Environment-Specific Domains
```bash
# Production
NEXT_PUBLIC_APP_URL=https://insideout.com

# Staging  
NEXT_PUBLIC_APP_URL=https://staging.insideout.com

# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. SSL Certificate Setup

Vercel automatically provides SSL certificates via Let's Encrypt for custom domains.

#### Verification Steps:
```bash
# Check SSL certificate
curl -I https://insideout.com

# Verify HTTPS redirect
curl -I http://insideout.com
```

### 4. Subdomain Configuration

#### API Subdomain (Optional)
```
api.insideout.com → points to API routes
```

#### Rust Service Subdomain
```
blockchain.insideout.com → points to Rust service
```

#### CDN/Assets Subdomain
```
cdn.insideout.com → for static assets
```

### 5. Environment Updates

#### Update Environment Variables

**Vercel Environment Variables:**
```bash
NEXT_PUBLIC_APP_URL=https://insideout.com
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
STRIPE_SECRET_KEY=your_production_stripe_key
STRIPE_PUBLISHABLE_KEY=your_production_stripe_publishable_key
```

**Supabase Configuration:**
```sql
-- Update auth redirects in Supabase dashboard
-- Auth > URL Configuration
-- Site URL: https://insideout.com
-- Redirect URLs: 
--   https://insideout.com/auth/callback
--   https://www.insideout.com/auth/callback
```

### 6. Security Headers Configuration

Update `next.config.production.mjs`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://api.stripe.com;",
        },
      ],
    },
  ]
}
```

### 7. Redirects Configuration

#### WWW to Non-WWW Redirect
```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'www.insideout.com',
        },
      ],
      destination: 'https://insideout.com/:path*',
      permanent: true,
    },
  ]
}
```

### 8. Performance Optimization

#### CDN Configuration
- Enable Vercel Edge Network
- Configure asset caching
- Optimize images for production

#### Monitoring Setup
```bash
# Add to package.json
"scripts": {
  "check-domain": "curl -I https://insideout.com",
  "check-ssl": "openssl s_client -connect insideout.com:443 -servername insideout.com",
  "lighthouse": "lighthouse https://insideout.com --output=html --output-path=./lighthouse-report.html"
}
```

### 9. Email Domain Configuration

#### Configure Email Service (Resend)
```bash
# Add DNS records for email sending
Type: TXT
Name: @
Value: "v=spf1 include:_spf.google.com include:sendgrid.net ~all"

Type: DKIM
Name: resend._domainkey
Value: [Resend will provide this]

Type: DMARC
Name: _dmarc
Value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@insideout.com"
```

### 10. Deployment Checklist

#### Pre-Production Verification
- [ ] Domain DNS propagation complete
- [ ] SSL certificate active
- [ ] Environment variables updated
- [ ] Database migrations applied
- [ ] External service configurations updated
- [ ] Email delivery testing
- [ ] Payment processing testing
- [ ] Performance testing completed

#### Go-Live Steps
```bash
1. Update GitHub repository with production config
2. Deploy to Vercel with custom domain
3. Verify all functionality
4. Update monitoring and alerts
5. Notify stakeholders
```

### 11. Post-Launch Monitoring

#### Health Checks
```bash
# Automated monitoring
curl -f https://insideout.com/api/health || exit 1
```

#### Analytics Setup
- Google Analytics 4
- Vercel Analytics
- Performance monitoring

### 12. Backup Domain Strategy

#### Alternative Domains
- Keep backup domains registered
- Configure DNS for quick failover
- Document emergency procedures

---

**Security Notes:**
- Always use HTTPS in production
- Regularly update SSL certificates
- Monitor for domain expiration
- Implement proper CORS policies
- Use security headers consistently

**Performance Notes:**
- Enable gzip compression
- Optimize images and assets
- Use CDN for static content
- Monitor Core Web Vitals
- Implement proper caching strategies
