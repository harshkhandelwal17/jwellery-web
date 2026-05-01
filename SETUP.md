# Setup Guide for Shreeva Jewellers

## Quick Start for New Users

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values:
# - MONGODB_URI (your MongoDB connection string)
# - CLOUDINARY_CLOUD_NAME (your Cloudinary cloud name)
# - CLOUDINARY_API_KEY (your Cloudinary API key)
# - CLOUDINARY_API_SECRET (your Cloudinary API secret)
# - ADMIN_API_KEY (generate a random secret)
# - REVALIDATE_SECRET (generate a random secret)
```

### 3. Start Development
```bash
# Start all services
pnpm dev
```

This will start:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:5173
- API: http://localhost:4000

### 4. Seed Initial Gold Rate
Once the API is running, seed the initial gold rate:
```bash
curl -X PUT http://localhost:4000/api/gold-price \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_API_KEY" \
  -d '{"pricePerGram": 9450}'
```

## Build for Production
```bash
pnpm build
```

## Individual App Scripts
```bash
# API
cd apps/api
pnpm dev          # Development
pnpm build        # Build
pnpm start        # Production start

# Web
cd apps/web
pnpm dev          # Development
pnpm build        # Build
pnpm start        # Production start

# Admin
cd apps/admin
pnpm dev          # Development
pnpm build        # Build
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check MONGODB_URI in .env file

### Images Not Loading
- Verify Cloudinary credentials in .env
- Check CLOUDINARY_CLOUD_NAME matches your Cloudinary account

### Build Errors
- Run `pnpm install --force` to reinstall dependencies
- Delete node_modules and reinstall: `pnpm clean && pnpm install`

### Port Already in Use
- Change PORT in .env file (default: 4000 for API)
- Change web/admin ports in their respective configs if needed
