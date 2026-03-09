# Push to GitHub and Deploy to Vercel - 2 MINUTES

## Step 1: Create GitHub Repo (30 seconds)

1. Go to: <https://github.com/new>
2. Repository name: `codeflow-ai` (or any name)
3. Make it **Public**
4. **DON'T** initialize with README
5. Click "Create repository"

## Step 2: Push Your Code (30 seconds)

Copy the commands GitHub shows you, OR run these:

```bash
cd AIforbharat/frontend

# Add your GitHub repo (REPLACE WITH YOUR URL)
git remote add origin https://github.com/YOUR_USERNAME/codeflow-ai.git

# Push to GitHub
git push -u origin main
```

**IMPORTANT**: Replace `YOUR_USERNAME` with your actual GitHub username!

## Step 3: Deploy on Vercel (1 minute)

1. Go to: <https://vercel.com/new>
2. Click "Import Git Repository"
3. Select your `codeflow-ai` repo
4. Vercel auto-detects Next.js
5. Click "Deploy"

**DONE! You'll get your live URL!**

---

## Quick Copy-Paste Commands

After creating GitHub repo, run:

```bash
# Go to frontend folder
cd AIforbharat/frontend

# Add remote (CHANGE THE URL!)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git push -u origin main
```

---

## Alternative: Use GitHub Desktop

1. Download: <https://desktop.github.com/>
2. Open GitHub Desktop
3. File → Add Local Repository → Select `AIforbharat/frontend`
4. Click "Publish repository"
5. Go to Vercel and import it

---

## Your Code is Already Committed

✅ All files are committed and ready
✅ Just need to push to GitHub
✅ Then import to Vercel

**Total time: 2 minutes to live deployment!**
