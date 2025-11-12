# 🎃 Tantrik AI Service

Minimal Flask API for three horror-themed AI spirits with streaming support.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd services/tantrik_ai
pip install -r requirements.txt
```

### 2. Set Up Environment

```bash
# Copy example env file
copy .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY_PRIMARY=sk-...
```

### 3. Run the Service

```bash
# Development
python app.py

# Production
gunicorn --bind 0.0.0.0:8080 --workers 2 app:app
```

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

### List Spirits
```bash
GET /spirits
```

### Chat (Non-Streaming)
```bash
POST /chat
Content-Type: application/json

{
  "spirit_id": "dracula",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

### Stream Chat (SSE)
```bash
POST /stream
Content-Type: application/json

{
  "spirit_id": "reaper",
  "messages": [
    {"role": "user", "content": "Tell me about death"}
  ]
}
```

## 👻 Available Spirits

- **dracula** - Count Dracula (🧛)
- **reaper** - The Grim Reaper (💀)
- **bloody_mary** - Bloody Mary (👻)

## 🐳 Docker

```bash
# Build
docker build -t tantrik-ai .

# Run
docker run -p 8080:8080 -e OPENAI_API_KEY_PRIMARY=sk-... tantrik-ai
```

## 🧪 Test

```bash
python test_basic.py
```

## 📁 Project Structure

```
services/tantrik_ai/
├── app.py                 # Flask API
├── agents/
│   ├── spirit_agent.py    # Base agent class
│   ├── dracula_agent.py   # Dracula implementation
│   ├── reaper_agent.py    # Reaper implementation
│   └── bloody_mary_agent.py
├── prompts/
│   ├── dracula_prompt.py  # Dracula personality
│   ├── reaper_prompt.py   # Reaper personality
│   └── bloody_mary_prompt.py
└── requirements.txt
```

## 🔧 Configuration

Environment variables:
- `OPENAI_API_KEY_PRIMARY` - Primary OpenAI API key (required)
- `OPENAI_API_KEY_FALLBACK` - Fallback API key (optional)
- `PORT` - Server port (default: 8080)
- `FLASK_DEBUG` - Debug mode (default: 0)

## 📝 Requirements

- Python 3.11+
- OpenAI API key
- Flask 3.1.0
- OpenAI Python SDK 1.54.4

## 🎯 Features

- ✅ Three unique horror-themed AI personalities
- ✅ Streaming and non-streaming responses
- ✅ Automatic fallback API key support
- ✅ Clean error handling
- ✅ Production-ready with Gunicorn
- ✅ Docker support
- ✅ CORS enabled
