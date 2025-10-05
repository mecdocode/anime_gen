# 🚀 Deployment Guide

## Vercel Deployment (Recommended)

This project is optimized for Vercel with serverless functions.

### Prerequisites
- GitHub account
- Vercel account (free)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/retro-anime-finder.git
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: One-Click Deploy
1. Click the deploy button in README.md
2. Connect your GitHub account
3. Deploy automatically

#### Option B: Manual Deploy
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login and deploy:
   ```bash
   vercel login
   vercel
   ```

3. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **retro-anime-finder**
   - Directory: **./frontend**
   - Override settings? **N**

### Step 3: Verify Deployment

Your app will be available at: `https://your-project-name.vercel.app`

Test the API endpoints:
- `GET /api/health` - Should return status OK
- `POST /api/recommend` - Should return anime recommendations

## Project Structure for Deployment

```
retro-anime-finder/
├── api/                     # Vercel serverless functions
│   ├── health.js           # Health check endpoint
│   ├── recommend.js        # Main recommendation API
│   └── package.json        # API dependencies
├── frontend/               # React frontend
│   ├── dist/              # Built frontend (auto-generated)
│   ├── src/               # Source code
│   └── package.json       # Frontend dependencies
├── backend/               # Data only (no server)
│   └── data/              # Anime database CSV
├── vercel.json            # Vercel configuration
├── .vercelignore          # Files to ignore
└── package.json           # Root package.json
```

## Configuration Files

### vercel.json
- Configures build process
- Routes API calls to serverless functions
- Sets function timeouts

### .vercelignore
- Excludes unnecessary files from deployment
- Reduces bundle size

## Environment Variables

No environment variables are required for basic deployment.

## Troubleshooting

### Build Fails
1. Check that all dependencies are installed
2. Verify `frontend/package.json` has correct build script
3. Ensure CSV file exists in `backend/data/`

### API Not Working
1. Check function logs in Vercel dashboard
2. Verify CSV file path in `api/recommend.js`
3. Test locally first with `vercel dev`

### Frontend Not Loading
1. Check build output in Vercel dashboard
2. Verify `vercel.json` routes configuration
3. Ensure `frontend/dist/` is being generated

## Local Testing with Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Test locally
vercel dev

# This will:
# - Build frontend
# - Start serverless functions locally
# - Serve on http://localhost:3000
```

## Performance Optimization

The deployment includes:
- **Static Frontend**: Fast CDN delivery
- **Serverless Functions**: Auto-scaling API
- **CSV Caching**: In-memory database loading
- **Image Optimization**: Vercel automatic optimization

## Monitoring

Monitor your deployment:
1. **Vercel Dashboard**: View deployments and logs
2. **Analytics**: Track usage and performance
3. **Function Logs**: Debug API issues

## Custom Domain (Optional)

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Configure DNS records

Your anime finder is now live! 🎌
