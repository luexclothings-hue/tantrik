# 🎃 Tantrik AI - Deployment Guide

## 🚀 Quick Deploy to Google Cloud Run

### Prerequisites
- Google Cloud account
- gcloud CLI installed
- OpenAI API keys (primary + fallback)

### Step 1: Set up gcloud
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Step 2: Deploy
```bash
cd services/tantrik_ai

gcloud run deploy tantrik-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60 \
  --set-env-vars OPENAI_API_KEY_PRIMARY=sk-your-primary-key,OPENAI_API_KEY_FALLBACK=sk-your-fallback-key
```

### Step 3: Get Service URL
```bash
gcloud run services describe tantrik-ai --region us-central1 --format 'value(status.url)'
```

Your service will be available at: `https://tantrik-ai-xxxxx.run.app`

---

## 🐳 Docker Deployment

### Build and Run Locally
```bash
# Build image
docker build -t tantrik-ai .

# Run container
docker run -p 8080:8080 \
  -e OPENAI_API_KEY_PRIMARY=your-key \
  -e OPENAI_API_KEY_FALLBACK=your-fallback-key \
  tantrik-ai
```

### Push to Container Registry
```bash
# Tag image
docker tag tantrik-ai gcr.io/YOUR_PROJECT_ID/tantrik-ai

# Push to GCR
docker push gcr.io/YOUR_PROJECT_ID/tantrik-ai

# Deploy from GCR
gcloud run deploy tantrik-ai \
  --image gcr.io/YOUR_PROJECT_ID/tantrik-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔧 Environment Variables

Required:
- `OPENAI_API_KEY_PRIMARY` - Your primary OpenAI API key
- `OPENAI_API_KEY_FALLBACK` - Backup API key (optional but recommended)

Optional:
- `PORT` - Server port (default: 8080)
- `FLASK_ENV` - Environment (production/development)

---

## 🧪 Testing Deployment

```bash
# Replace with your deployed URL
export SERVICE_URL="https://tantrik-ai-xxxxx.run.app"

# Test health
curl $SERVICE_URL/health

# Test chat
curl -X POST $SERVICE_URL/chat \
  -H "Content-Type: application/json" \
  -d '{
    "spirit_id": "dracula",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

---

## 📊 Monitoring

### View Logs
```bash
gcloud run services logs read tantrik-ai --region us-central1
```

### Monitor Metrics
```bash
gcloud run services describe tantrik-ai --region us-central1
```

---

## 💰 Cost Estimation

### Google Cloud Run
- Free tier: 2 million requests/month
- After free tier: ~$0.40 per million requests
- Memory: 512Mi = ~$0.0000025 per second

### OpenAI API (gpt-4o-mini)
- Input: $0.150 per 1M tokens
- Output: $0.600 per 1M tokens
- Average conversation: ~300 tokens = $0.0003

**Estimated cost for 10,000 conversations/month:**
- Cloud Run: ~$2
- OpenAI: ~$3
- **Total: ~$5/month**

---

## 🔒 Security Best Practices

1. **API Keys**: Store in Secret Manager, not environment variables
2. **Authentication**: Add API key authentication for production
3. **Rate Limiting**: Implement rate limiting per IP
4. **CORS**: Configure CORS for your frontend domain only
5. **HTTPS**: Always use HTTPS (Cloud Run provides this)

---

## 🎃 Happy Deploying! 👻
