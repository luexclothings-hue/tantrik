# 🎃 Tantrik Halloween - Vercel Deployment Guide

## Quick Deploy (15 minutes)

### Prerequisites
- OpenAI API Key: https://platform.openai.com/api-keys
- GitHub account
- Vercel account: https://vercel.com

---

## Step 1: Deploy Backend (tantrik_ai)

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Configure:
   - **Root Directory**: `services/tantrik_ai`
   - **Framework**: Other
4. Add Environment Variables:
   ```
   OPENAI_API_KEY_PRIMARY = your-openai-key
   PORT = 8080
   FLASK_DEBUG = 0
   ```
5. Deploy and copy the URL (e.g., `https://tantrik-ai-xyz.vercel.app`)

---

## Step 2: Deploy Frontend (tantrik_web)

1. Go to https://vercel.com/new
2. Import the SAME GitHub repo
3. Configure:
   - **Root Directory**: `services/tantrik_web`
   - **Framework**: Next.js (auto-detected)
4. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url-from-step1.vercel.app
   ```
5. Deploy!

---

## Done! 🎉

Your app is live at: `https://your-app.vercel.app`

Test: Click sound toggle, select a spirit, chat with them!

---

## Troubleshooting

**Backend not working?**
- Check Vercel logs: Dashboard → Project → Deployments → Logs
- Verify `OPENAI_API_KEY_PRIMARY` is set

**Frontend can't connect?**
- Check `NEXT_PUBLIC_API_URL` matches your backend URL exactly
- No trailing slash!

**Sounds not playing?**
- Click the sound toggle button (bottom right)
- Should say "HAUNTED" not "SILENCED"

---

Happy Halloween! 👻🎃
