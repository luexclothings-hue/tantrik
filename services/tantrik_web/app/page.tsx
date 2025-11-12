"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/SessionContext";
import { sendMessage } from "@/lib/tantrikApi";
import { exportChatToPDF } from "@/lib/pdfExport";
import { saveChat, getSavedChats, deleteChat } from "@/lib/chatStorage";
import Sidebar from "@/components/Sidebar";
import SaveChatModal from "@/components/SaveChatModal";
import ReactMarkdown from "react-markdown";
import HorrorTyping from "@/components/HorrorTyping";
import { getRandomHorrorGreeting } from "@/lib/horrorGreetings";
import SpiritSelector from "@/components/SpiritSelector";

export default function Page() {
  const { sessionId, userId, startNewSession } = useSession();
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedChats, setSavedChats] = useState<any[]>([]);
  const [viewingHistory, setViewingHistory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGreeting, setIsGreeting] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<string | null>(null);
  const [showSpiritSelector, setShowSpiritSelector] = useState(true);

  useEffect(() => {
    // Load saved chats on client side only
    setSavedChats(getSavedChats());
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
  }, [sessionId]);

  const handleSpiritSelect = (spiritId: string, spiritName: string) => {
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

  const handleSaveChat = (name: string) => {
    saveChat(name, messages);
    setSavedChats(getSavedChats());
  };

  const handleLoadChat = (chat: any) => {
    setMessages(chat.messages);
    setViewingHistory(chat.name);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    setViewingHistory(null);
    setIsGreeting(true);
    setShowSpiritSelector(true);
    setSelectedSpirit(null);
    setMessages([
      {
        role: "assistant",
        content: getRandomHorrorGreeting(),
      },
    ]);
    setSidebarOpen(false);
    
    // Create new session with backend
    startNewSession();
  };

  const handleDeleteChat = (id: string) => {
    deleteChat(id);
    setSavedChats(getSavedChats());
    if (viewingHistory) {
      handleNewChat();
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

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
      
      <Sidebar
        savedChats={savedChats}
        onChatSelect={handleLoadChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        isOpen={sidebarOpen}
      />

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
              {viewingHistory || (
                <>
                  Tantrik
                  <span className="beta-tag">HALLOWEEN</span>
                </>
              )}
            </div>
            <div className="header-status">
              {viewingHistory ? "Saved Séance" : "Gateway to the Spirit Realm"}
            </div>
          </div>
          <div className="header-actions">
            {!viewingHistory && (
              <button
                className="header-btn"
                onClick={() => setShowSaveModal(true)}
                title="Save Chat"
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
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </button>
            )}
            <button
              className="header-btn"
              onClick={async () => await exportChatToPDF(messages)}
              title="Download PDF"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {showSaveModal && (
          <SaveChatModal
            onSave={handleSaveChat}
            onClose={() => setShowSaveModal(false)}
          />
        )}

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

        {!viewingHistory && showSpiritSelector && (
          <SpiritSelector 
            onSelectSpirit={handleSpiritSelect}
            disabled={isSending}
          />
        )}

        {!viewingHistory && !showSpiritSelector && selectedSpirit && (
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
