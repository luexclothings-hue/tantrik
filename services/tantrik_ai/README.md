# 🎃 Tantrik AI - Spirit Backend

Python/Flask backend that powers the supernatural spirits with AI.

## 🧛 What It Does

- Hosts 3 AI spirit agents (Dracula, Reaper, Bloody Mary)
- Streams responses for real-time chat experience
- Maintains spirit personalities and backstories
- Handles CORS for web frontend

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Create .env file
OPENAI_API_KEY_PRIMARY=your-key-here
PORT=8080
FLASK_DEBUG=0

# Run server
python app.py
```

Server runs at: http://localhost:8080

## 📡 API Endpoints

### Health Check
```
GET /health
Response: {"status": "healthy"}
```

### Chat with Spirit
```
POST /api/chat/stream
Body: {
  "spiritId": "dracula",
  "messages": [{"role": "user", "content": "Hello"}]
}
Response: Server-Sent Events stream
```

## 🎭 Spirit Agents

Each spirit has:
- Unique personality in `prompts/`
- Custom agent logic in `agents/`
- Specific tone and backstory

## 🔧 Environment Variables

```bash
OPENAI_API_KEY_PRIMARY=sk-...    # Required
OPENAI_API_KEY_FALLBACK=sk-...   # Optional backup
PORT=8080                         # Server port
FLASK_DEBUG=0                     # Production mode
```

## 📦 Deploy to Vercel

See root `VERCEL_DEPLOYMENT.md`

---

Happy Halloween! 👻
