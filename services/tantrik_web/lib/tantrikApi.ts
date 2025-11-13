// Tantrik AI API Client - Clean integration with new backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  spirit_id: string;
  spirit_name: string;
  response: string;
  model: string;
  tokens_used: number;
  api_used: string;
  success: boolean;
}

// Session management (simplified - no backend session needed)
export async function createSession(userId: string): Promise<string> {
  // Generate client-side session ID
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Non-streaming chat
export async function sendChatMessage(
  spiritId: string,
  messages: Message[]
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spirit_id: spiritId,
      messages: messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Chat failed: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Streaming chat with SSE
export async function sendStreamingMessage({
  spiritId,
  messages,
  onChunk,
  onComplete,
  onError,
}: {
  spiritId: string;
  messages: Message[];
  onChunk: (chunk: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}) {
  try {
    const response = await fetch(`${API_BASE}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      body: JSON.stringify({
        spirit_id: spiritId,
        messages: messages,
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Stream failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        // Extract payload after "data: " (note the space!)
        // Don't use trim() as it removes the spaces we need!
        const payload = line.slice(6); // "data: ".length = 6
        if (!payload) continue;
        if (payload === "[DONE]") {
          onComplete?.();
          return;
        }

        // Each chunk is just text, not JSON
        onChunk(payload);
      }
    }

    onComplete?.();
  } catch (error) {
    onError?.(error as Error);
  }
}

// Legacy function for backward compatibility
export async function sendMessage({
  userId,
  sessionId,
  text,
  onAgentResponse,
}: {
  userId: string;
  sessionId: string;
  text: string;
  onAgentResponse: (response: string) => void;
}) {
  // This is a placeholder - will be replaced with proper spirit-specific calls
  console.warn("Legacy sendMessage called - should use sendStreamingMessage instead");
}

// Health check
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

// Get available spirits
export async function getSpirits(): Promise<
  Array<{ id: string; name: string; emoji: string }>
> {
  try {
    const response = await fetch(`${API_BASE}/spirits`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.spirits || [];
  } catch {
    return [];
  }
}
