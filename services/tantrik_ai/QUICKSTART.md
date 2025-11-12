# 🚀 Quick Start Guide

Get your Tantrik AI service running in 3 minutes.

## Step 1: Install Dependencies

```bash
cd services/tantrik_ai
pip install -r requirements.txt
```

## Step 2: Set Your API Key

Create a `.env` file:

```bash
OPENAI_API_KEY_PRIMARY=sk-your-key-here
```

Or set it directly in your terminal:

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY_PRIMARY="sk-your-key-here"
```

**Linux/Mac:**
```bash
export OPENAI_API_KEY_PRIMARY="sk-your-key-here"
```

## Step 3: Run the Service

```bash
python app.py
```

You should see:
```
INFO:tantrik-ai:🪬 Count Dracula initialized with gpt-4o-mini
INFO:tantrik-ai:🪬 The Grim Reaper initialized with gpt-4o-mini
INFO:tantrik-ai:🪬 Bloody Mary initialized with gpt-4o-mini
INFO:tantrik-ai:Starting Tantrik AI service
```

## Step 4: Test It

Open a new terminal and run:

**Windows:**
```powershell
.\test_api.ps1
```

**Linux/Mac:**
```bash
chmod +x test_api.sh
./test_api.sh
```

Or use curl directly:
```bash
curl http://localhost:8080/health
```

## 🎉 That's It!

Your service is now running at `http://localhost:8080`

### Next Steps:

- Test the chat endpoint: `POST /chat`
- Try streaming: `POST /stream`
- Integrate with your frontend
- Deploy to production

### Troubleshooting:

**"ModuleNotFoundError: No module named 'openai'"**
```bash
pip install -r requirements.txt
```

**"OPENAI_API_KEY_PRIMARY is required"**
- Make sure you set the environment variable
- Check your `.env` file exists and has the correct key

**"Port 8080 already in use"**
```bash
# Use a different port
PORT=8081 python app.py
```

### Production Deployment:

```bash
gunicorn --bind 0.0.0.0:8080 --workers 2 --threads 4 app:app
```

Or use Docker:
```bash
docker build -t tantrik-ai .
docker run -p 8080:8080 -e OPENAI_API_KEY_PRIMARY=sk-... tantrik-ai
```
