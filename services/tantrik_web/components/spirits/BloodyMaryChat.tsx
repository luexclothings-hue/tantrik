"use client";

import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useSounds } from "@/hooks/useSounds";
import SoundToggle from "@/components/SoundToggle";

interface BloodyMaryChatProps {
  messages: { role: "user" | "assistant"; content: string }[];
  input: string;
  setInput: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  onRunAway: () => void;
  isSending: boolean;
}

export default function BloodyMaryChat({
  messages,
  input,
  setInput,
  onSend,
  onRunAway,
  isSending
}: BloodyMaryChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sounds = useSounds();

  // Play Bloody Mary ambience on mount
  useEffect(() => {
    // Play entrance sound first
    sounds.playSound('mirror-crack', 0.6);
    
    // Then start ambience after a short delay
    setTimeout(() => {
      sounds.playSpiritAmbience('bloody_mary');
    }, 500);
    
    // Play random spooky sounds periodically for atmosphere
    const spookyInterval = setInterval(() => {
      sounds.playRandomSpook();
    }, 15000); // Every 15 seconds
    
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
    <div className="mary-chat">
      {/* Bathroom mirror background */}
      <div className="mary-bg">
        <div className="bathroom-wall"></div>
        <div className="cracked-mirrors">
          <div className="mirror-crack crack-1"></div>
          <div className="mirror-crack crack-2"></div>
          <div className="mirror-crack crack-3"></div>
        </div>
        <div className="blood-writing">Bloody Mary... Bloody Mary... Bloody Mary...</div>
        <div className="flickering-light"></div>
      </div>

      {/* Escape Button */}
      <button className="flee-btn" onClick={onRunAway}>
        <span className="flee-icon">🏃‍♀️</span>
        <span className="flee-text">BREAK THE MIRROR!</span>
      </button>

      {/* Chat Container */}
      <div className="mary-chat-container">
        {/* Mary Portrait */}
        <div className="mary-portrait">
          <div className="mirror-frame">
            <div className="mary-emoji">👰‍♀️</div>
            <div className="blood-tears">💧💧</div>
            <div className="mirror-glow"></div>
            <div className="hand-prints">
              <div className="hand">🖐️</div>
              <div className="hand">🖐️</div>
            </div>
          </div>
          <div className="mary-name">Bloody Mary</div>
          <div className="mary-title">The Mirror Ghost</div>
          <div className="candles">🕯️🕯️🕯️</div>
        </div>

        {/* Messages */}
        <div className="mary-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`mary-message ${msg.role}`}>
              {msg.role === "assistant" ? (
                <div className="ghost-bubble">
                  <div className="mirror-shard">🔪</div>
                  <div className="bubble-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <div className="blood-drip-mary"></div>
                </div>
              ) : (
                <div className="victim-bubble">
                  <div className="bubble-content">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="mary-message assistant">
              <div className="ghost-bubble">
                <div className="mirror-shard">🔪</div>
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

        {/* Input - Mirror Frame Style */}
        <form className="mary-input-form" onSubmit={handleSendWithSound}>
          <div className="mirror-input">
            <div className="mirror-border"></div>
            <input
              type="text"
              className="mary-input"
              placeholder="Say my name... if you dare..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
            <button 
              type="submit" 
              className="mary-send-btn"
              disabled={isSending || !input.trim()}
            >
              <span className="send-icon">🪞</span>
              <span className="send-text">SEND</span>
            </button>
          </div>
        </form>
      </div>

      {/* Floating candles */}
      <div className="floating-candles-mary">
        <div className="candle-mary">🕯️</div>
        <div className="candle-mary">🕯️</div>
        <div className="candle-mary">🕯️</div>
        <div className="candle-mary">🕯️</div>
      </div>

      {/* Blood drops from ceiling */}
      <div className="ceiling-blood">
        <div className="blood-drop-ceiling"></div>
        <div className="blood-drop-ceiling"></div>
        <div className="blood-drop-ceiling"></div>
      </div>

      {/* Sound Toggle */}
      <SoundToggle />
    </div>
  );
}
