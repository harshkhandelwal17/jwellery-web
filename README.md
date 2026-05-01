# Shreeva Jewellers — Luxury Jewellery E-Commerce Platform

A full-stack luxury jewellery e-commerce monorepo with integrated admin panel. Features dynamic pricing (`Final Price = (Gold Rate × Weight) + Making Charges`), dual theme support (light/dark), and premium luxury design.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env
# Edit .env with your actual values (MongoDB, Cloudinary, API keys)

# 3. Start all services
pnpm dev
```

Access:
- Customer site: http://localhost:3000
- Admin panel: http://localhost:5173
- API: http://localhost:4000

---

## Architecture

```
jwell/
├── apps/
│   ├── web/      Next.js 15 — customer storefront (SSR/ISR)
│   ├── admin/    Vite + React SPA — admin panel
│   └── api/      Node.js + Express — REST API
└── packages/
    ├── types/      @jwell/types      — shared TypeScript interfaces
    ├── utils/      @jwell/utils      — calculatePrice(), formatCurrency(), Zod schemas
    ├── api-client/ @jwell/api-client — typed fetch wrappers
    └── ui/         @jwell/ui         — shared Tailwind tokens
```

| App | URL (local) | Purpose |
|---|---|---|
| Customer site | http://localhost:3000 | Public storefront |
| Admin panel | http://localhost:5173 | Manage products & gold rate |
| API | http://localhost:4000 | REST API |

---

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 10 — Install with: `npm install -g pnpm`
- **MongoDB** — Local instance or MongoDB Atlas account
- **Cloudinary** account (for image hosting)

---

## 📋 Detailed Setup

### 1. Clone & Install

```bash
git clone <repo-url> jwell
cd jwell
pnpm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# API (Backend)
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shreeva
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/shreeva

ADMIN_API_KEY=your-admin-secret-key-here
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Cloudinary (get from cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Webhook/Revalidation
WEB_URL=http://localhost:3000
REVALIDATE_SECRET=your-revalidation-secret-key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Admin Panel
VITE_API_URL=http://localhost:4000/api
```

### 3. Start Services

```bash
# Start all apps simultaneously
pnpm dev

# Or start individually:
pnpm dev:api      # Backend API at http://localhost:4000
pnpm dev:web      # Frontend at http://localhost:3000
pnpm dev:admin    # Admin panel at http://localhost:5173
```

### 4. Seed Initial Data

Once the API is running, seed the gold rate:

```bash
curl -X PUT http://localhost:4000/api/gold-price \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-admin-secret-key-here" \
  -d '{"pricePerGram": 9450}'
```

Optional: Upload product images from local folder:
```bash
cd apps/api
pnpm upload-images
```

---

## 🏗️ Build for Production

```bash
# Build all apps
pnpm build

# Build individually
cd apps/web && npm run build
cd apps/api && npm run build
cd apps/admin && npm run build
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set root directory to `apps/web`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api`
   - `REVALIDATE_SECRET=your-secret`
4. Deploy

### Backend (Render/Railway)
1. Connect GitHub repo to Render
2. Set root directory to `apps/api`
3. Add environment variables (all from .env)
4. Set start command: `npm run build && npm start`
5. Deploy

### Admin Panel (Vercel/Netlify)
1. Connect GitHub repo to Vercel
2. Set root directory to `apps/admin`
3. Add environment variable: `VITE_API_URL=https://your-api.onrender.com/api`
4. Deploy

---

## 📁 Project Structure

```
jwell/
├── apps/
│   ├── web/              # Next.js 16 — Customer storefront
│   ├── admin/            # Vite + React — Admin panel
│   └── api/              # Express.js — REST API
├── packages/
│   ├── types/            # Shared TypeScript interfaces
│   ├── utils/            # Shared utilities (pricing, validation)
│   ├── api-client/       # Typed API client
│   └── ui/               # Shared UI components
├── .env.example          # Environment variables template
├── pnpm-workspace.yaml   # Workspace configuration
├── turbo.json            # Turborepo configuration
└── README.md
```

---

## ⚙️ Environment Variables

All environment variables should be set in the root `.env` file:

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | API port (default: 4000) |
| `NODE_ENV` | No | Environment (development/production) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `ADMIN_API_KEY` | Yes | Secret key for admin routes |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `REVALIDATE_SECRET` | Yes | Secret for ISR webhook |
| `WEB_URL` | Yes | Frontend URL for webhook calls |
| `CORS_ORIGINS` | Yes | Comma-separated allowed origins |
| `NEXT_PUBLIC_API_URL` | Yes | API URL for frontend |
| `VITE_API_URL` | Yes | API URL for admin panel |

---

## 🔌 API Endpoints

All routes are prefixed with `/api`.

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/gold-price` | Public | Current gold rate |
| PUT | `/gold-price` | Admin | Update gold rate |
| GET | `/products` | Public | All products |
| GET | `/products/:id` | Public | Single product |
| POST | `/products` | Admin | Create product |
| PUT | `/products/:id` | Admin | Update product |
| DELETE | `/products/:id` | Admin | Delete product |
| POST | `/enquiries` | Public | Submit enquiry |
| GET | `/enquiries` | Admin | Get all enquiries |

**Admin routes** require `x-admin-key` header with your `ADMIN_API_KEY`.

---

## 💎 Features

- **Dynamic Pricing**: Prices auto-calculate based on gold rate × weight + making charges
- **Dual Theme**: Light and dark mode with luxury gold accent
- **ISR Revalidation**: Gold rate updates trigger cache invalidation
- **Admin Panel**: Manage products, enquiries, and gold rates
- **Cloudinary Integration**: Optimized image hosting
- **Responsive Design**: Mobile-first, works on all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Frontend | Next.js 16, React 19, TypeScript |
| Admin Panel | Vite, React, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Express.js, TypeScript |
| Database | MongoDB + Mongoose |
| Images | Cloudinary |
| Forms | React Hook Form + Zod |

---

## 📝 Common Issues

**Build fails with peer dependency warnings:**
```bash
pnpm install --force
```

**MongoDB connection refused:**
- Ensure MongoDB is running locally
- Or use MongoDB Atlas connection string in .env

**Images not loading:**
- Verify Cloudinary credentials in .env
- Check CLOUDINARY_CLOUD_NAME is correct

**Admin panel can't connect to API:**
- Ensure API is running on port 4000
- Check VITE_API_URL matches API URL
- Verify CORS_ORIGINS includes admin panel URL
