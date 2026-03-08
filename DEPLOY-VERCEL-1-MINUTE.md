# Deploy to Vercel in 1 Minute ⚡

## Method 1: Vercel CLI (Fastest - 30 seconds)

```bash
# 1. Install Vercel CLI (if not installed)
npm i -g vercel

# 2. Go to frontend folder
cd AIforbharat/frontend

# 3. Deploy (one command!)
vercel --prod
```

That's it! Follow the prompts:

- Login to Vercel (opens browser)
- Confirm project settings (just press Enter)
- Done! You'll get a live URL

---

## Method 2: Vercel Dashboard (1 minute)

### Step 1: Push to GitHub (if not already)

```bash
cd AIforbharat/frontend
git init
git add .
git commit -m "Deploy CodeFlow AI"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to <https://vercel.com>
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Vercel auto-detects Next.js
5. Click "Deploy"

**Done in 60 seconds!**

---

## Method 3: One-Click Deploy Button

Add this to your README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)
```

Click the button → Instant deployment!

---

## Important: Environment Variables

After deployment, add these in Vercel Dashboard:

- Go to Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL` = (leave empty for mock data)

---

## Your Live URLs

After deployment, you'll get:

- **Production**: `https://your-project.vercel.app`
- **Preview**: Auto-generated for each commit
- **Custom Domain**: Add in Vercel settings

---

## Verify Deployment

1. Open your Vercel URL
2. Test login with any username
3. Check all pages work:
   - Dashboard ✓
   - AI Mentor ✓
   - Interview Simulator ✓
   - Roadmap ✓

---

## Troubleshooting

**Build fails?**

```bash
# Test build locally first
npm run build
```

**Environment issues?**

- Make sure `.env.local` is NOT in git
- Set env vars in Vercel Dashboard

**Still issues?**

- Check Vercel build logs
- Ensure all dependencies in package.json

---

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm PROJECT_NAME
```

---

## That's It! 🎉

Your CodeFlow AI is now live on Vercel with:

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ Zero configuration
- ✅ Free hosting

**Share your live URL with your professor!**
