# Shreeva Jewellers — Project Delivery

## What's Included

This zip file contains the complete Shreeva Jewellers e-commerce platform with:
- **Frontend** (Next.js 16) - Customer storefront with luxury design
- **Admin Panel** (Vite + React) - Product and enquiry management
- **Backend API** (Express.js) - REST API with MongoDB
- **Shared Packages** - Types, utilities, API client

---

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your values:
# - MONGODB_URI: Your MongoDB connection string
# - CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name
# - CLOUDINARY_API_KEY: Your Cloudinary API key
# - CLOUDINARY_API_SECRET: Your Cloudinary API secret
# - ADMIN_API_KEY: Generate a random secret (e.g., using openssl rand -hex 32)
# - REVALIDATE_SECRET: Generate a random secret
```

### 3. Start Development
```bash
pnpm dev
```

This starts:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:5173
- API: http://localhost:4000

### 4. Seed Initial Data
Once the API is running, seed the gold rate:
```bash
curl -X PUT http://localhost:4000/api/gold-price \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_API_KEY" \
  -d '{"pricePerGram": 9450}'
```

---

## Requirements

- **Node.js** ≥ 20
- **pnpm** ≥ 10 (install with: `npm install -g pnpm`)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary** account

---

## Build for Production

```bash
pnpm build
```

This builds all apps in the correct order.

---

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for:
- Vercel (Frontend)
- Render (Backend API)
- Vercel/Netlify (Admin Panel)

---

## Project Structure

```
jwell/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── admin/        # Vite admin panel
│   └── api/          # Express backend
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── utils/        # Shared utilities
│   ├── api-client/   # API client
│   └── ui/           # Shared UI components
├── .env.example      # Environment template
├── README.md         # Full documentation
├── SETUP.md          # Quick setup guide
└── DEPLOYMENT.md     # Deployment guide
```

---

## Features

- **Luxury Design**: Dark theme with gold accents, light theme support
- **Dynamic Pricing**: Prices auto-calculate based on gold rate × weight + making charges
- **Admin Panel**: Full product and enquiry management
- **Responsive**: Mobile-first design
- **ISR Revalidation**: Gold rate updates trigger cache invalidation
- **Cloudinary Integration**: Optimized image hosting

---

## Common Issues

**Build fails:**
```bash
pnpm install --force
```

**MongoDB connection error:**
- Ensure MongoDB is running locally
- Or use MongoDB Atlas connection string in .env

**Images not loading:**
- Verify Cloudinary credentials in .env

**Admin panel can't connect:**
- Ensure API is running on port 4000
- Check VITE_API_URL in .env

---

## Support

For detailed documentation, see:
- `README.md` - Full project documentation
- `SETUP.md` - Detailed setup instructions
- `DEPLOYMENT.md` - Deployment guide

---

## Version Information

- Node.js: ≥ 20
- pnpm: ≥ 10
- Next.js: 16.2.4
- React: 19.2.4
- TypeScript: 5.9.3

---

**Last Updated**: May 2024
**Version**: 1.0.0
