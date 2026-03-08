# CodeFlow AI - Quick Start Guide

## Get Started in 2 Minutes! 🚀

### What You Need

- Node.js 18+ installed
- A LeetCode username (your own or try: `tourist`, `Errichto`)

### Steps

1. **Install dependencies**

```bash
npm install
```

1. **Run the app**

```bash
npm run dev
```

1. **Open your browser**

```
http://localhost:3000
```

1. **Sign in with LeetCode**

- Click "Sign In"
- Enter your LeetCode username
- No password needed!
- The app fetches your data directly from LeetCode

That's it! 🎉

---

## What Happens Next?

The app will:

1. ✅ Fetch your LeetCode profile (problems solved, topics, streak)
2. ✅ Analyze your topic proficiency (weak/moderate/strong)
3. ✅ Generate a personalized learning roadmap
4. ✅ Show your progress dashboard with insights

---

## Features You Can Try

### 1. Dashboard (`/dashboard`)

- View your stats (problems solved, streak, badges)
- See topic proficiency radar chart
- Get AI-powered insights
- Preview your learning roadmap

### 2. Learning Roadmap (`/dashboard/roadmap`)

- Full personalized learning path
- Problems sorted by difficulty
- Estimated time for each problem
- Track your progress

### 3. AI Mentor (`/dashboard/mentor`)

- Ask coding questions
- Get hints for problems
- Debug your code
- Learn concepts

### 4. Interview Simulator (`/dashboard/interview`)

- Practice mock interviews
- Get real-time feedback
- Improve problem-solving speed

---

## Try These LeetCode Usernames

If you don't have a LeetCode account, try these:

- `tourist` - Legendary competitive programmer
- `Errichto` - Popular CP YouTuber
- `neal_wu` - Google engineer
- `tmwilliamlin168` - IOI gold medalist

---

## Troubleshooting

**"LeetCode username not found"**

- Make sure the username is correct
- Try a well-known username like `tourist`

**Page loads slowly**

- First load fetches data from LeetCode API
- Subsequent loads use cached data

**Dark mode issues**

- Click the theme toggle in the navbar
- Or press `Ctrl+Shift+D`

---

## What's Next?

### Want the Full Experience?

Deploy the backend to get:

- AI-powered chat mentor
- Advanced analytics
- Progress tracking across devices
- Interview simulator with AI feedback

See [DEPLOYMENT-GUIDE.md](../DEPLOYMENT-GUIDE.md) for backend setup.

### Customize the App

- Edit `lib/leetcode-api.ts` to modify data fetching
- Update `components/` to change UI
- Modify `app/dashboard/page.tsx` for dashboard layout

---

## Need Help?

- Check browser console for errors
- Review `lib/leetcode-api.ts` for API integration
- See `lib/api.ts` for backend API calls
- Read `DEPLOYMENT-GUIDE.md` for full setup

---

Happy coding! 💻✨
