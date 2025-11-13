"use client";

import { useState, useEffect } from "react";
import { getSoundManager } from "@/lib/soundManager";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const soundManager = getSoundManager();
    const currentMuteState = soundManager.getMuted();
    setIsMuted(currentMuteState);
  }, []);

  const handleToggle = () => {
    const soundManager = getSoundManager();
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
  };

  return (
    <button
      className={`sound-toggle ${isMuted ? 'muted' : 'unmuted'} ${isHovered ? 'hovered' : ''}`}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isMuted ? "Unleash the sounds..." : "Silence the spirits"}
    >
      <div className="sound-icon-container">
        {isMuted ? (
          <>
            <span className="sound-icon">🔇</span>
            <span className="sound-ghost">👻</span>
          </>
        ) : (
          <>
            <span className="sound-icon">🔊</span>
            <span className="sound-waves">
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
            </span>
          </>
        )}
      </div>
      <span className="sound-label">
        {isMuted ? "SILENCED" : "HAUNTED"}
      </span>
    </button>
  );
}
