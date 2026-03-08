# 🚀 DEPLOY IN 5 MINUTES

## Option 1: Vercel (FASTEST - Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
cd AIforbharat/frontend
vercel
```

Follow the prompts:

- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **codeflow-ai** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

**Done!** You'll get a URL like: `https://codeflow-ai.vercel.app`

---

## Option 2: Netlify (Also Fast)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Deploy

```bash
cd AIforbharat/frontend
netlify deploy --prod
```

Follow the prompts and you'll get a URL!

---

## Option 3: GitHub Pages (Manual)

### Step 1: Build

```bash
npm run build
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Deploy CodeFlow AI"
git push origin main
```

### Step 3: Enable GitHub Pages

- Go to repository Settings
- Pages → Source → main branch
- Save

---

## Quick Test After Deploy

1. Visit your deployed URL
2. Click "Sign In"
3. Enter LeetCode username: `tourist`
4. Verify dashboard loads

---

## Troubleshooting

**Build fails?**

```bash
npm run build
```

Fix any errors shown

**Environment variables?**
Add in Vercel/Netlify dashboard:

- `NEXT_PUBLIC_API_URL` = (leave empty)
- `NEXT_PUBLIC_USE_MOCK_DATA` = false

---

## FASTEST PATH (Copy-Paste)

```bash
# Install Vercel
npm install -g vercel

# Navigate to frontend
cd AIforbharat/frontend

# Deploy
vercel --prod

# Done! Copy the URL and share it!
```

**Time: 3-5 minutes** ⚡
