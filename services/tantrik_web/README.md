# 🎃 Tantrik Web - Halloween Frontend

Next.js web app with spooky UI for chatting with spirits.

## 👻 Features

- 3 spirit chat interfaces with unique themes
- Animated horror backgrounds
- Sound system with ambience and effects
- Mobile responsive design
- Dark Halloween aesthetic

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080

# Run development server
npm run dev
```

Visit: http://localhost:3000

## 🎨 Project Structure

```
tantrik_web/
├── app/
│   ├── page.tsx              # Home page
│   └── spirit/[spiritId]/    # Spirit chat pages
├── components/
│   ├── spirits/              # Spirit chat components
│   ├── SoundToggle.tsx       # Sound control
│   └── SpiritSelector.tsx    # Spirit selection
├── styles/
│   ├── dracula-chat.css      # Vampire theme
│   ├── reaper-chat.css       # Death theme
│   └── bloody-mary-chat.css  # Mirror ghost theme
├── lib/
│   ├── soundManager.ts       # Audio system
│   └── tantrikApi.ts         # Backend API client
└── public/
    └── sounds/               # Horror sound effects
```

## 🔊 Sound Files

All sounds in `public/sounds/`:
- Spirit ambiences (castle-wind, graveyard, haunted-whispers)
- UI sounds (hover, click, send, receive)
- Spirit entrance sounds (vampire-laugh, death-bell, mirror-crack)

## 🎭 Spirit Themes

Each spirit has:
- Custom CSS with animations
- Unique color palette
- Themed backgrounds
- Spirit-specific sound effects

## 🔧 Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

See root `VERCEL_DEPLOYMENT.md` for Vercel deployment.

---

Happy Halloween! 🎃
