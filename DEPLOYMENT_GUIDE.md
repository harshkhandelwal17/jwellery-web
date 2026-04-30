# Shreeva Jewellers — Deployment Guide

## Overview

Three services need to be deployed:

| Service | Platform | URL |
|---|---|---|
| Backend API | Render | `https://shreeva-web.onrender.com` |
| Customer Website | Vercel | `https://shreeva-one.vercel.app` |
| Admin Dashboard | Vercel | `https://shreeva-admin.vercel.app` *(suggested)* |

---

## Step 1: Deploy Backend (Render)

### 1.1 Create Web Service on Render

1. Go to [render.com](https://render.com) → Dashboard → **New Web Service**
2. Connect your GitHub repo
3. Select the root of the monorepo
4. Configure:

| Setting | Value |
|---|---|
| **Name** | `shreeva-api` |
| **Runtime** | Node |
| **Build Command** | `pnpm install && pnpm --filter @jwell/api build` |
| **Start Command** | `pnpm --filter @jwell/api start` *(or `node apps/api/dist/index.js`)* |
| **Plan** | Free (or paid for faster cold starts) |

> If `pnpm` is not available on Render by default, add a `.render-buildpacks.json` or use `npm install -g pnpm` in the build command.

### 1.2 Add Environment Variables

Go to your service → **Environment** → Add the following:

| Variable | Value | Purpose |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB connection string |
| `ADMIN_API_KEY` | `0f98a55f82eff2006a0e5f93a0e3a53e5b6b5c4bca973d9fc82e9ac4069d731d` | Secret key for admin operations |
| `CLOUDINARY_CLOUD_NAME` | `dejrcjvga` | Cloudinary account |
| `CLOUDINARY_API_KEY` | `146399934898175` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `aM1m58MJHJ3M9JZ133F___ZU92g` | Cloudinary secret |
| `CORS_ORIGINS` | `https://shreeva-one.vercel.app,https://shreeva-admin.vercel.app` | Allowed frontend origins |
| `PORT` | `4000` *(Render will override this, but set as fallback)* | Server port |
| `REVALIDATE_SECRET` | `4c4b5c6081e05f7b18104d79a72bf86ecfa8d73a111e5426b997de40b76e4691` | Secret for frontend cache revalidation |
| `WEB_URL` | `https://shreeva-one.vercel.app` | Frontend URL for webhooks |

### 1.3 Verify Backend is Working

After deployment, test these URLs in your browser:

```
https://shreeva-web.onrender.com/health
```
→ Should return: `{ "ok": true }`

```
https://shreeva-web.onrender.com/api/products
```
→ Should return: JSON array of products (or `[]` if empty)

If either returns 404 or times out, the build/start command is wrong. Check Render logs.

---

## Step 2: Deploy Customer Website (Vercel)

### 2.1 Import Project

1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import your GitHub repo
3. Configure:

| Setting | Value |
|---|---|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/web` |
| **Build Command** | `cd ../.. && pnpm install && pnpm --filter web build` |
| **Output Directory** | `apps/web/.next` |

> If `pnpm` is not available in Vercel by default, go to Project Settings → General → Node Version, and ensure Package Manager is set to `pnpm`.

### 2.2 Add Environment Variables

Go to Project Settings → **Environment Variables**:

| Variable | Value | Environment |
|---|---|---|
| `API_URL` | `https://shreeva-web.onrender.com/api` | Production |
| `NEXT_PUBLIC_API_URL` | `https://shreeva-web.onrender.com/api` | Production |

> **CRITICAL:** Both `API_URL` and `NEXT_PUBLIC_API_URL` must be set. They serve different purposes:
> - `API_URL` = used by server components (page data fetching at build/request time)
> - `NEXT_PUBLIC_API_URL` = used by browser (contact form, enquiry modal)

### 2.3 Add Image Domain (Already Done)

`next.config.ts` already includes `res.cloudinary.com` in `remotePatterns`. No action needed.

### 2.4 Deploy and Verify

1. Click **Deploy**
2. After deployment, visit `https://shreeva-one.vercel.app/products`
3. Open browser DevTools → **Console**
4. You should see:
   - `[API] Products loaded: X items` (if products exist)
   - Or empty grid if no products yet

**If products do NOT load:**
- Check Console for CORS errors
- Check Network tab → `products` request → verify URL is `https://shreeva-web.onrender.com/api/products`
- If URL shows `http://localhost:4000/api`, the `API_URL` env var is not set correctly in Vercel

---

## Step 3: Deploy Admin Dashboard (Vercel)

### 3.1 Create New Project

1. Vercel → Add New Project → Same repo
2. Configure:

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Root Directory** | `apps/admin` |
| **Build Command** | `cd ../.. && pnpm install && pnpm --filter admin build` |
| **Output Directory** | `apps/admin/dist` |

### 3.2 Add Environment Variables

| Variable | Value | Environment |
|---|---|---|
| `VITE_API_URL` | `https://shreeva-web.onrender.com/api` | Production |
| `VITE_ADMIN_API_KEY` | `0f98a55f82eff2006a0e5f93a0e3a53e5b6b5c4bca973d9fc82e9ac4069d731d` | Production |

> The `VITE_` prefix is required by Vite for env vars to be exposed to the browser.

### 3.3 Deploy and Verify

1. Visit `https://your-admin-url.vercel.app`
2. You should see the login/dashboard
3. Products page should load products from the backend

---

## Quick Troubleshooting

### Products not loading on Vercel

| Symptom | Cause | Fix |
|---|---|---|
| Console: `Failed to load products: TypeError: fetch failed` | `API_URL` env var missing | Add `API_URL` in Vercel settings |
| Network tab shows `localhost:4000` | `API_URL` not set, fallback used | Verify env var is saved and redeploy |
| CORS error in browser | Backend CORS doesn't include Vercel domain | Check `CORS_ORIGINS` on Render includes `https://shreeva-one.vercel.app` |
| Backend `/health` works but `/api/products` 404 | Routes not mounted correctly | Already fixed in code — redeploy backend |

### Images not showing

| Symptom | Cause | Fix |
|---|---|---|
| Broken image icon | Cloudinary URL malformed | Already fixed with `normalizeImageUrl` |
| Image area is blank/0px | CSS hiding image | Already fixed with explicit `aspectRatio` |
| Next.js 400 error | Image domain not allowed | Already in `next.config.ts` |

### Admin login/upload not working

| Symptom | Cause | Fix |
|---|---|---|
| Upload fails | `VITE_API_URL` pointing to localhost | Check env var in Vercel admin project |
| 401 Unauthorized | `VITE_ADMIN_API_KEY` mismatch | Must match `ADMIN_API_KEY` on Render |

---

## Update Deployment (After Code Changes)

### Backend changed?
1. Push code
2. Render auto-deploys (or manual deploy in dashboard)
3. Verify `https://shreeva-web.onrender.com/api/products` still works

### Frontend changed?
1. Push code
2. Vercel auto-deploys
3. If backend URL changed, update env vars first

---

## Contact for Support

If anything fails after following this guide:
1. Check **Render Logs** (backend errors)
2. Check **Vercel Build Logs** (build errors)
3. Check **Browser DevTools Console + Network tab** (frontend errors)
