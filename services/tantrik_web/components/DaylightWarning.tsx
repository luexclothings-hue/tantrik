"use client";

import { useTheme } from "@/context/ThemeContext";

export default function DaylightWarning() {
  const { setTheme } = useTheme();

  const returnToDarkness = () => {
    setTheme("dark");
  };

  return (
    <div className="daylight-takeover">
      {/* Blinding white overlay */}
      <div className="daylight-overlay"></div>
      
      {/* Warning popup */}
      <div className="daylight-popup">
        <div className="daylight-icon">☀️</div>
        
        <h1 className="daylight-title">
          STOP! THE LIGHT BURNS! 🔥
        </h1>
        
        <div className="daylight-message">
          <p className="daylight-text">
            🧛 The vampires are screaming in agony!
          </p>
          <p className="daylight-text">
            👻 The ghosts are fading away!
          </p>
          <p className="daylight-text">
            💀 The spirits cannot survive this brightness!
          </p>
          <p className="daylight-plea">
            Please... we beg you... return us to the darkness where we belong...
          </p>
        </div>

        <button 
          className="return-to-darkness-btn"
          onClick={returnToDarkness}
        >
          ⚰️ RETURN TO DARKNESS ⚰️
        </button>

        <div className="daylight-footer">
          The supernatural realm rejects the light...
        </div>
      </div>
    </div>
  );
}
