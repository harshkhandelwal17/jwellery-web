# Jwell — Jewellery E-Commerce Platform

A full-stack jewellery e-commerce monorepo. The defining feature is **dynamic pricing** — `Final Price = (Gold Rate × Weight) + Making Charges`. The price is never stored in the database; it recalculates site-wide the moment the gold rate changes in the admin panel.

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

- Node.js ≥ 20
- pnpm ≥ 10 — `npm install -g pnpm`
- MongoDB Atlas account
- Cloudinary account

---

## Setup

### 1. Clone & install

```bash
git clone <repo-url> jwell
cd jwell
pnpm install
```

### 2. Configure the API

Create `apps/api/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jwell
ADMIN_API_KEY=<generate: openssl rand -hex 32>
CLOUDINARY_CLOUD_NAME=<your cloud name>
CLOUDINARY_API_KEY=<your api key>
CLOUDINARY_API_SECRET=<your api secret>
WEB_URL=http://localhost:3000
REVALIDATE_SECRET=<generate: openssl rand -hex 32>
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
PORT=4000
```

> Get Cloudinary credentials from [cloudinary.com/console](https://cloudinary.com/console) — all three values are on the dashboard home screen.

### 3. Configure the admin panel

Create `apps/admin/.env`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_ADMIN_API_KEY=<same value as ADMIN_API_KEY above>
```

### 4. Configure the customer site

Create `apps/web/.env.local`:

```env
API_URL=http://localhost:4000/api
REVALIDATE_SECRET=<same value as REVALIDATE_SECRET above>
```

### 5. Start dev servers

```bash
# All three apps in parallel
pnpm dev

# Or individually
pnpm dev:api
pnpm dev:web
pnpm dev:admin
```

### 6. Seed an initial gold rate

The API starts with no gold rate — run this once after the API is up:

```bash
curl -X PUT http://localhost:4000/api/gold-price \
  -H "Content-Type: application/json" \
  -H "x-admin-key: <your ADMIN_API_KEY>" \
  -d '{"pricePerGram": 9450}'
```

### 7. Upload product images (optional)

If you have jewellery images in a local folder:

```bash
# Default: uploads 20 images per category from <repo-root>/Jewellery_Data
cd apps/api && pnpm upload-images

# Custom path and limit
JEWELLERY_DATA_PATH=/path/to/images MAX_PER_CATEGORY=30 pnpm upload-images
```

Expected folder structure:

```
Jewellery_Data/
├── ring/
│   ├── ring_001.jpg
│   └── ...
└── necklace/
    ├── necklace_1.jpg
    └── ...
```

---

## Environment Variables Reference

### `apps/api`

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `ADMIN_API_KEY` | Yes | Secret key for admin API routes |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `REVALIDATE_SECRET` | Yes | Shared secret for ISR revalidation webhook |
| `WEB_URL` | Yes | URL of the Next.js app (for ISR webhook calls) |
| `CORS_ORIGINS` | Yes | Comma-separated allowed CORS origins |
| `PORT` | No | API port (default: 4000) |
| `JEWELLERY_DATA_PATH` | No | Path for upload-images script (default: `<repo-root>/Jewellery_Data`) |
| `MAX_PER_CATEGORY` | No | Max images per category for upload-images script (default: 20) |

### `apps/admin`

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | API base URL |
| `VITE_ADMIN_API_KEY` | Yes | Must match `ADMIN_API_KEY` in the API |

### `apps/web`

| Variable | Required | Description |
|---|---|---|
| `API_URL` | Yes | API base URL (server-side only) |
| `REVALIDATE_SECRET` | Yes | Must match `REVALIDATE_SECRET` in the API |

---

## API Endpoints

All routes are prefixed `/api`.

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/gold-price` | Public | Current gold rate |
| PUT | `/gold-price` | Admin | Update gold rate + triggers ISR revalidation |
| GET | `/products` | Public | All products with calculated prices |
| GET | `/products/:id` | Public | Single product with calculated price |
| POST | `/products` | Admin | Create product |
| PUT | `/products/:id` | Admin | Update product |
| DELETE | `/products/:id` | Admin | Delete product |
| POST | `/upload` | Admin | Upload image to Cloudinary |

Admin routes require `x-admin-key: <ADMIN_API_KEY>` header.

---

## Dynamic Pricing

The pricing formula lives in exactly one place:

```
packages/utils/src/pricing.ts → calculatePrice(goldRate, weight, makingCharges)
```

- The API calls it on every `/products` response — prices are never stored in MongoDB
- When the admin updates the gold rate, the API immediately calls the Next.js ISR revalidation webhook, purging the page cache so the new price appears on the storefront within seconds

---

## Tech Stack

| Concern | Choice |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Customer frontend | Next.js 15 App Router (SSR/ISR) |
| Admin frontend | Vite + React SPA |
| Styling | Tailwind CSS |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |
| Image hosting | Cloudinary |
| Forms | React Hook Form + Zod |
| Admin UI | Shadcn/ui |
