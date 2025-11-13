# 🎃 Tantrik Halloween - Vercel Production Deployment

## Prerequisites
- ✅ Code pushed to GitHub (main branch)
- ✅ Git tag created: `v1.0.0-beta`
- ✅ OpenAI API Key: https://platform.openai.com/api-keys
- ✅ Vercel account: https://vercel.com

---

## 🚀 Step 1: Deploy Backend (tantrik_ai)

### 1.1 Create New Project
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repo
4. Click **"Import"**

### 1.2 Configure Backend
```
Project Name: tantrik-ai (or your choice)
Framework Preset: Other
Root Directory: services/tantrik_ai
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: pip install -r requirements.txt
```

### 1.3 Add Environment Variables
Click **"Environment Variables"** and add:

```bash
OPENAI_API_KEY_PRIMARY = sk-your-actual-openai-key-here
PORT = 8080
FLASK_DEBUG = 0
```

**Important:** Add to **Production** environment

### 1.4 Deploy Backend
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **COPY YOUR BACKEND URL** (you'll need this!)
   - Example: `https://tantrik-ai.vercel.app`
   - Or: `https://tantrik-ai-username.vercel.app`

### 1.5 Test Backend
Visit: `https://your-backend-url.vercel.app/health`

Should return: `{"status": "healthy"}`

✅ **Backend is live!**

---

## 🎨 Step 2: Deploy Frontend (tantrik_web)

### 2.1 Create New Project
1. Go to https://vercel.com/new **again**
2. Click **"Import Git Repository"**
3. Select the **SAME** GitHub repo
4. Click **"Import"**

### 2.2 Configure Frontend
```
Project Name: tantrik-web (or your choice)
Framework Preset: Next.js (auto-detected)
Root Directory: services/tantrik_web
Build Command: npm run build (auto-filled)
Output Directory: .next (auto-filled)
Install Command: npm install (auto-filled)
```

### 2.3 Add Environment Variable
Click **"Environment Variables"** and add:

```bash
NEXT_PUBLIC_API_URL = https://your-backend-url-from-step-1.4.vercel.app
```

**CRITICAL:** 
- Use your ACTUAL backend URL from Step 1.4
- NO trailing slash!
- Example: `https://tantrik-ai.vercel.app`

### 2.4 Deploy Frontend
1. Click **"Deploy"**
2. Wait 3-4 minutes
3. Your app is **LIVE!** 🎉

---

## 🎯 Step 3: Deploy Specific Tag (v1.0.0-beta)

### 3.1 For Backend
1. Go to Vercel Dashboard → **tantrik-ai** project
2. Click **"Settings"** → **"Git"**
3. Under **"Production Branch"**, you can:
   - Keep `main` (deploys latest)
   - Or change to deploy from tags

### 3.2 For Frontend
1. Go to Vercel Dashboard → **tantrik-web** project
2. Click **"Settings"** → **"Git"**
3. Same as backend

### 3.3 Manual Tag Deployment
To deploy a specific tag:
1. Go to **"Deployments"** tab
2. Click **"..."** → **"Redeploy"**
3. Select **"Use existing Build Cache"** → No
4. Or use Vercel CLI:
```bash
vercel --prod --scope your-team
```

---

## ✅ Verification Checklist

### Backend Check
- [ ] Visit `https://your-backend.vercel.app/health`
- [ ] Should return `{"status": "healthy"}`
- [ ] Check Vercel logs for any errors

### Frontend Check
- [ ] Visit `https://your-frontend.vercel.app`
- [ ] Page loads with Halloween theme
- [ ] Sound toggle appears (bottom right)
- [ ] Can select a spirit
- [ ] Spirit page loads with background
- [ ] Can send messages and get responses

### Integration Check
- [ ] Open browser DevTools (F12) → Console
- [ ] Should see: `🔇 Sound Manager initialized - MUTED by default`
- [ ] Click sound toggle → Should see: `🔊 Sound toggled: UNMUTED 🔊`
- [ ] Select a spirit → Should see: `🎵 Attempting to play...`
- [ ] No CORS errors in console
- [ ] Messages send and receive successfully

---

## 🔧 Production URLs

After deployment, update these in your documentation:

**Backend API:**
```
Production: https://tantrik-ai.vercel.app
Health Check: https://tantrik-ai.vercel.app/health
```

**Frontend App:**
```
Production: https://tantrik-web.vercel.app
```

---

## 🎃 Custom Domain (Optional)

### Add Custom Domain
1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Add domain (e.g., `tantrik-halloween.com`)
4. Follow DNS instructions
5. Update `NEXT_PUBLIC_API_URL` if backend has custom domain

---

## 🔄 Future Updates

### Auto-Deploy from Git
Every push to `main` branch auto-deploys:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Deploy New Tag
```bash
# Create new tag
git tag -a v1.0.1-beta -m "Bug fixes"
git push origin v1.0.1-beta

# Vercel auto-deploys or manually trigger in dashboard
```

---

## 🐛 Troubleshooting

### Backend Issues

**"Module not found" error:**
- Check `requirements.txt` is in `services/tantrik_ai/`
- Verify all dependencies are listed

**"Internal Server Error":**
- Check Vercel logs: Dashboard → Project → Deployments → View Logs
- Verify `OPENAI_API_KEY_PRIMARY` is set correctly
- Check for Python errors in logs

**CORS errors:**
- Backend should allow your frontend domain
- Check Flask CORS configuration in `app.py`

### Frontend Issues

**"Failed to fetch" errors:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Test backend URL directly in browser
- Check for typos (no trailing slash!)

**Build fails:**
- Check Vercel build logs
- Run `npm run build` locally first
- Verify all dependencies in `package.json`

**Sounds not loading:**
- Check all files in `public/sounds/` are committed
- Verify sound files are in Git (not .gitignored)

**Environment variable not working:**
- Must start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding/changing env vars
- Check spelling and no extra spaces

### Integration Issues

**Backend responds but frontend shows error:**
- Check browser console for CORS errors
- Verify API URL format is correct
- Test API endpoint with curl:
```bash
curl -X POST https://your-backend.vercel.app/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{"spiritId":"dracula","messages":[{"role":"user","content":"Hello"}]}'
```

---

## 📊 Monitoring

### View Logs
- **Backend:** Dashboard → tantrik-ai → Deployments → Click deployment → Function Logs
- **Frontend:** Dashboard → tantrik-web → Deployments → Click deployment → Build Logs

### Analytics (Optional)
- Enable Vercel Analytics: Dashboard → Project → Analytics
- Free tier includes basic metrics

---

## 🎉 Success!

Your Halloween app is now live in production!

**Share your creation:**
```
🎃 Tantrik - Halloween Spirit Chat
https://your-app.vercel.app

Chat with Dracula, the Grim Reaper, or Bloody Mary!
Dare to speak with the spirits... 👻
```

---

## 📝 Notes

- **Tag Convention:** `v1.0.0-beta` follows semantic versioning
- **Production URLs:** No more localhost/127.0.0.1
- **Environment:** All env vars set to production values
- **Monitoring:** Check Vercel dashboard regularly
- **Costs:** Vercel free tier is generous for hobby projects

---

Happy Halloween! 🎃👻

*Built with 💀 for the spooky season*
