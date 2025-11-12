"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: "dark" as const,
      name: "Vampire's Lair",
      icon: "🦇",
      gradient: "linear-gradient(135deg, #1a0808, #DC2626)",
      description: "Blood red & gothic horror"
    },
    {
      id: "haunted" as const,
      name: "Haunted Realm",
      icon: "👻",
      gradient: "linear-gradient(135deg, #1a0f2e, #8B5CF6)",
      description: "Purple mystical supernatural"
    },
    {
      id: "light" as const,
      name: "Forbidden Sun",
      icon: "☀️",
      gradient: "linear-gradient(135deg, #FFFFFF, #FFFFCC)",
      description: "⚠️ DON'T CLICK THIS!"
    }
  ];

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-label">Choose Theme</div>
      <div className="theme-options">
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-option ${theme === t.id ? "active" : ""}`}
            onClick={() => setTheme(t.id)}
            title={t.description}
          >
            <div 
              className="theme-preview" 
              style={{ background: t.gradient }}
            >
              <span className="theme-icon">{t.icon}</span>
            </div>
            <div className="theme-info">
              <div className="theme-name">{t.name}</div>
              <div className="theme-desc">{t.description}</div>
            </div>
            {theme === t.id && (
              <div className="theme-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
