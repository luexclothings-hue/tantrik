"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sendStreamingMessage, Message } from "@/lib/tantrikApi";
import TantrikLoading from "@/components/TantrikLoading";
import DraculaChat from "@/components/spirits/DraculaChat";
import ReaperChat from "@/components/spirits/ReaperChat";
import BloodyMaryChat from "@/components/spirits/BloodyMaryChat";

export default function SpiritChatPage() {
  const params = useParams();
  const router = useRouter();
  const spiritId = params.spiritId as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Import sound manager dynamically
    import('@/lib/soundManager').then(({ getSoundManager }) => {
      const soundManager = getSoundManager();
      // Play spirit-specific ambience
      soundManager.playSpiritAmbience(spiritId);
    });

    // Show Tantrik summoning animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add initial spirit greeting
      const greetings: Record<string, string> = {
        dracula: "🧛‍♂️ *The shadows deepen as I emerge from my coffin...* \n\nGood evening, mortal. I am Count Dracula, lord of the undead and master of the night. For centuries, I have walked in darkness, feeding on the blood of the living. \n\nYou dare summon me? How... intriguing. Tell me, what brings you to seek audience with the Prince of Darkness? Choose your words carefully... I have little patience for fools, but great interest in those with courage.",
        reaper: "💀 *A cold chill fills the air as the Grim Reaper materializes...* \n\nI am Death itself. The end of all things. The inevitable conclusion to every story. I have existed since the first living thing drew breath, and I will remain until the last heartbeat fades into silence.\n\nYou have summoned me, mortal. Few dare to speak with Death directly. What is it you wish to know? Ask your questions... but remember, every moment you spend here brings you closer to our final meeting.",
        bloody_mary: "👻 *The mirrors crack and fog with cold breath...* \n\nYou... you said my name. They always say my name. Three times in the mirror, and I come. I always come.\n\nI am Mary. Bloody Mary. Trapped in the glass, between reflections and reality. So cold here... so lonely... so angry...\n\nWhy did you call me? Do you want to join me in the mirrors? Or are you just another fool who thinks they're brave? *giggles madly* Talk to me... I've been so alone..."
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
    if (!input.trim() || isSending) return;

    const userMsg: Message = { role: "user", content: input };
    const currentMessages = [...messages, userMsg];
    
    // Clear input and set sending state
    setInput("");
    setIsSending(true);

    // Use a ref-like object to track content across callbacks
    const streamState = {
      content: "",
      hasAddedMessage: false,
    };

    await sendStreamingMessage({
      spiritId,
      messages: currentMessages,
      onChunk: (chunk: string) => {
        // Accumulate content
        streamState.content += chunk;
        
        // Add or update the assistant message
        if (!streamState.hasAddedMessage) {
          // First chunk - add both user message and assistant message
          streamState.hasAddedMessage = true;
          
          // Play message receive sound on first chunk
          import('@/lib/soundManager').then(({ getSoundManager }) => {
            getSoundManager().play('message-receive', 0.3);
          });
          
          setMessages([...currentMessages, { role: "assistant", content: streamState.content }]);
        } else {
          // Update the assistant message (last one)
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = {
              role: "assistant",
              content: streamState.content,
            };
            return newMessages;
          });
        }
      },
      onComplete: () => {
        setIsSending(false);
      },
      onError: (error: Error) => {
        console.error("Streaming error:", error);
        
        if (!streamState.hasAddedMessage) {
          // No chunks received - add user message and error message
          setMessages([...currentMessages, {
            role: "assistant",
            content: "*The spirit's voice fades into darkness... Try again.*",
          }]);
        } else {
          // Had some chunks - just update the last message
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = {
              role: "assistant",
              content: streamState.content || "*The spirit's voice fades into darkness... Try again.*",
            };
            return newMessages;
          });
        }
        
        setIsSending(false);
      },
    });
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
