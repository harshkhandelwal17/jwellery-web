# Deployment Guide for Shreeva Jewellers

## Prerequisites Before Deployment

1. **Environment Variables** - Ensure `.env` is configured with production values
2. **MongoDB** - Have a MongoDB Atlas connection string ready
3. **Cloudinary** - Have Cloudinary credentials ready
4. **Git Repository** - Code should be in a Git repository (GitHub, GitLab, etc.)

---

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd .. && pnpm run build --filter=web`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `pnpm install`

### Step 2: Add Environment Variables
In Vercel Project Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api
REVALIDATE_SECRET=your-production-secret-key
```

### Step 3: Deploy
Click "Deploy". Vercel will build and deploy your frontend.

---

## Backend Deployment (Render)

### Step 1: Deploy to Render
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure:
   - **Root Directory**: `apps/api`
   - **Build Command**: `cd ../.. && pnpm install && cd apps/api && pnpm build`
   - **Start Command**: `node dist/index.js`
   - **Runtime**: Node.js 20.x

### Step 2: Add Environment Variables
In Render Environment Variables:
```
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shreeva
ADMIN_API_KEY=your-production-admin-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
REVALIDATE_SECRET=your-production-secret-key
WEB_URL=https://your-frontend.vercel.app
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

### Step 3: Deploy
Click "Create Web Service". Render will build and deploy your API.

---

## Admin Panel Deployment (Vercel)

### Step 1: Deploy to Vercel
1. Go to Vercel → "Add New Project"
2. Import your Git repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/admin`
   - **Build Command**: `cd ../.. && pnpm install && cd apps/admin && pnpm build`
   - **Output Directory**: `apps/admin/dist`
   - **Install Command**: `pnpm install`

### Step 2: Add Environment Variables
```
VITE_API_URL=https://your-api.onrender.com/api
```

### Step 3: Deploy
Click "Deploy".

---

## Post-Deployment Steps

### 1. Update CORS Origins
After deployment, update `CORS_ORIGINS` in your backend environment variables to include the deployed URLs:
```
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

### 2. Seed Gold Rate
Once the API is deployed, seed the initial gold rate:
```bash
curl -X PUT https://your-api.onrender.com/api/gold-price \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_API_KEY" \
  -d '{"pricePerGram": 9450}'
```

### 3. Test Integration
- Visit your frontend URL and verify products load
- Visit your admin URL and verify you can log in and manage products
- Test the contact/enquiry forms
- Verify images load from Cloudinary

---

## Troubleshooting

### Frontend Build Fails
- Ensure `NEXT_PUBLIC_API_URL` is set correctly
- Check that the API is deployed and accessible
- Verify Vercel build logs for specific errors

### Backend Build Fails
- Ensure MongoDB URI is correct and accessible
- Check Render build logs for dependency issues
- Verify all environment variables are set

### CORS Errors
- Ensure `CORS_ORIGINS` includes all deployed URLs
- Check that the API is running and accessible

### Images Not Loading
- Verify Cloudinary credentials are correct
- Check that CLOUDINARY_CLOUD_NAME matches your account
- Ensure image URLs are properly formatted

---

## Domain Configuration (Optional)

### Custom Domain for Frontend
1. In Vercel → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Custom Domain for API
1. In Render → Web Service → Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

### Update Environment Variables
After setting custom domains, update:
- `WEB_URL` in backend
- `NEXT_PUBLIC_API_URL` in frontend
- `VITE_API_URL` in admin
- `CORS_ORIGINS` in backend

---

## Monitoring

### Vercel Monitoring
- Vercel provides built-in analytics and monitoring
- Check deployment logs for errors
- Monitor build times and performance

### Render Monitoring
- Render provides logs and metrics in the dashboard
- Monitor API response times
- Check MongoDB connection status

---

## Backup Strategy

### Database Backup
- MongoDB Atlas provides automated backups
- Configure backup retention in Atlas settings

### Code Backup
- Code is in Git repository
- Use GitHub/GitLab for version control
- Tag releases for easy rollback
