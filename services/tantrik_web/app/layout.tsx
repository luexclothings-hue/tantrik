// layout.tsx
"use client";

import { SessionProvider, useSession } from "@/context/SessionContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import DaylightWarning from "@/components/DaylightWarning";
import "./globals.css";

function SessionGate({ children }: { children: React.ReactNode }) {
  const { loading, error, retrySession } = useSession();
  const { theme } = useTheme();

  return (
    <>
      {/* Daylight warning takeover */}
      {theme === "light" && <DaylightWarning />}
      
      {error && (
        <div className="error-popup">
          {error}
          <button onClick={retrySession} style={{ marginLeft: 12 }}>
            Retry
          </button>
        </div>
      )}
      <div className="app-container">
        {children}
        {loading && (
          <div className="chat-loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Tantrik - Gateway to the Spirit Realm</title>
        <meta name="description" content="Tantrik connects you with spirits from beyond. Chat with ghosts, seek wisdom from the other side, and embrace the supernatural this Halloween." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/tantrik-icon.svg" type="image/svg+xml" />
        <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <SessionProvider>
            <SessionGate>{children}</SessionGate>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
