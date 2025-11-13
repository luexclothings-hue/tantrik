"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/SessionContext";
import { sendMessage } from "@/lib/tantrikApi";
import Sidebar from "@/components/Sidebar";
import SoundToggle from "@/components/SoundToggle";
import ReactMarkdown from "react-markdown";
import HorrorTyping from "@/components/HorrorTyping";
import { getRandomHorrorGreeting } from "@/lib/horrorGreetings";
import SpiritSelector from "@/components/SpiritSelector";
import { useSounds } from "@/hooks/useSounds";

export default function Page() {
  const { sessionId, userId, startNewSession } = useSession();
  const sounds = useSounds();
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGreeting, setIsGreeting] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<string | null>(null);
  const [showSpiritSelector, setShowSpiritSelector] = useState(true);

  // Enable sounds on first interaction
  useEffect(() => {
    const enableSounds = () => {
      sounds.playBackgroundAmbience();
    };
    
    // Try to start sounds on any click
    document.addEventListener('click', enableSounds, { once: true });
    
    return () => {
      document.removeEventListener('click', enableSounds);
    };
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    
    setIsGreeting(true);
    setShowSpiritSelector(true);
    setSelectedSpirit(null);
    setMessages([
      {
        role: "assistant",
        content: getRandomHorrorGreeting(),
      },
    ]);

    // Delay sound slightly to ensure sound manager is ready
    setTimeout(() => {
      sounds.playBackgroundAmbience();
      sounds.playSound('greeting-entrance', 0.4);
    }, 100);
  }, [sessionId]);

  const handleSpiritSelect = (spiritId: string, spiritName: string) => {
    // Play spirit-specific selection sound
    sounds.playSound(`${spiritId}-select`, 0.5);
    
    setSelectedSpirit(spiritId);
    setShowSpiritSelector(false);
    setIsGreeting(false);
    
    // Add spirit introduction message
    const spiritIntros: Record<string, string> = {
      dracula: "🧛 *The shadows deepen...* Greetings, mortal. I am Count Dracula, lord of the undead. For centuries I have thirsted for blood and knowledge. What dark secrets do you seek from the Prince of Darkness? Speak... but choose your words carefully, for I have little patience for fools.",
      reaper: "💀 *A cold chill fills the air...* I am Death itself, the Grim Reaper. I have collected countless souls across millennia. You stand before the end of all things. What questions dare you ask of the one who knows when your final breath shall come? Time is fleeting... even for you.",
      bloody_mary: "👻 *The mirrors crack...* You summoned me... Bloody Mary. I am the vengeful spirit who haunts reflections and drives mortals to madness. You were brave... or foolish... to call my name. What tormented thoughts plague your mind? Speak quickly, before I drag you into my mirror realm..."
    };

    setMessages(prev => [...prev, {
      role: "assistant",
      content: spiritIntros[spiritId] || "The spirit has been summoned..."
    }]);
  };



  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    // Play message send sound
    sounds.playSound('message-send', 0.3);

    const userMsg = { role: "user" as const, content: input };
    setMessages((m) => [...m, userMsg]);
    const messageText = input;
    setInput("");
    setIsSending(true);

    await sendMessage({
      userId,
      sessionId,
      text: messageText,
      onAgentResponse: (response: string) => {
        // Play message receive sound
        sounds.playSound('message-receive', 0.3);
        setMessages((msgs) => [...msgs, { role: "assistant", content: response }]);
      },
    });

    setIsSending(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} />
      <SoundToggle />

      <div className="chat-page">
        {/* Header */}
        <div className="chat-header">
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <img src="/tantrik-logo.svg" className="header-logo" alt="Tantrik Logo" />
          <div className="header-info">
            <div className="header-name">
              Tantrik
              <span className="beta-tag">HALLOWEEN</span>
            </div>
            <div className="header-status">
              Gateway to the Spirit Realm
            </div>
          </div>
        </div>

        <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.role === "assistant" && (
              <img 
                src={i === 0 ? "/tantrik-logo.svg" : selectedSpirit ? `/spirits/${selectedSpirit}.svg` : "/tantrik-logo.svg"} 
                className="message-avatar ai-avatar" 
                alt={i === 0 ? "Tantrik" : "Spirit"} 
              />
            )}
            <div className={`bubble ${(i === 0 || i === 1) ? 'horror-entrance horror-greeting-glow' : ''}`}>
              {msg.role === "assistant" ? (
                (i === 0 || i === 1) ? (
                  <HorrorTyping 
                    text={msg.content} 
                    onComplete={() => {
                      if (i === 0) setIsGreeting(false);
                    }}
                  />
                ) : (
                  <div className="horror-typing">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )
              ) : (
                msg.content
              )}
            </div>
            {msg.role === "user" && (
              <img src="/avatars/human.svg" className="message-avatar" alt="You" />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isSending && (
          <div className="message assistant">
            <img src="/tantrik-logo.svg" className="message-avatar ai-avatar" alt="Tantrik" />
            <div className="bubble typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
      </div>

        {showSpiritSelector && (
          <SpiritSelector 
            onSelectSpirit={handleSpiritSelect}
            disabled={isSending}
          />
        )}

        {!showSpiritSelector && selectedSpirit && (
          <form className="input-bar" onSubmit={send}>
            <input
              type="text"
              placeholder="Speak to the spirit..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />

            <button type="submit" disabled={isSending}>
              {isSending ? <div className="send-spinner"></div> : "Summon"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
