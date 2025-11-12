export interface SavedChat {
  id: string;
  name: string;
  messages: { role: "user" | "assistant"; content: string }[];
  savedAt: string;
}

export function saveChat(
  name: string,
  messages: { role: "user" | "assistant"; content: string }[]
): void {
  if (typeof window === "undefined") return;
  
  const chats = getSavedChats();
  const newChat: SavedChat = {
    id: Date.now().toString(),
    name,
    messages,
    savedAt: new Date().toISOString(),
  };
  chats.unshift(newChat);
  localStorage.setItem("tantrik_chats", JSON.stringify(chats));
}

export function getSavedChats(): SavedChat[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem("tantrik_chats");
  return stored ? JSON.parse(stored) : [];
}

export function deleteChat(id: string): void {
  if (typeof window === "undefined") return;
  
  const chats = getSavedChats().filter((chat) => chat.id !== id);
  localStorage.setItem("tantrik_chats", JSON.stringify(chats));
}
