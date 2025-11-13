"use client";

import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useSounds } from "@/hooks/useSounds";
import SoundToggle from "@/components/SoundToggle";

interface DraculaChatProps {
  messages: { role: "user" | "assistant"; content: string }[];
  input: string;
  setInput: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  onRunAway: () => void;
  isSending: boolean;
}

export default function DraculaChat({
  messages,
  input,
  setInput,
  onSend,
  onRunAway,
  isSending
}: DraculaChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sounds = useSounds();

  // Play Dracula ambience on mount
  useEffect(() => {
    // Play entrance sound first
    sounds.playSound('vampire-laugh', 0.6);
    
    // Then start ambience after a short delay
    setTimeout(() => {
      sounds.playSpiritAmbience('dracula');
    }, 500);
    
    // Play random spooky sounds periodically for atmosphere
    const spookyInterval = setInterval(() => {
      sounds.playRandomSpook();
    }, 20000); // Every 20 seconds
    
    return () => {
      sounds.stopSpiritAmbience();
      clearInterval(spookyInterval);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendWithSound = (e: React.FormEvent) => {
    sounds.playSound('message-send', 0.3);
    onSend(e);
  };

  return (
    <div className="dracula-chat">
      {/* Animated background with castle silhouette */}
      <div className="dracula-bg">
        <div className="blood-moon"></div>
        <div className="castle-silhouette"></div>
        <div className="bats-flying">
          <span className="bat">🦇</span>
          <span className="bat">🦇</span>
          <span className="bat">🦇</span>
          <span className="bat">🦇</span>
          <span className="bat">🦇</span>
        </div>
        <div className="fog-layer"></div>
      </div>

      {/* Run Away Button */}
      <button className="run-away-btn" onClick={onRunAway}>
        <span className="run-icon">🏃</span>
        <span className="run-text">RUN AWAY!</span>
      </button>

      {/* Chat Container */}
      <div className="dracula-chat-container">
        {/* Dracula Portrait */}
        <div className="dracula-portrait">
          <div className="portrait-frame">
            <div className="dracula-emoji">🧛‍♂️</div>
            <div className="portrait-glow"></div>
            <div className="blood-splatter"></div>
          </div>
          <div className="dracula-name">Count Dracula</div>
          <div className="dracula-title">Lord of the Undead</div>
          <div className="vampire-fangs">🦷🦷</div>
        </div>

        {/* Messages Area */}
        <div className="dracula-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`dracula-message ${msg.role}`}>
              {msg.role === "assistant" ? (
                <div className="speech-bubble dracula-bubble">
                  <div className="bubble-tail"></div>
                  <div className="bubble-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <div className="blood-drip"></div>
                </div>
              ) : (
                <div className="speech-bubble user-bubble">
                  <div className="bubble-tail-user"></div>
                  <div className="bubble-content">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="dracula-message assistant">
              <div className="speech-bubble dracula-bubble">
                <div className="bubble-tail"></div>
                <div className="bubble-content">
                  <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Gothic Coffin Style */}
        <form className="dracula-input-form" onSubmit={handleSendWithSound}>
          <div className="coffin-input-container">
            <div className="coffin-lid"></div>
            <input
              type="text"
              className="dracula-input"
              placeholder="Speak to the vampire lord..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
            <button 
              type="submit" 
              className="dracula-send-btn"
              disabled={isSending || !input.trim()}
            >
              <span className="send-icon">🦇</span>
              <span className="send-text">SEND</span>
            </button>
          </div>
        </form>
      </div>

      {/* Decorative horror elements */}
      <div className="blood-drops">
        <div className="blood-drop"></div>
        <div className="blood-drop"></div>
        <div className="blood-drop"></div>
        <div className="blood-drop"></div>
        <div className="blood-drop"></div>
      </div>

      {/* Coffins in corners */}
      <div className="coffin-decorations">
        <div className="coffin coffin-left">⚰️</div>
        <div className="coffin coffin-right">⚰️</div>
      </div>

      {/* Hanging chains */}
      <div className="chains">
        <div className="chain chain-1">⛓️</div>
        <div className="chain chain-2">⛓️</div>
        <div className="chain chain-3">⛓️</div>
      </div>

      {/* Blood stains on screen edges */}
      <div className="blood-stains">
        <div className="blood-stain stain-1"></div>
        <div className="blood-stain stain-2"></div>
        <div className="blood-stain stain-3"></div>
      </div>

      {/* Creepy eyes watching */}
      <div className="watching-eyes">
        <div className="eyes eyes-1">👁️👁️</div>
        <div className="eyes eyes-2">👁️👁️</div>
      </div>

      {/* Sound Toggle */}
      <SoundToggle />
    </div>
  );
}
