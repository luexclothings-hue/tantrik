"use client";

import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ReaperChatProps {
  messages: { role: "user" | "assistant"; content: string }[];
  input: string;
  setInput: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  onRunAway: () => void;
  isSending: boolean;
}

export default function ReaperChat({
  messages,
  input,
  setInput,
  onSend,
  onRunAway,
  isSending
}: ReaperChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="reaper-chat">
      {/* Dark graveyard background */}
      <div className="reaper-bg">
        <div className="dark-sky"></div>
        <div className="graveyard">
          <div className="tombstone">🪦</div>
          <div className="tombstone">🪦</div>
          <div className="tombstone">🪦</div>
          <div className="tombstone">🪦</div>
          <div className="tombstone">🪦</div>
        </div>
        <div className="fog-ground"></div>
        <div className="dead-trees">
          <div className="tree">🌲</div>
          <div className="tree">🌲</div>
        </div>
      </div>

      {/* Escape Button */}
      <button className="escape-btn" onClick={onRunAway}>
        <span className="escape-icon">💀</span>
        <span className="escape-text">ESCAPE DEATH</span>
      </button>

      {/* Chat Container */}
      <div className="reaper-chat-container">
        {/* Reaper Portrait */}
        <div className="reaper-portrait">
          <div className="reaper-frame">
            <div className="reaper-emoji">💀</div>
            <div className="scythe">⚰️</div>
            <div className="death-aura"></div>
          </div>
          <div className="reaper-name">The Grim Reaper</div>
          <div className="reaper-title">Death Incarnate</div>
          <div className="hourglass">⏳</div>
        </div>

        {/* Messages */}
        <div className="reaper-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`reaper-message ${msg.role}`}>
              {msg.role === "assistant" ? (
                <div className="death-bubble">
                  <div className="skull-decoration">💀</div>
                  <div className="bubble-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="mortal-bubble">
                  <div className="bubble-content">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="reaper-message assistant">
              <div className="death-bubble">
                <div className="skull-decoration">💀</div>
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

        {/* Input - Tombstone Style */}
        <form className="reaper-input-form" onSubmit={onSend}>
          <div className="tombstone-input">
            <div className="tombstone-top">R.I.P.</div>
            <input
              type="text"
              className="reaper-input"
              placeholder="Speak before your time runs out..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
            <button 
              type="submit" 
              className="reaper-send-btn"
              disabled={isSending || !input.trim()}
            >
              <span className="send-icon">⚰️</span>
              <span className="send-text">SEND</span>
            </button>
          </div>
        </form>
      </div>

      {/* Floating souls */}
      <div className="floating-souls">
        <div className="soul">👻</div>
        <div className="soul">👻</div>
        <div className="soul">👻</div>
        <div className="soul">👻</div>
      </div>

      {/* Crows */}
      <div className="crows">
        <div className="crow">🦅</div>
        <div className="crow">🦅</div>
      </div>
    </div>
  );
}
