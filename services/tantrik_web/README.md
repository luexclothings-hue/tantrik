# 🎃 Tantrik Web - Gateway to the Spirit Realm

Next.js web interface for Tantrik AI - chat with horror-themed AI spirits.

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Copy environment template
copy .env.local.example .env.local

# Edit .env.local and set your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Backend (Required)

In a separate terminal:

```bash
cd ../tantrik_ai
python app.py
```

Backend must be running on `http://localhost:8080`

### 4. Start Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Test Integration

```bash
# Test backend connection
node test-integration.js
```

This will verify:
- ✅ Backend is running
- ✅ All endpoints work
- ✅ Streaming is functional
- ✅ Spirits are available

## 👻 Available Spirits

### 🧛 Count Dracula
- **Route:** `/spirit/dracula`
- **Theme:** Gothic vampire castle with blood moon
- **Personality:** Aristocratic, menacing, seductive predator

### 💀 The Grim Reaper
- **Route:** `/spirit/reaper`
- **Theme:** Dark graveyard with tombstones
- **Personality:** Cold, philosophical, inevitable death

### 👻 Bloody Mary
- **Route:** `/spirit/bloody_mary`
- **Theme:** Cracked bathroom mirrors
- **Personality:** Vengeful, unstable, mirror-obsessed ghost

## 📁 Project Structure

```
services/tantrik_web/
├── app/
│   ├── spirit/[spiritId]/
│   │   └── page.tsx          # Spirit chat pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── spirits/
│   │   ├── DraculaChat.tsx    # Dracula UI
│   │   ├── ReaperChat.tsx     # Reaper UI
│   │   └── BloodyMaryChat.tsx # Mary UI
│   ├── Sidebar.tsx            # Chat history sidebar
│   ├── SpiritSelector.tsx     # Spirit selection
│   └── ...
├── lib/
│   ├── tantrikApi.ts          # ✅ NEW: Backend API client
│   ├── chatStorage.ts         # Local chat storage
│   └── pdfExport.ts           # PDF export
├── context/
│   ├── SessionContext.tsx     # Session management
│   └── ThemeContext.tsx       # Theme switching
├── styles/
│   ├── dracula-chat.css       # Dracula theme
│   ├── reaper-chat.css        # Reaper theme
│   ├── bloody-mary-chat.css   # Mary theme
│   └── ...
└── public/
    ├── spirits/               # Spirit avatars
    └── ...
```

## 🔧 Configuration

### Environment Variables

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080

# For production
NEXT_PUBLIC_API_URL=https://your-backend.com
```

### API Integration

The app uses `lib/tantrikApi.ts` to communicate with the backend:

```typescript
// Streaming chat (real-time)
await sendStreamingMessage({
  spiritId: "dracula",
  messages: [...],
  onChunk: (chunk) => { /* handle chunk */ },
  onComplete: () => { /* done */ },
  onError: (error) => { /* handle error */ }
});

// Non-streaming chat
const response = await sendChatMessage("dracula", messages);
```

## 🎨 Features

- ✅ Real-time streaming responses
- ✅ Three unique spirit personalities
- ✅ Beautiful themed UI for each spirit
- ✅ Chat history (local storage)
- ✅ Save/load conversations
- ✅ Export to PDF
- ✅ Dark/light theme toggle
- ✅ Responsive design
- ✅ Markdown support in responses
- ✅ Typing indicators
- ✅ Error handling

## 🐛 Troubleshooting

### Backend Not Connecting

**Error:** `Failed to fetch`

**Solution:**
1. Check backend is running: `http://localhost:8080/health`
2. Verify `.env.local` has correct URL
3. Run integration test: `node test-integration.js`

### Spirits Not Loading

**Error:** Empty spirit list

**Solution:**
1. Check backend `/spirits` endpoint
2. Verify CORS is enabled in backend
3. Check browser console for errors

### Streaming Not Working

**Error:** Messages don't stream

**Solution:**
1. Test streaming endpoint manually
2. Check browser supports SSE
3. Verify backend streaming works

## 📦 Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## 🚀 Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variable in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

Set environment variable in Netlify dashboard.

## 🔗 Backend Integration

This frontend requires the Tantrik AI backend service:
- **Location:** `../tantrik_ai/`
- **Docs:** See `../tantrik_ai/README.md`
- **API:** REST API with SSE streaming

### Backend Endpoints Used

- `GET /health` - Health check
- `GET /spirits` - List available spirits
- `POST /chat` - Non-streaming chat
- `POST /stream` - Streaming chat (SSE)

## 📝 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run linter
npm run lint

# Build
npm run build
```

## 🎯 Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** CSS Modules + Tailwind
- **Markdown:** react-markdown
- **PDF:** jsPDF + html2canvas
- **Icons:** SVG

## 📄 License

MIT

## 🎃 Happy Halloween!

Summon spirits, chat with the undead, and experience the thrill of the paranormal! 👻🧛💀
