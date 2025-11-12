"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import { sendMessage } from "@/lib/tantrikApi";
import TantrikLoading from "@/components/TantrikLoading";
import DraculaChat from "@/components/spirits/DraculaChat";
import ReaperChat from "@/components/spirits/ReaperChat";
import BloodyMaryChat from "@/components/spirits/BloodyMaryChat";

export default function SpiritChatPage() {
  const params = useParams();
  const router = useRouter();
  const { sessionId, userId } = useSession();
  const spiritId = params.spiritId as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Show Tantrik summoning animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add initial spirit greeting
      const greetings: Record<string, string> = {
        dracula: "🧛‍♂️ *The shadows deepen as I emerge from my coffin...* \n\nGood evening, mortal. I am Count Dracula, lord of the undead and master of the night. For centuries, I have walked in darkness, feeding on the blood of the living. \n\nYou dare summon me? How... intriguing. Tell me, what brings you to seek audience with the Prince of Darkness? Choose your words carefully... I have little patience for fools, but great interest in those with courage.",
        reaper: "💀 *A cold chill fills the air...* I am Death itself.",
        bloody_mary: "👻 *The mirrors crack...* You summoned me..."
      };
      
      setMessages([{
        role: "assistant",
        content: greetings[spiritId] || "The spirit has been summoned..."
      }]);
    }, 3000); // 3 second summoning animation

    return () => clearTimeout(timer);
  }, [spiritId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId || isSending) return;

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

  const handleRunAway = () => {
    router.push("/");
  };

  if (isLoading) {
    return <TantrikLoading spiritName={spiritId} />;
  }

  // Render spirit-specific chat interface
  switch (spiritId) {
    case "dracula":
      return (
        <DraculaChat
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onRunAway={handleRunAway}
          isSending={isSending}
        />
      );
    
    case "reaper":
      return (
        <ReaperChat
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onRunAway={handleRunAway}
          isSending={isSending}
        />
      );
    
    case "bloody_mary":
      return (
        <BloodyMaryChat
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onRunAway={handleRunAway}
          isSending={isSending}
        />
      );
    
    default:
      return <div>Spirit not found</div>;
  }
}
