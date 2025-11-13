# 🎃 Tantrik - Halloween Spirit Chat

> *"Dare to speak with the spirits... if you're brave enough."*

A spooky Halloween web app where you can chat with supernatural spirits powered by AI. Talk to Count Dracula, the Grim Reaper, or Bloody Mary in an immersive horror experience with atmospheric sounds and animations.

---

## 👻 Features

- **3 Terrifying Spirits**: Dracula, Grim Reaper, and Bloody Mary
- **Immersive Backgrounds**: Animated horror scenes for each spirit
- **Spooky Sounds**: Atmospheric ambience and sound effects
- **AI-Powered Chats**: Real conversations with supernatural beings
- **Horror Animations**: Blood drips, floating ghosts, cracked mirrors, and more
- **Mobile Responsive**: Works on all devices

---

## 🏗️ Project Structure

```
Tantrik/
├── services/
│   ├── tantrik_ai/          # Python/Flask AI Backend
│   │   ├── agents/          # Spirit AI agents
│   │   ├── prompts/         # Spirit personalities
│   │   └── app.py           # API server
│   └── tantrik_web/         # Next.js Frontend
│       ├── app/             # Pages
│       ├── components/      # React components
│       ├── styles/          # Halloween CSS
│       └── public/sounds/   # Spooky audio files
└── README.md
```

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd services/tantrik_ai
pip install -r requirements.txt
# Create .env with OPENAI_API_KEY_PRIMARY
python app.py
```

### 2. Frontend Setup
```bash
cd services/tantrik_web
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8080
npm run dev
```

Visit: http://localhost:3000

---

## 🎭 The Spirits

### 🧛 Count Dracula
*"For centuries I have walked the night..."*
- Vampire lord from Transylvania
- Gothic castle background with blood moon
- Vampire laugh and castle wind ambience

### 💀 The Grim Reaper
*"I am Death itself..."*
- The harvester of souls
- Graveyard scene with tombstones
- Death bell and graveyard ambience

### 👰 Bloody Mary
*"Say my name three times..."*
- The vengeful mirror ghost
- Cracked mirrors and blood writing
- Mirror crack and haunted whispers

---

## 🔊 Sound System

- **Default**: Muted (browser requirement)
- **Toggle**: Click button (bottom right) to enable
- **Ambience**: Each spirit has unique background sounds
- **Effects**: Hover sounds, entrance sounds, message sounds

---

## 🎨 Tech Stack

**Frontend:**
- Next.js 16 + TypeScript
- Tailwind CSS
- React Markdown
- Custom Halloween animations

**Backend:**
- Python + Flask
- OpenAI GPT-4
- Streaming responses
- Spirit personality system

---

## 📦 Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for step-by-step Vercel deployment.

---

## 🎃 Happy Halloween!

Built with 💀 for the spooky season.

*Warning: May cause nightmares. Chat with spirits at your own risk.* 👻
