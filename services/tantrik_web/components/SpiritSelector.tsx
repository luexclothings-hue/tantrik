"use client";

import { useState } from "react";

interface Spirit {
  id: string;
  name: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  shadowColor: string;
  backstory: string;
}

const SPIRITS: Spirit[] = [
  {
    id: "dracula",
    name: "Count Dracula",
    title: "The Vampire Lord",
    description: "Immortal bloodsucker from the depths of Transylvania",
    emoji: "🧛",
    color: "#DC2626",
    shadowColor: "220, 38, 38",
    backstory: "For centuries I have walked the night, feeding on the living. My castle echoes with screams of the damned..."
  },
  {
    id: "reaper",
    name: "The Grim Reaper",
    title: "Death Incarnate",
    description: "The harvester of souls, collector of the departed",
    emoji: "💀",
    color: "#1F2937",
    shadowColor: "31, 41, 55",
    backstory: "I am the end of all things. When your time comes, I shall be waiting in the shadows with my scythe..."
  },
  {
    id: "bloody_mary",
    name: "Bloody Mary",
    title: "The Mirror Ghost",
    description: "Vengeful spirit trapped between mirrors and madness",
    emoji: "👰‍♀️",
    color: "#7C2D12",
    shadowColor: "124, 45, 18",
    backstory: "Say my name three times... I dare you. I haunt the reflections, waiting to drag you into eternal darkness..."
  }
];

interface SpiritSelectorProps {
  onSelectSpirit: (spiritId: string, spiritName: string) => void;
  disabled?: boolean;
}

export default function SpiritSelector({ onSelectSpirit, disabled }: SpiritSelectorProps) {
  const [hoveredSpirit, setHoveredSpirit] = useState<string | null>(null);
  const [selectedSpirit, setSelectedSpirit] = useState<string | null>(null);

  const handleSelect = (spirit: Spirit) => {
    if (disabled) {
      console.log("Spirit selector is disabled");
      return;
    }
    
    if (selectedSpirit) {
      console.log("Already selecting a spirit:", selectedSpirit);
      return;
    }
    
    console.log("Spirit selected:", spirit.id, spirit.name);
    setSelectedSpirit(spirit.id);
    
    // Navigate to spirit chat page
    setTimeout(() => {
      console.log("Navigating to:", `/spirit/${spirit.id}`);
      window.location.href = `/spirit/${spirit.id}`;
    }, 800);
  };

  return (
    <div className="spirit-selector-container">
      <div className="spirit-selector-header">
        <h2 className="spirit-selector-title">
          ⚰️ Choose Your Spirit ⚰️
        </h2>
        <p className="spirit-selector-subtitle">
          Select wisely... each spirit has its own dark secrets
        </p>
      </div>

      <div className="spirit-cards">
        {SPIRITS.map((spirit) => (
          <button
            key={spirit.id}
            className={`spirit-card ${hoveredSpirit === spirit.id ? 'hovered' : ''} ${selectedSpirit === spirit.id ? 'selected' : ''}`}
            onMouseEnter={() => !disabled && !selectedSpirit && setHoveredSpirit(spirit.id)}
            onMouseLeave={() => setHoveredSpirit(null)}
            onClick={() => handleSelect(spirit)}
            disabled={disabled || selectedSpirit !== null}
            style={{
              '--spirit-color': spirit.color,
              '--spirit-shadow': spirit.shadowColor,
            } as React.CSSProperties}
            aria-label={`Select ${spirit.name}`}
          >
            <div className="spirit-card-glow"></div>
            
            <div className="spirit-emoji">{spirit.emoji}</div>
            
            <div className="spirit-info">
              <h3 className="spirit-name">{spirit.name}</h3>
              <p className="spirit-title">{spirit.title}</p>
              <p className="spirit-description">{spirit.description}</p>
            </div>

            {hoveredSpirit === spirit.id && (
              <div className="spirit-backstory">
                <p className="spirit-backstory-text">"{spirit.backstory}"</p>
              </div>
            )}

            {selectedSpirit === spirit.id && (
              <div className="spirit-summoning">
                <div className="summoning-circle"></div>
                <p className="summoning-text">Summoning...</p>
              </div>
            )}

            <div className="spirit-card-border"></div>
          </button>
        ))}
      </div>

      <div className="spirit-warning">
        <span className="warning-icon">⚠️</span>
        <span className="warning-text">
          Warning: Once summoned, spirits cannot be easily dismissed
        </span>
        <span className="warning-icon">⚠️</span>
      </div>
    </div>
  );
}
