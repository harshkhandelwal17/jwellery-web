# Jewellery Website — Frontend Monorepo Plan

## Context

Building a jewellery e-commerce website from scratch as a monorepo. The critical feature is **dynamic pricing**: `Final Price = (Gold Price × Weight) + Making Charges` — price is never stored in the DB and must update site-wide the moment the admin changes the gold rate.

The monorepo contains two frontend apps (customer site + admin panel), a Node.js backend, and three shared packages that keep types, the pricing formula, and UI tokens consistent across all apps.

---

## Tech Stack

| Concern             | Choice                                | Reason                                                                    |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| Monorepo tooling    | pnpm workspaces + Turborepo           | Zero-config workspace protocol, parallel builds, build caching            |
| Customer frontend   | Next.js 14 App Router                 | SSR/ISR for product pages (SEO + no price flash), React Server Components |
| Admin frontend      | Vite + React SPA                      | No SEO needed; lighter and faster to scaffold for a private tool          |
| Styling             | Tailwind CSS + custom luxury preset   | Shared Tailwind preset enforces design consistency across both apps       |
| Admin UI components | Shadcn/ui                             | Tables, forms, dialogs pre-built — saves ~1 day on admin UI               |
| Server state        | TanStack Query                        | Caching, background refetch, mutation lifecycle                           |
| Client state        | Zustand                               | Optimistic gold price update only — 3-line store                          |
| Forms               | React Hook Form + Zod                 | Shared Zod schemas from `@jwell/utils` used on both FE and BE             |
| Backend             | Node.js + Express + TypeScript        | Straightforward API server                                                |
| Database            | MongoDB + Mongoose                    | User preference                                                           |
| Images              | Cloudinary                            | Upload + CDN + auto-optimization; URL stored in MongoDB                   |
| 3D rendering        | React Three Fiber + @react-three/drei | React wrapper for Three.js; `useGLTF` loads real jewellery GLTF models    |
| 3D models source    | Sketchfab (free GLTF downloads)       | Real jewellery assets — rings, necklaces, earrings, bracelets             |

---

## Monorepo Folder Structure

```
jwell/
├── package.json                    # root — workspace scripts
├── pnpm-workspace.yaml             # packages: ['apps/*', 'packages/*']
├── turbo.json                      # build pipeline
├── tsconfig.base.json              # shared strict TS base
├── .gitignore
│
├── apps/
│   ├── web/                        # Next.js 14 — customer site
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts      # extends @jwell/ui/tailwind-preset
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx      # root layout — fonts, global CSS
│   │       │   ├── page.tsx        # Homepage /
│   │       │   ├── products/
│   │       │   │   ├── page.tsx            # /products
│   │       │   │   └── [id]/page.tsx       # /products/:id
│   │       │   ├── contact/page.tsx        # /contact
│   │       │   └── api/revalidate/route.ts # ISR cache purge webhook
│   │       ├── components/
│   │       │   ├── layout/         Header.tsx, Footer.tsx, MobileNav.tsx
│   │       │   ├── home/           HeroSection.tsx, CategoriesSection.tsx,
│   │       │   │                   FeaturedProducts.tsx, AboutSection.tsx,
│   │       │   │                   WhyChooseUs.tsx, CTASection.tsx
│   │       │   ├── products/       ProductGrid.tsx, ProductCard.tsx,
│   │       │   │                   ProductImageGallery.tsx, ProductDetails.tsx,
│   │       │   │                   PriceDisplay.tsx, EnquiryButton.tsx
│   │       │   ├── three/
│   │       │   │   ├── ModelViewer.tsx       # 'use client' — R3F Canvas + OrbitControls
│   │       │   │   ├── JewelleryModel.tsx    # useGLTF loader + auto-rotate + lighting
│   │       │   │   └── ModelFallback.tsx     # shown while GLTF loads (skeleton/spinner)
│   │       │   └── contact/        ContactForm.tsx, BusinessDetails.tsx
│   │       ├── lib/
│   │       │   └── api.ts          # server-side fetch wrappers (RSC)
│   │       └── styles/globals.css
│   │
│   ├── admin/                      # Vite + React SPA — admin panel
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts      # extends @jwell/ui/tailwind-preset
│   │   ├── tsconfig.json
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx             # React Router v6 root
│   │       ├── routes/
│   │       │   ├── DashboardPage.tsx
│   │       │   ├── GoldPricePage.tsx
│   │       │   ├── ProductsPage.tsx
│   │       │   └── ProductFormPage.tsx
│   │       ├── components/
│   │       │   ├── layout/         AdminLayout.tsx, Sidebar.tsx
│   │       │   ├── gold-price/     GoldPriceForm.tsx
│   │       │   └── products/       ProductTable.tsx, ProductForm.tsx
│   │       ├── store/
│   │       │   └── goldPriceStore.ts  # Zustand optimistic update
│   │       └── styles/globals.css
│   │
│   └── api/                        # Node.js + Express backend
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           ├── config/db.ts        # Mongoose connect
│           ├── models/             GoldPrice.model.ts, Product.model.ts
│           ├── routes/             goldPrice.routes.ts, products.routes.ts
│           ├── controllers/        goldPrice.controller.ts, products.controller.ts
│           ├── services/           goldPrice.service.ts, products.service.ts
│           ├── middleware/         auth.middleware.ts, validate.middleware.ts, errorHandler.ts
│           └── upload/
            ├── cloudinary.ts       # cloudinary SDK config
            └── upload.middleware.ts # multer-storage-cloudinary
│
└── packages/
    ├── types/                      # @jwell/types — zero runtime, pure TS interfaces
    │   └── src/
    │       ├── product.ts          # Product, ProductWithPrice
    │       ├── goldPrice.ts        # GoldPrice
    │       └── api.ts              # ApiResponse<T>
    │
    ├── utils/                      # @jwell/utils — pure functions, no framework deps
    │   └── src/
    │       ├── pricing.ts          # calculatePrice() — THE canonical formula
    │       ├── formatting.ts       # formatCurrency(), formatWeight()
    │       └── validation.ts       # Zod schemas shared by FE + BE
    │
    ├── api-client/                 # @jwell/api-client — typed fetch wrappers
    │   └── src/
    │       ├── client.ts           # base fetch config
    │       ├── goldPrice.ts        # getGoldPrice(), updateGoldPrice()
    │       └── products.ts         # getProducts(), getProduct(), CRUD mutations
    │
    └── ui/                         # @jwell/ui — shared Tailwind preset + base components
        ├── tailwind-preset.ts      # ALL luxury design tokens
        └── src/components/
            Button.tsx, Card.tsx, Input.tsx, Badge.tsx,
            LoadingSkeleton.tsx, PriceTag.tsx
```

---

## Backend Implementation Detail

### Mongoose Models (`apps/api/src/models/`)

```typescript
// GoldPrice.model.ts
const GoldPriceSchema = new Schema({
  pricePerGram: { type: Number, required: true, min: 0 },
  updatedAt: { type: Date, default: Date.now },
});
// Only one document ever exists — use findOneAndUpdate with upsert

// Product.model.ts
const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    weight: { type: Number, required: true, min: 0 }, // grams
    makingCharges: { type: Number, required: true, min: 0 }, // flat INR
    image: { type: String, required: true }, // Cloudinary URL
    category: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);
// NOTE: no `finalPrice` field — enforced at schema level
```

### API Endpoints (all prefixed `/api`)

| Method | Route           | Auth   | Description                                  |
| ------ | --------------- | ------ | -------------------------------------------- |
| GET    | `/gold-price`   | Public | Returns current gold rate                    |
| PUT    | `/gold-price`   | Admin  | Updates gold rate, triggers ISR revalidation |
| GET    | `/products`     | Public | All products with `calculatedPrice`          |
| GET    | `/products/:id` | Public | Single product with `calculatedPrice`        |
| POST   | `/products`     | Admin  | Create product                               |
| PUT    | `/products/:id` | Admin  | Update product                               |
| DELETE | `/products/:id` | Admin  | Delete product                               |
| POST   | `/upload`       | Admin  | Upload image to Cloudinary, returns URL      |

### Service Layer (`apps/api/src/services/`)

```typescript
// products.service.ts
import { calculatePrice } from "@jwell/utils"; // canonical formula

async function getProducts(): Promise<ProductWithPrice[]> {
  const [products, goldDoc] = await Promise.all([
    Product.find().lean(),
    GoldPrice.findOne().lean(),
  ]);
  const goldRate = goldDoc?.pricePerGram ?? 0;
  return products.map((p) => ({
    ...p,
    id: p._id.toString(),
    calculatedPrice: calculatePrice(goldRate, p.weight, p.makingCharges),
    goldPriceUsed: goldRate,
  }));
}

// goldPrice.service.ts
async function updateGoldPrice(pricePerGram: number): Promise<GoldPrice> {
  const doc = await GoldPriceModel.findOneAndUpdate(
    {},
    { pricePerGram, updatedAt: new Date() },
    { upsert: true, new: true },
  );
  // Trigger ISR revalidation on Next.js
  await fetch(`${process.env.WEB_URL}/api/revalidate`, {
    method: "POST",
    headers: { "x-revalidate-secret": process.env.REVALIDATE_SECRET! },
  });
  return doc;
}
```

### Controllers (`apps/api/src/controllers/`)

Controllers are thin — validate input, call service, return response.

```typescript
// products.controller.ts
async function list(req, res, next) {
  try {
    const products = await productsService.getProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const parsed = CreateProductSchema.parse(req.body); // Zod from @jwell/utils
    const product = await productsService.createProduct(parsed);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}
```

### Middleware (`apps/api/src/middleware/`)

```typescript
// auth.middleware.ts — API key check on admin routes
function requireAdminKey(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (key !== process.env.ADMIN_API_KEY)
    return res.status(401).json({ error: "Unauthorized" });
  next();
}

// validate.middleware.ts — Zod schema validation factory
function validate(schema: ZodSchema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json({ errors: result.error.issues });
    req.body = result.data;
    next();
  };
}

// errorHandler.ts — last middleware
function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  res
    .status(status)
    .json({ success: false, error: err.message ?? "Internal error" });
}
```

### Cloudinary Upload (`apps/api/src/upload/`)

```typescript
// cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };

// upload.middleware.ts
import { CloudinaryStorage } from "multer-storage-cloudinary";
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "jwell/products", allowed_formats: ["jpg", "png", "webp"] },
});
export const uploadImage = multer({ storage }).single("image");

// Route: POST /api/upload
router.post("/upload", requireAdminKey, uploadImage, (req, res) => {
  res.json({ success: true, url: (req.file as any).path });
});
```

### Environment Variables

```
# apps/api/.env
MONGODB_URI=mongodb+srv://...
ADMIN_API_KEY=your-secret-key
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
WEB_URL=https://your-next-app.vercel.app
REVALIDATE_SECRET=another-secret
PORT=4000

# apps/web/.env.local
API_URL=http://localhost:4000/api          # server-side (RSC)
NEXT_PUBLIC_API_URL=http://localhost:4000/api  # client-side (contact form submit)
REVALIDATE_SECRET=another-secret

# apps/admin/.env
VITE_API_URL=http://localhost:4000/api
VITE_ADMIN_API_KEY=your-secret-key
```

---

## Key Type Definitions (`@jwell/types`)

```typescript
// product.ts
interface Product {
  id: string; // MongoDB _id as string
  name: string;
  weight: number; // grams
  makingCharges: number;
  image: string; // Cloudinary URL
  category: string;
  description: string;
}

interface ProductWithPrice extends Product {
  calculatedPrice: number; // (goldPrice * weight) + makingCharges
  goldPriceUsed: number; // gold rate at time of calculation
}
```

---

## Luxury Design Tokens (`packages/ui/tailwind-preset.ts`)

This file drives the entire visual identity of both apps. Define it carefully before building any components.

```typescript
// Key tokens
colors: {
  gold:    { 400: '#d4a017', 500: '#b8860b' },   // CTA, accents
  charcoal:{ 800: '#1a1a1a', 900: '#0d0d0d' },   // text, hero bg
  ivory:   { 50: '#fdfcf8', 100: '#f7f3eb' },     // page bg, cards
},
fontFamily: {
  display: ['Cormorant Garamond', 'serif'],  // headings
  body:    ['Inter', 'sans-serif'],
  price:   ['Playfair Display', 'serif'],    // price display
},
boxShadow: {
  'luxury-card':  '0 4px 24px -4px rgba(180,140,11,0.12)',
  'luxury-hover': '0 8px 40px -4px rgba(180,140,11,0.22)',
}
```

---

## 3D Product Display (React Three Fiber)

### Model Assets

Download free GLTF jewellery models from Sketchfab (filter: free + downloadable):

- Ring model → `apps/web/public/models/ring.glb`
- Necklace model → `apps/web/public/models/necklace.glb`
- Earrings model → `apps/web/public/models/earrings.glb`
- Bracelet model → `apps/web/public/models/bracelet.glb`

Each product in MongoDB gets a `modelPath` field (e.g., `/models/ring.glb`). Fall back to Cloudinary image if no model exists.

### Package Dependencies (`apps/web`)

```
@react-three/fiber    # React renderer for Three.js
@react-three/drei     # helpers: OrbitControls, useGLTF, Environment, Stage
three                 # Three.js core
@types/three
```

### Component Architecture

```typescript
// components/three/ModelViewer.tsx  — 'use client'
// Used on Product Detail page — full interactive viewer
export function ModelViewer({ modelPath }: { modelPath: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ height: 500 }}>
      <Suspense fallback={<ModelFallback />}>
        <Stage environment="studio" intensity={0.6}>
          <JewelleryModel path={modelPath} />
        </Stage>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
      </Suspense>
    </Canvas>
  );
}

// components/three/JewelleryModel.tsx
function JewelleryModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  useFrame((_, delta) => {
    scene.rotation.y += delta * 0.3;   // gentle auto-rotate
  });
  return <primitive object={scene} />;
}

// Preload all models at app startup (reduces first-load stutter)
useGLTF.preload('/models/ring.glb');
useGLTF.preload('/models/necklace.glb');
useGLTF.preload('/models/earrings.glb');
useGLTF.preload('/models/bracelet.glb');
```

### Where 3D Is Used

| Location               | Component          | Behaviour                                                  |
| ---------------------- | ------------------ | ---------------------------------------------------------- |
| Product Detail page    | `<ModelViewer />`  | Full interactive: zoom, drag, auto-rotate, studio lighting |
| Product Card (listing) | `<Canvas>` mini    | Small 150×150 canvas, auto-rotate only, no controls        |
| Hero section           | `<Canvas>` ambient | Slowly rotating hero jewellery piece as background accent  |

### Next.js RSC Compatibility

`@react-three/fiber` requires a browser DOM — it cannot run in React Server Components. Both `ModelViewer` and `JewelleryModel` must be `'use client'` components and dynamically imported on the page:

```typescript
// app/products/[id]/page.tsx  (Server Component)
const ModelViewer = dynamic(
  () => import('@/components/three/ModelViewer'),
  { ssr: false, loading: () => <ModelFallback /> }
);
```

### MongoDB Schema Addition

Add `modelPath` field to `Product.model.ts`:

```typescript
modelPath: { type: String, default: null },  // e.g. '/models/ring.glb' or null
```

Admin product form gets a `Model File` dropdown: `ring | necklace | earrings | bracelet | none`.

### Design Mockups (Day 2 standalone HTML)

The 5 design mockups use **placeholder images only** (`picsum.photos` seeds for consistent jewellery-looking images). 3D models are integrated in Day 4 **after** a design is chosen — not during the mockup phase.

---

## Dynamic Pricing Data Flow

### Customer read path (Next.js RSC)

```
Browser → Next.js RSC
  → api.ts calls getProducts(process.env.API_URL)
    → Express: goldPrice.service fetches current rate from MongoDB
    → products.service maps products:
        calculatedPrice = calculatePrice(goldRate, weight, makingCharges)  ← @jwell/utils
    → returns ProductWithPrice[]
  → RSC renders pre-calculated prices → HTML sent to browser
  → No client-side calculation, no price flash
```

### ISR cache strategy

- `revalidate = 300` (5 min) on all product fetches
- When admin updates gold price → Express calls `revalidate/route.ts` webhook on Next.js app → ISR cache purged immediately

### Admin write path (optimistic update)

```
Admin submits new gold price
  → Zustand: setOptimisticPrice(newValue)  (instant UI update)
  → TanStack Query mutation: PUT /gold-price
  → On success: invalidate ['products'] + ['gold-price'] queries + trigger ISR revalidation
  → On error: Zustand rollback + error toast (Shadcn/ui)
```

### Formula lives in exactly one place

`packages/utils/src/pricing.ts` → `calculatePrice(pricePerGram, weight, makingCharges)`

- Backend `products.service.ts` imports it → authoritative for all API responses
- Admin `ProductForm.tsx` imports it → live price preview while filling in weight/charges

---

## Component Tree by Page

### Homepage (`app/page.tsx` — Server Component)

```
<Header />
<HeroSection />          full-viewport, rich imagery
<CategoriesSection />    horizontal scroll on mobile
<FeaturedProducts />
  └── <ProductCard /> × N
        └── <PriceTag />   formatted from calculatedPrice
<AboutSection />         brand story
<WhyChooseUs />          4 icon cards
<CTASection />           contact/visit CTA band
<Footer />
```

### Product Listing (`app/products/page.tsx` — Server Component)

```
<Header />
<ProductGrid />
  └── <ProductCard /> × N  (image, name, price, action btn)
<Footer />
```

### Product Detail (`app/products/[id]/page.tsx` — Server Component)

```
<Header />
<ProductImageGallery />  Cloudinary images, lightbox
<ProductDetails />
  └── <PriceTag />       large format, weight + making charges breakdown
<EnquiryButton />        links to /contact?product=<name>
<Footer />
```

### Contact (`app/contact/page.tsx`)

```
<Header />
<ContactForm />      'use client' — React Hook Form + Zod
<BusinessDetails />  address, phone, Google Maps embed
<Footer />
```

### Admin Panel (Vite SPA — all Shadcn/ui)

```
<AdminLayout>
  <Sidebar />
  <Outlet>
    DashboardPage     — product count card, current gold price card
    GoldPricePage     — <GoldPriceForm /> with Shadcn Input + Button
    ProductsPage      — <ProductTable /> Shadcn DataTable with delete Dialog
    ProductFormPage   — <ProductForm /> add/edit, Cloudinary upload, live price preview
  </Outlet>
</AdminLayout>
```

---

## Implementation Order (5-6 Days)

### Day 1 — Monorepo + Shared Packages

1. `pnpm init`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`
2. Create all `apps/` and `packages/` directories
3. Build `@jwell/types` — all interfaces. **Foundation — nothing else before this.**
4. Build `@jwell/utils` — `calculatePrice()`, `formatCurrency()`, Zod schemas
5. Write `@jwell/ui/tailwind-preset.ts` — luxury tokens (get this right before any UI)
6. Stub `@jwell/api-client` with function signatures only
7. Run `turbo type-check` — zero errors before touching apps

### Day 2 — Design Selection + Customer Frontend UI (mock data)

8. **Create 5 standalone homepage design mockups** saved to `designs/` folder
   - Each is a self-contained HTML file (Tailwind CDN + Google Fonts + Three.js CDN, no build step)
   - All 5 share the same sections but use dramatically different aesthetics:
     - `design-1.html` — Dark Luxury / Editorial (black + gold, Cormorant Garamond)
     - `design-2.html` — Soft Feminine / Blush & Ivory (cream + rose, Playfair Display)
     - `design-3.html` — Minimalist / Swiss (pure white + navy, strict grid)
     - `design-4.html` — Heritage / Vintage / Royal (burgundy + gold, ornamental)
     - `design-5.html` — Contemporary / Bold Gradient (purple→gold, glassmorphism)
   - Each mockup uses **placeholder images** (`picsum.photos`) — no 3D in the mockups
   - **Pick one before continuing — all remaining UI work follows that aesthetic**
9. Scaffold `apps/web` — `create-next-app` (App Router, TypeScript, Tailwind)
10. Translate chosen design's tokens into `@jwell/ui/tailwind-preset.ts`; set up fonts in `globals.css`
11. Build `Header`, `Footer`, `MobileNav` matching chosen design
12. Homepage — all 6 sections with mock `ProductWithPrice[]`
13. Product Listing + `ProductCard` + `PriceTag`
14. Product Detail — gallery, details, price breakdown
15. Contact page — form with Zod validation (no submit action yet)
16. Mobile responsiveness sweep across all 4 pages

### Day 3 — Backend + Admin Scaffold

16. Scaffold `apps/api` — Express + TypeScript + ts-node-dev
17. `config/db.ts` — Mongoose connect with `MONGODB_URI`
18. `models/GoldPrice.model.ts` — upsert-based single-document schema
19. `models/Product.model.ts` — no `finalPrice` field enforced at schema level
20. `services/goldPrice.service.ts` + `services/products.service.ts`
    - `products.service.getProducts()` calls `calculatePrice()` from `@jwell/utils` on every response
    - `goldPrice.service.updateGoldPrice()` calls Next.js ISR revalidation webhook on save
21. `controllers/goldPrice.controller.ts` + `controllers/products.controller.ts` — thin, delegate to service
22. `middleware/auth.middleware.ts` — `x-admin-key` header check
23. `middleware/validate.middleware.ts` — Zod schema validation factory
24. `middleware/errorHandler.ts` — last Express middleware
25. `upload/cloudinary.ts` + `upload/upload.middleware.ts` — multer-storage-cloudinary
26. Wire all routes in `routes/` files, register in `index.ts`
27. Seed MongoDB with 3-4 sample products + gold price document
28. Scaffold `apps/admin` — Vite + React + React Router + Shadcn/ui init
29. `AdminLayout` + `Sidebar` + `DashboardPage` (static)

### Day 4 — Connect Frontend to API + Wire 3D Viewers

25. Implement `@jwell/api-client` functions (native fetch)
26. Replace mock data in `apps/web/src/lib/api.ts` with real API calls
27. Set `revalidate = 300` on product fetches
28. Add `loading.tsx` and `error.tsx` per route
29. Build ISR revalidation webhook (`app/api/revalidate/route.ts`)
30. Install `@react-three/fiber`, `@react-three/drei`, `three` in `apps/web`
31. Download free GLTF jewellery models from Sketchfab → `apps/web/public/models/`
32. Build `ModelViewer.tsx` + `JewelleryModel.tsx` + `ModelFallback.tsx`
33. Add `dynamic(() => import('../three/ModelViewer'), { ssr: false })` on product detail page
34. Add mini 3D canvas on `ProductCard` for listing page
35. Add `modelPath` field to MongoDB Product model + admin form dropdown

### Day 5 — Admin Panel + Dynamic Pricing Loop

30. `GoldPricePage` + `GoldPriceForm` — TanStack Query + Zustand optimistic update
31. `ProductsPage` + `ProductTable` — Shadcn DataTable, delete with confirm Dialog
32. `ProductFormPage` + `ProductForm` — add/edit, Cloudinary image upload, live price preview
33. Wire ISR revalidation: `goldPrice.controller.ts` → POST to Next.js revalidate webhook on PUT success
34. Add API key auth middleware on all admin-only endpoints
35. End-to-end test: update gold price in admin → product prices update on customer site

### Day 6 — Polish + Deploy

36. Edge cases: zero weight, null gold price, large making charges
37. Form validation coverage, error toasts
38. Cross-browser + mobile sweep
39. Deploy `apps/api` → Render (Node.js web service + MongoDB Atlas)
40. Deploy `apps/web` → Vercel (set `API_URL`, `NEXT_PUBLIC_API_URL`, `REVALIDATE_SECRET`)
41. Deploy `apps/admin` → Vercel/Netlify (set `VITE_API_URL`, `VITE_ADMIN_API_KEY`)
42. Set CORS on Express for deployed domains
43. Production smoke test

---

## Critical Files

| File                                        | Why it matters                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `packages/ui/tailwind-preset.ts`            | Every visual decision flows from here; design it before any component   |
| `packages/types/src/product.ts`             | Contract between API and both frontends; wrong here = errors everywhere |
| `packages/utils/src/pricing.ts`             | Single definition of `calculatePrice()` — must be the only one          |
| `apps/api/src/services/products.service.ts` | Where `calculatePrice()` is called — enforces "never store price in DB" |
| `apps/web/src/app/api/revalidate/route.ts`  | Makes ISR real-time when gold price changes                             |
| `apps/admin/src/store/goldPriceStore.ts`    | Zustand optimistic update — 3-line store                                |

---

## Verification Checklist

### Backend

- [ ] `GET /api/products` returns `calculatedPrice` field; MongoDB documents have no `finalPrice` field
- [ ] `PUT /api/gold-price` without `x-admin-key` header returns 401
- [ ] `POST /api/products` with missing `weight` field returns 400 with Zod error detail
- [ ] `POST /api/upload` returns Cloudinary URL; image accessible via CDN
- [ ] Updating gold price via `PUT /api/gold-price` triggers ISR revalidation (check Next.js logs)

### 3D Models

- [ ] GLTF models load without console errors; no CORS issues serving from `/public/models/`
- [ ] `ModelViewer` on product detail page: OrbitControls drag/zoom works, auto-rotate on idle
- [ ] Mini canvas on `ProductCard` auto-rotates without controls
- [ ] `ModelFallback` skeleton shows while GLTF is loading (no blank canvas flash)
- [ ] `ssr: false` dynamic import prevents server-side Three.js errors

### Frontend — Customer Site

- [ ] `turbo type-check` passes with zero errors across all packages and apps
- [ ] Changing gold price in admin → customer site product prices update (ISR purge working)
- [ ] `calculatePrice()` from `@jwell/utils` result matches API `calculatedPrice` value
- [ ] Mobile layout works on all 4 customer pages
- [ ] Contact form validates Name/Phone/Message client-side with Zod schema from `@jwell/utils`

### Frontend — Admin Panel

- [ ] Product form live price preview matches API-returned `calculatedPrice`
- [ ] Admin CRUD — add product → appears on customer site; delete → gone
- [ ] Gold price optimistic update shows instantly in UI; rolls back on API error
- [ ] Cloudinary image upload flow works end-to-end in the product form

### Deployment

- [ ] `apps/api` on Render: MongoDB Atlas connected, Cloudinary env vars set
- [ ] `apps/web` on Vercel: `API_URL` points to Railway, `REVALIDATE_SECRET` set
- [ ] `apps/admin` on Vercel/Netlify: `VITE_API_URL` and `VITE_ADMIN_API_KEY` set
- [ ] CORS on Express allows deployed Vercel domains
